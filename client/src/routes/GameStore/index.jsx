import { useContext, useEffect, useState } from 'react';

import { StoreContext } from 'store/Store';

import { Section, SectionHeader } from 'components/Section';
import { BACKEND, Strings } from 'support/Constants';
// import Breadcrumbs from 'components/Breadcrumbs';
import { LoginForm } from 'components/LoginForm';
import { LoginedForm } from 'components/LoginedForm';
import { FilterForm } from 'components/FilterForm';
import { GemstoneItem } from 'components/GemstoneItem';

import './style.css';

const GameStore = () => {
  document.title = 'EthScape'
  const { user, setFabVisible, setWalletConnectVisible, setForumMenuActive } = useContext(StoreContext)
  const [ init, setInit ] = useState(true)
  const [ productData, setProductData ] = useState([])
  const [ productFilterData, setProductFilterData ] = useState([])
  const [ gemstonesCount, setGemstonesCount ] = useState([])
  const [ squealCount, setSquealCount ] = useState([])
  const [ seasonalCount, setSeasonalCount ] = useState([])
  const [ packsCount, setPacksCount ] = useState([])

  useEffect(() => {
    if (init) {
      setForumMenuActive(false)
      setFabVisible(false)
      setWalletConnectVisible(true)
    }
    setInit(false)
  }, [init])

  useEffect( async ()=> {
    fetch(BACKEND() + '/api/getProducts1', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then( async response => {
      const data = await response.json();
      const gemstonesCount = data.filter((item) =>(item.item_name).includes('gemstones'))
      const squealCount = data.filter((item) =>(item.item_name).includes('squeal'))
      const seasonalCount = data.filter((item) =>(item.item_name).includes('spins'))
      const packsCountCount = data.filter((item) =>(item.item_name).includes('pack'))
      setProductData(data);
      setProductFilterData(data);
      setGemstonesCount(gemstonesCount)
      setSquealCount(squealCount)
      setSeasonalCount(seasonalCount)
      setPacksCount(packsCountCount)
    })
  }, [])

  return (
    <>
      <Section>
        <div className='flex justify-center w-100'>
          <img src="https://ethscape.net/logo.png" />
        </div>
        <div className='store'>
          <div className='leftBar'>
            {
              user ? <LoginedForm />
              : <LoginForm />
            }
            <FilterForm 
              productData={productData}
              setProductData={setProductData} 
              setProductFilterData={setProductFilterData} 
              gemstonesCount={gemstonesCount}
              squealCount={squealCount}
              seasonalCount={seasonalCount}
              packsCount={packsCount}
            />
          </div>
          <div className='rightBar'>
            <h3 className="cathead">All products</h3>
            <hr></hr>
            <div className='flex flex-wrap justify-between item-list'>
              {
                productFilterData.length>0 && productFilterData.map((item, i) => (
                  <div key={i} style={{width: '24%'}}>
                    <GemstoneItem productData={item} />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}

export default GameStore;
