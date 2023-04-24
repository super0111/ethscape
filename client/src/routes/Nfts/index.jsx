import { useContext, useEffect, useState } from 'react';

import { StoreContext } from 'store/Store';
import { Strings } from 'support/Constants';

import { Section, SectionHeader } from 'components/Section';
import Breadcrumbs from 'components/Breadcrumbs';

const Nfts = () => {
  document.title = 'EthScape'
  const { setFabVisible, setWalletConnectVisible, setForumMenuActive, lang } = useContext(StoreContext)
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

  return (
    <>
      <Section>
        <Breadcrumbs current={Strings.nfts[lang]} links={[
            { title: Strings.home[lang], link: '/' },
        ]} />

        <SectionHeader title={Strings.nfts[lang]} />

        <p>{Strings.nftsUnderConstruction[lang]}</p>
      </Section>
    </>
  )
}

export default Nfts;
