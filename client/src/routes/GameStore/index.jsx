import { useContext, useEffect, useState } from 'react';

import { StoreContext } from 'store/Store';
import { Strings } from 'support/Constants';

import { Section, SectionHeader } from 'components/Section';
import Breadcrumbs from 'components/Breadcrumbs';
import { LoginForm } from 'components/LoginForm';
import { FilterForm } from 'components/FilterForm';
import { GemstoneItem } from 'components/GemstoneItem';

import { BACKEND } from 'support/Constants';

import './style.css';

const GameStore = () => {
  document.title = 'EthScape'
  const { setFabVisible, setWalletConnectVisible, setForumMenuActive, lang } = useContext(StoreContext)
  const [ productData, setProductData ] = useState([])
  const [init, setInit] = useState(true)

  useEffect(() => {
    if (init) {
      setForumMenuActive(false)
      setFabVisible(false)
      setWalletConnectVisible(true)
    }
    setInit(false)
    // eslint-disable-next-line
  }, [init])

  useEffect( async ()=> {
    fetch(BACKEND() + '/api/getProducts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then( async response => {
      setProductData(await response.json());
    })
  }, [])
  return (
    <>
      <Section>
        <div className='flex justify-center w-100'>
          <img src="https://ethscape.net/logo.png" />
        </div>
        <div className='store'>
          <div className='leftBar'>
            <LoginForm />
            <FilterForm />
          </div>
          <div className='rightBar'>
            <h3 className="cathead">All products</h3>
            <hr></hr>
            <div className='flex flex-wrap justify-between item-list'>
              {
                productData.length>0 && productData.map((item, i) => (
                  <div key={i} style={{width: '24%'}}>
                    <GemstoneItem data={item}/>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}

export default GameStore;
