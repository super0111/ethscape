import { useEffect, useContext, useState } from 'react';
import { Link, } from 'react-router-dom';

import { StoreContext } from 'store/Store';

import { Strings } from 'support/Constants';
import Socket from 'support/Socket';

import Dropdown from './Dropdown';
import Notifications from './Notifications';
import './style.css';

// import { Icon } from '@iconify/react';

const Header = ({ setMenuState }) => {
  const { user, lang } = useContext(StoreContext)
  const [notification, setNotification] = useState(false)

  useEffect(() => {
    Socket.on('newAdminNotification', () => {
      setNotification(true)
    })
    Socket.on('messagesCount', (data) => {
      data.count > 0 ? setNotification(true) : setNotification(false)
    })
  }, [])

  const openNav = () => {
    setNotification(false)
    setMenuState()
  }

  return (

    // NEW NAV BAR 

    <header className="app_head">
        
      <main className="main">

          <div className="col">
              <nav className="nav">
              <a className="nav_social_icon" href="https://www.facebook.com/profile.php?id=100089664454651"><i className="social_icon_color bx bxl-facebook"></i></a>
              <a className="nav_social_icon" href="https://twitter.com/EthScape2"><i className="social_icon_color bx bxl-twitter"></i></a>
              <a className="nav_social_icon" href="https://www.instagram.com/ethscapenet/"><i className="social_icon_color bx bxl-instagram"></i></a>
                <a className="nav_social_icon" href="https://discord.gg/ymfUC4Y"><i className="social_icon_color bx bxl-discord"></i></a>
                <a className="nav_social_icon" href="http://t.me/ethscape2"><i className="social_icon_color bx bxl-telegram"></i></a>
              </nav>
          </div>

          <div className="flex flex-column">
              <nav className="nav-2">

              {/* className="nav-active" - done - create nav-active effects */}

              <Link className="nav_individual" to="https://ethscape.net">Home</Link>
              <Link className="nav_individual glow" to="/">Decentralized app</Link>
              <Link className="nav_individual" to="/store">Store</Link>
              <Link className="nav_individual" to="https://ethscape.net/vote">Vote</Link>
              <Link className="nav_individual" to="https://www.dextools.io/app/ether/pair-explorer/0xf286d6d9789f5d2d4161cbbc5785d265b99244b6">Chart</Link>
              </nav>

            

          </div>

          <div className="col">
            <nav className="nav-3">
              
              {/* <a href="https://app.ethscape.io/signin">Log in</a> 
              <p className="dot">•</p>
              <a href="https://app.ethscape.io/signup">Register</a> */}


              {/* <div className="previous_header"> */}
            {/* OLD NAV BAR */}


          <div className="head_inner">
                      <div className="head_left">
                            <div className="open_nav" onClick={openNav}>
                              <i className={notification ? 'bx bx-menu with_notif' : 'bx bx-menu'} />
                            </div>
                      </div>
                      {/* <Link to='/' className='app_logo_link'>
                          <div className="app_logo"></div>
                          <h1 className="app_name"></h1>
                        </Link> */}

                      <ul className="head_act">
                        {user ? (
                          <div className="user_profile_area">
                            <Notifications />
                            
                            <Dropdown />
                          </div>
                        ) : (
                        <>
                      <li className="head_auth">
                          <Link to="/signin" className="sign_in_up_button media_hide hollow">
                            {/* <i className="bx bx-log-in" /> */}
                            <span className="text_color">{Strings.signIn[lang]}</span>
                          </Link>
                      </li>

                      <p className="dot">•</p>

                      <li className="head_auth">
                          <Link to="/signup" className="sign_in_up_button media_hide">
                            {/* <i className="bx bx-user-plus" /> */}
                            <span className="text_color">{Strings.signUp[lang]}</span>
                          </Link>
                      </li>
                    </>
                  )}
                </ul>
            </div>


       {/* </div> */}


              
            </nav> 
             
           


          </div>




      
      </main>
    </header>



















      

  )
}

export default Header;
