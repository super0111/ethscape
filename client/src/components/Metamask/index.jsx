import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { StoreContext } from 'store/Store';
import { ethers } from "ethers";
import { toast } from 'react-toastify';

import { BACKEND, Strings } from 'support/Constants';
import ERC20_ABI from "abis/ERC20_ABI.json";

import './style.css';

const Metamask = ({ text, className, showHint }) => {
  const { user, login, token, lang } = useContext(StoreContext)
  const history = useHistory()

  const ethscapeContractAddress = '0xd9b2f4ea4a44b8543edd4898247e374d2642726a'

  const connectToMetamask = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    provider.send("eth_requestAccounts", [])
    .then(accounts => {
      const address = accounts[0]
      const ethscapeContract = new ethers.Contract(ethscapeContractAddress, ERC20_ABI, provider)

      const fetchEthscapeBalancePromise = fetchTokenBalance(address, ethscapeContract)
      const fetchTokenUnitsPromise = fetchTokenUnits(ethscapeContract)
      const fetchEthscapeSupplyPromise = fetchEthscapeSupply(ethscapeContract)

      Promise.all([fetchEthscapeBalancePromise, fetchTokenUnitsPromise, fetchEthscapeSupplyPromise])
      .then(responses => {
        const precision =  10*Math.pow(10, 9)
        const tokenBalance = responses[0]
        const tokenUnits = responses[1]
        const totalSupply = responses[2]

        // Precision upscale is used due to etherjs BigNumber not able to store floating point numbers from division
        const totalSupplyPercentage = tokenBalance.mul(precision).div(totalSupply).toNumber() / precision * 100
        const balance = ethers.utils.formatUnits(tokenBalance, tokenUnits)

        const hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(address + user.name))
        signer.signMessage(ethers.utils.arrayify(hash)).then((signature) => {
          patchUserWalletData(address, balance, totalSupplyPercentage, signature)
          history.push('/user/' + user.name)
        })
      })
      .catch(err => toast.error(err.message === '[object Object]' ? 'Error' : err.message))
    })
    .catch(err => toast.error(err.message === '[object Object]' ? 'Error' : err.message))
  }

  const fetchTokenBalance = (address, contract) => {
    return contract.balanceOf(address)
  }

  const fetchTokenUnits = (contract) => {
    return contract.decimals()
  }

  const fetchEthscapeSupply = (contract) => {
    return contract.totalSupply()
  }

  const patchUserWalletData = (address, ethscapeBalance, totalSupplyPercentage, signature) => {
    fetch(BACKEND() + '/api/profile/wallet/connect', {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        address: address,
        ethscapeBalance: ethscapeBalance,
        totalSupplyPercentage: totalSupplyPercentage,
        signature: signature
      })
    })
    .then(response => {
      return response.json()
    })
    .then(data => {
      if (data.accessToken) {
        login(data)
      } else throw Error(data.error?.message || 'Error')
    })
    .catch(err => toast.error(err.message === '[object Object]' ? 'Error' : err.message))
  }

  const renderMetamask = () => {
    return (
      <div className="metamask">
        <input 
          className={'btn ' + className}
          onClick={connectToMetamask}
          type="submit"
          value={text}>
        </input>
        {showHint && 
        <div className="card_outside_title with_hint">
          <div className="title_hint">
            <i className="bx bx-help-circle" />
            <div className="hint_popover">
              {Strings.syncWalletHelp[lang]}
            </div>
          </div>
        </div>
        }
      </div>
    )
  }

  return (
    <div>
      {renderMetamask()}
    </div>
  )
}

export default Metamask;
