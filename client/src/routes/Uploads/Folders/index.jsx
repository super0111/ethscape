import { useContext, useEffect, useState } from 'react';

import { StoreContext } from 'store/Store';

import { Strings } from 'support/Constants';

import { Section } from 'components/Section';
import Breadcrumbs from 'components/Breadcrumbs';

import Items from './Items';

const Folders = () => {
  const { setPostType, setFabVisible, setWalletConnectVisible, setForumMenuActive, lang } = useContext(StoreContext)
  document.title = 'EthScape | ' + Strings.filesUploads[lang]
  const [init, setInit] = useState(true)

  useEffect(() => {
    if (init) {
      setForumMenuActive(true)
      setFabVisible(true)
      setWalletConnectVisible(true)
      setPostType({
        type: 'upload',
        id: null
      })
    }
    setInit(false)
    // eslint-disable-next-line
  }, [init])

  return (
    <Section>
      <Breadcrumbs current={Strings.uploadsFolders[lang]} links={[
        { title: Strings.home[lang], link: '/' },
        { title: Strings.forum[lang], link: '/forum' },
      ]} />

      <Items lang={lang} />
    </Section>
  )
}

export default Folders;
