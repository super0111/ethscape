import { useContext, useEffect, useState } from 'react';
import Marquee from "react-smooth-marquee"

import { StoreContext } from 'store/Store';

import { Section } from 'components/Section';

import './style.css';
import { BACKEND, Strings } from 'support/Constants';
const url = 'https://www.ethscape.net/play';

const Home = () => {
  document.title = 'EthScape'
  const { setFabVisible, setWalletConnectVisible, setForumMenuActive, lang } = useContext(StoreContext)
  const [init, setInit] = useState(true)
  const [eventBanner, setEventBanner] = useState('')
  const [promo, setPromo] = useState('')

  useEffect(() => {
    if (init) {
      setForumMenuActive(false)
      setFabVisible(false)
      setWalletConnectVisible(true)
      fetchEventBanner()
      fetchPromotionalImage()
    }
    setInit(false)
    // eslint-disable-next-line
  }, [init])

  // const headToDownloadPage = () => {
  //   {() => window.open(url, '_self')}
  // }

  const fetchEventBanner = async () => {
    try {
      const data = await fetch(`${BACKEND()}/api/event/recent`, null)
      const response = await data.json()
      if (response.docs.length === 1) {
        setEventBanner(response.docs[0].text)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const fetchPromotionalImage = async () => {
    try {
      const data = await fetch(`${BACKEND()}/api/promo/recent`, null)
      const response = await data.json()
      if (response.docs.length === 1) {
        setPromo(response.docs[0].file)
      }
    } catch (err) {
      console.log(err)
    }
  } 

  return (
    <>
      <Section>
        <div className="home-section flex flex-col items-center">
          <Marquee velocity={0.09}>{eventBanner}</Marquee>
          <div className="splash-logo" />
          <div className="intro-container">
              <div className="intro-wrapper">
                <p className="intro-title">Welcome to the Decentralized application of EthScape</p>
              </div>
              <div className="border-bottom">
              </div>
              <div className="row">
                <div className="column">
                    <div className="yellow-background"></div>
                    <div className="metamask-image swing"></div>
                    <h4 className="intro-subtitle">MetaMask wallet connection</h4>
                    <p className="intro-text">Connect your MetaMask wallet to receive your rank in-game.</p>
                </div>
                <div className="column">
                    <div className="yellow-background-2"></div>
                    <div className="firecape swing"></div>
                    <h4 className="intro-subtitle-2">Challenging adventures</h4>
                    <p className="intro-text-2">Relive your nostalgic adventure in a whole new way.</p>
                </div>
                <div className="column">
                    <div className="yellow-background-3"></div>
                    <div className="key swing"></div>
                    <h4 className="intro-subtitle-3">Secure system</h4>
                    <p className="intro-text-3">We strive to have<br/> a fully safe environment<br/> for our community.</p>
                </div>
              </div>

          <div className="play-button">
            <input
              className={'btn full'}
              onClick={() => window.open(url, '_self')}
              type="submit"
              value={Strings.playNow[lang]}>
            </input>
          </div>
          <div className="promo-image" style={{ backgroundImage: `url(${BACKEND() + promo})` }} />
        </div>
        </div>
      </Section>
    </>
  )
}

export default Home;
