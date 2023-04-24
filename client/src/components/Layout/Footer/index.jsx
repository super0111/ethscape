import { useContext } from 'react';
import { StoreContext } from 'store/Store';

import { Strings } from 'support/Constants';

import './style.css';
const Footer = () => {
    const { lang } = useContext(StoreContext)
  
    return (
      <footer className="general_footer">
        <div className="general_footer_border"></div>
        <div className="footer_content">
          <div className="flex flex-wrap items-start justify-around">
            <div className="footer_social footer_content_area">
              {/* <a href="https://app.ethscape.io">
                <div className="footer_ethscape-logo"></div>
              </a> */}
              <div className="flex justify-around w-100">

                {/* <a href="https://www.facebook.com/profile.php?id=100089664454651" target="_blank" rel="noopener noreferrer">
                  <i className="bx bxl-facebook"></i>
                </a>

                <a href="https://twitter.com/ScapeEth" target="_blank" rel="noopener noreferrer">
                  <i className="bx bxl-twitter"></i>
                </a>
                
                <a href="https://www.instagram.com/ethscapeofficial/" target="_blank" rel="noopener noreferrer">
                  <i className="bx bxl-instagram"></i>
                </a>
                <a href="https://discord.com/invite/EthScape" target="_blank" rel="noopener noreferrer">
                  <i className="bx bxl-discord"></i>
                </a> */}
              </div>
            </div>
            <div className="footer_content_area">
              <div className="footer_content_title">
                {/* {Strings.pages[lang]} */}
                </div>
              <ul>
                <li>
                  {/* <a href="https://app.ethscape.io">
                    {Strings.home[lang]}
                  </a> */}
                </li>
                <li>
                  {/* <a href="https://app.ethscape.io/forum">
                    {Strings.forum[lang]}
                  </a> */}
                </li>
              </ul>
            </div>
            <div className="footer_content_area">
              <div className="footer_content_title">
                
                {/* {Strings.links[lang]} */}
              
              </div>
              <ul>
                <li>
                  {/* <a href="https://www.dextools.io/app/ether/pair-explorer/0x8344920eb5a392fbfa2f9ec3265a72be347dc975" target="_blank" rel="noopener noreferrer">
                    {Strings.chart[lang]}
                  </a> */}
                </li>
                <li>
                  {/* <a href="https://etherscan.io/token/0xd9b2f4ea4a44b8543edd4898247e374d2642726a" target="_blank" rel="noopener noreferrer">
                    {Strings.contract[lang]}
                  </a> */}
                </li>
                <li>
                  {/* <a href="https://app.uniswap.org/#/swap?chain=mainnet" target="_blank" rel="noopener noreferrer">
                    {Strings.uniswap[lang]}
                  </a> */}
                </li>
                <li>
                  {/* <a href="https://linktr.ee/ethscape" target="_blank" rel="noopener noreferrer">
                    {Strings.linktree[lang]}
                  </a> */}
                </li>
              </ul>
            </div>
            {/* <div className="footer_content_area">
              <div className="footer_content_title">{Strings.twitchInfluencers[lang]}</div>
              <ul className="footer_influencer">
                <li>
                  <a href="https://ethscape.io/apply/" target="_blank" rel="noopener noreferrer">
                    <i className="bx bxl-twitch"></i>
                  </a>
                </li>
                <li>
                  <a href="https://ethscape.io/apply/" target="_blank" rel="noopener noreferrer">
                    {Strings.applyNow[lang]}
                  </a>
                </li>
              </ul>
            </div> */}
            <div className="footer_content_area">
              <div className="footer_content_title">
                {/* {Strings.supportAndMedia[lang]} */}
                </div>
              <ul className="footer_media">
                <li>
                  {/* <a href="mailto:contact@ethscape.io">
                    <i className="bx bx-envelope"></i>
                  </a> */}
                </li>
                <li>
                  {/* <a href="mailto:contact@ethscape.io">
                    contact@ethscape.io
                  </a> */}
                </li>
              </ul>
            </div>
          </div>
          
          {/* <p className='copyright'>&copy; {new Date().getFullYear()} EthScape</p> */}
        </div>
      </footer>
    )
  }
  
  export default Footer;
