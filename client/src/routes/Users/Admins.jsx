import { useContext, useEffect, useState } from 'react';

import { StoreContext } from 'store/Store';

import { useMoreFetch } from 'hooks/useMoreFetch';

import { Strings } from 'support/Constants';

import { Section } from 'components/Section';
import Breadcrumbs from 'components/Breadcrumbs';
import DataView from 'components/DataView';
import { UserCard } from 'components/Card';

const Admins = () => {
  const { setPostType, setFabVisible, setWalletConnectVisible, setForumMenuActive, lang } = useContext(StoreContext)
  document.title = 'EthScape | ' + Strings.admins[lang]
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

  const { loading, moreLoading, noData, items } = useMoreFetch({ method: 'admins' })

  return (
    <Section>
      <Breadcrumbs current={Strings.admins[lang]} links={[
        { title: Strings.home[lang], link: '/' },
        { title: Strings.forum[lang], link: '/forum' },
      ]} />

      <DataView
        data={items}
        noData={noData}
        loading={loading}
        moreLoading={moreLoading}
        card={UserCard}
        noDataMessage={Strings.noAdminsYet[lang]}
        errorMessage={Strings.unableToDisplayUsers[lang]}
      />
    </Section>
  )
}

export default Admins;
