import { useContext, useEffect, useState } from 'react';

import { StoreContext } from 'store/Store';

import Boards from './Boards';
import Threads from './Threads';

const TopBoards = () => {
  document.title = 'EthScape'
  const { setPostType, setFabVisible, setWalletConnectVisible, setForumMenuActive, lang } = useContext(StoreContext)
  const [init, setInit] = useState(true)

  useEffect(() => {
    if (init) {
      setForumMenuActive(true)
      setFabVisible(true)
      setWalletConnectVisible(true)
      setPostType({
        type: 'thread',
        id: null
      })
    }
    setInit(false)
    // eslint-disable-next-line
  }, [init])

  return (
    <>
      {navigator.onLine && <Boards lang={lang} />}
      <Threads lang={lang} />
    </>
  )
}

export default TopBoards;
