import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { counter } from 'support/Utils';
import { BACKEND, Strings } from 'support/Constants';

import { CardBody } from 'components/Card';
import Loader from 'components/Loader';
import Errorer from 'components/Errorer';

import { StoreContext } from 'store/Store';

const Stats = ({ userData, lang, token }) => {
  const [userStats, setUserStats] = useState({})
  const [loading, setLoading] = useState(true)
  const [noData, setNoData] = useState(false)

  const { user } = useContext(StoreContext)

  const rankingTier = {
    GOD: 2,
    LEGENDARY: 0.5,
    ULTRA: 0.25,
    SUPER: 0.15,
    PREMIUM: 0.05
  }

  const ranking = {
    GOD: 'Gods',
    LEGENDARY: 'Legendary',
    ULTRA: 'Ultra',
    SUPER: 'Super',
    PREMIUM: 'Premium',
    UNRANKED: 'Unranked'
  }

  const ethscapeContractAddress = '0xd9b2f4ea4a44b8543edd4898247e374d2642726a'

  useEffect(() => {
    setLoading(true)

    const fetchStats = async () => {
      try {
        const data = await fetch(`${BACKEND()}/api/user/stats?userId=${userData._id}`, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        const response = await data.json()

        if (!response.error) {
          setUserStats(response)
          setLoading(false)
          setNoData(false)
        } else throw Error(response.error?.message || 'Error')
      } catch(err) {
        setNoData(true)
        setLoading(false)
      }
    }

    fetchStats()
    // eslint-disable-next-line
  }, [userData._id])

  const calculateRanking = (totalSupplyPercentage) => {
    if (totalSupplyPercentage >= rankingTier.GOD) {
      return ranking.GOD
    } else if (totalSupplyPercentage >= rankingTier.LEGENDARY) {
      return ranking.LEGENDARY
    } else if (totalSupplyPercentage >= rankingTier.ULTRA) {
      return ranking.ULTRA
    } else if (totalSupplyPercentage >= rankingTier.SUPER) {
      return ranking.SUPER
    } else if (totalSupplyPercentage >= rankingTier.PREMIUM) {
      return ranking.PREMIUM
    } else {
      return ranking.UNRANKED
    }
  }

  return !noData ? (
    !loading ? (
      <>
        <CardBody>
          <div className="profile_stats_grid">
            <Link to={'/user/' + userData.name + '/threads'} className="profile_stats_item enable">
              <span className="secondary_text">{Strings.threads[lang]}</span>
              {counter(userStats.threadsCount)}
            </Link>
            <Link to={'/user/' + userData.name + '/answers'} className="profile_stats_item enable">
              <span className="secondary_text">{Strings.answers[lang]}</span>
              {counter(userStats.answersCount)}
            </Link>
            <Link to={'/user/' + userData.name + '/bans'} className="profile_stats_item enable">
              <span className="secondary_text">{Strings.bans[lang]}</span>
              {counter(userStats.bansCount)}
            </Link>
            <div className="profile_stats_item">
              <span className="secondary_text">{Strings.karma[lang]}</span>
              <span className={userStats.karma > 0 ? 'positive' : userStats.karma < 0 ? 'negative' : ''}>
                {counter(userStats.karma)}
              </span>
            </div>
          </div>
        </CardBody>
        {user.id === userData._id ? (
          user.address &&
          <CardBody>
            <div className="profile_stats_grid">
              <Link to={{ pathname:`https://etherscan.io/address/${user.address}` }}
                  target="_blank" rel="noopener noreferrer"
                  className="profile_stats_item enable">
                <span className="secondary_text">{Strings.account[lang]}</span>
                  {user.address.slice(0, 5)}...{user.address.slice(-4)}
              </Link>
              <Link to={{ pathname:`https://etherscan.io/token/${ethscapeContractAddress}?a=${user.address}` }}
                  target="_blank" rel="noopener noreferrer"
                  className="profile_stats_item enable">
                <span className="secondary_text">{Strings.ethscapeToken[lang]}</span>
                  {counter(user.ethscapeBalance)}
              </Link>
              <div className="profile_stats_item">
                <span className="secondary_text">{Strings.percentageOfSupply[lang]}</span>
                  {user.totalSupplyPercentage.toString().slice(0, 6)}%
              </div>
              <div className="profile_stats_item">
                <span className="secondary_text">{Strings.ranking[lang]}</span>
                  {calculateRanking(user.totalSupplyPercentage)}
              </div>
            </div>
          </CardBody>
        ) : (
          userStats.address &&
          <CardBody>
            <div className="profile_stats_grid">
              <Link to={{ pathname:`https://etherscan.io/address/${userStats.address}` }}
                  target="_blank" rel="noopener noreferrer"
                  className="profile_stats_item enable">
                <span className="secondary_text">{Strings.account[lang]}</span>
                  {userStats.address.slice(0, 5)}...{userStats.address.slice(-4)}
              </Link>
              <Link to={{ pathname:`https://etherscan.io/token/${ethscapeContractAddress}?a=${userStats.address}` }}
                  target="_blank" rel="noopener noreferrer"
                  className="profile_stats_item enable">
                <span className="secondary_text">{Strings.ethscapeToken[lang]}</span>
                  {counter(userStats.ethscapeBalance)}
              </Link>
              <div className="profile_stats_item">
                <span className="secondary_text">{Strings.percentageOfSupply[lang]}</span>
                  {userStats.totalSupplyPercentage.toString().slice(0, 6)}%
              </div>
              <div className="profile_stats_item">
                <span className="secondary_text">{Strings.ranking[lang]}</span>
                  {calculateRanking(userStats.totalSupplyPercentage)}
              </div>
            </div>
          </CardBody>
        )}
      </>
    ) : <Loader className="more_loader" color="#64707d" />
  ) : (
    <Errorer message={Strings.unableToDisplayProfileInfo[lang]} />
  )
}

export default Stats;
