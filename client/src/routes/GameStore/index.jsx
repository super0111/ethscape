import { useContext, useEffect, useState } from 'react';

import { StoreContext } from 'store/Store';
import { Strings } from 'support/Constants';

import { Section, SectionHeader } from 'components/Section';
import Breadcrumbs from 'components/Breadcrumbs';
import { LoginForm } from 'components/LoginForm';
import { FilterForm } from 'components/FilterForm';
import { GemstoneItem } from 'components/GemstoneItem';

import './style.css';

const GameStore = () => {
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
            <div className='item-list'>
              <GemstoneItem />
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}

export default GameStore;
