import { Fragment, useContext, useEffect, useState } from 'react';

import { StoreContext } from 'store/Store';

import { BACKEND, Strings } from 'support/Constants';

import Footer from 'components/Layout/Footer';
import Metamask from 'components/Metamask';
import Modal from 'components/Modal';

import Header from './Header';
import HomeMenu from './HomeMenu';
import ForumMenu from './ForumMenu';
import BackgroundImage from './BackgroundImage';
import './style.css';

const Layout = ({ children }) => {
  const { user, token, modalOpen, setModalOpen, forumMenuActive,
    postType, setPostType, fab, walletConnect, lang } = useContext(StoreContext)
  const [menuOpen, setMenuOpen] = useState(false)
  const coverOpen = menuOpen || modalOpen  ? 'cover open' : 'cover'

  const [onlineIndicator, setOnlineIndicator] = useState(0)

  useEffect(() => {
    if (user) {
      updateLastSeen()
      setOnlineIndicator(setInterval(() => updateLastSeen(), 60000))
    }

    return () => {
      clearInterval(onlineIndicator)
    }
    // eslint-disable-next-line
  }, [user])

  const updateLastSeen = () => {
    fetch(BACKEND() + '/api/profile/setOnline', {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(response => response.json())
      .catch(console.error)
  }

  const fabClick = () => {
    setModalOpen(!modalOpen)
  }

  const coverClick = () => {
    menuOpen && setMenuOpen(false)
    modalOpen && setModalOpen(false)
  }

  const modalClose = () => {
    if (
      postType.type === 'answer' ||
      postType.type === 'answerEdit' ||
      postType.type === 'userThreadEdit' ||
      postType.type === 'adminThreadEdit'
    ) {
      setPostType({
        type: 'answer',
        id: postType.id
      })
    }
    if (postType.type === 'fileEdit') {
      setPostType({
        type: 'upload',
        id: null
      })
    }
    setModalOpen(false)
  }

  useEffect(() => {
    if (menuOpen || modalOpen) {
      document.body.classList.add('noscroll')
    } else {
      document.body.classList.remove('noscroll')
    }
  }, [menuOpen, modalOpen])

  return (
    <Fragment>
      <Header setMenuState={() => setMenuOpen(!menuOpen)} />

      <BackgroundImage />

      <section className="container">
        {/* {!forumMenuActive && (
          <HomeMenu open={menuOpen} setMenuOpen={setMenuOpen} />
        )}
        {forumMenuActive && (
          <ForumMenu open={menuOpen} setMenuOpen={setMenuOpen} />
        )} */}

        <main className="content">
          {children}
        </main>

        {/* {user && (
          <div className="right_bar">
            {!walletConnect && !user.address && <Metamask text={Strings.connectWallet[lang]}></Metamask>}
            {fab && (
              <div className="fab" onClick={fabClick}>
                {
                  postType.type === 'answer' ||
                  postType.type === 'answerEdit' ||
                  postType.type === 'userThreadEdit' ||
                  postType.type === 'adminThreadEdit'
                  ? (
                  <Fragment>
                    <span>{Strings.answer[lang]}</span>
                    <i className="bx bx-pencil" />
                  </Fragment>
                ) : postType.type === 'upload' || postType.type === 'fileEdit' ? (
                  <Fragment>
                    <span>{Strings.newFile[lang]}</span>
                    <i className="bx bx-cloud-upload" />
                  </Fragment>
                ) : (
                  <Fragment>
                    <span>{Strings.createNew[lang]}</span>
                    <i className="bx bx-pencil" />
                  </Fragment>
                )}
              </div>
            )}
          </div>
        )} */}
      </section>

      <Footer />

      {user && modalOpen && <Modal open={modalOpen} close={modalClose} />}

      <div className={coverOpen} onClick={coverClick} />
    </Fragment>
  )
}

export default Layout;
