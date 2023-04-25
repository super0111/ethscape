
import './style.css'

export const FilterForm = (props) => {
  const { 
    productData, 
    setProductFilterData,
    gemstonesCount, 
    squealCount, 
    seasonalCount, 
    packsCount 
  } = props;

  return (
    <div className="filterForm">
      <div className='item' onClick={()=>setProductFilterData(productData)}>
        <label>Show all items</label>
        <div className='value'>{productData.length}</div>
      </div>
      <div className='item' onClick={()=>setProductFilterData(gemstonesCount)}>
        <label>Gemstones</label>
        <div className='value'>{gemstonesCount.length}</div>
      </div>
      <div className='item' onClick={()=>setProductFilterData(squealCount)}>
        <label>Squeal of fortune</label>
        <div className='value'>{squealCount.length}</div>
      </div>
      <div className='item' onClick={()=>setProductFilterData(seasonalCount)}>
        <label>Seasonal</label>
        <div className='value'>{seasonalCount.length}</div>
      </div>
      <div className='item' onClick={()=>setProductFilterData(packsCount)}>
        <label>Packs</label>
        <div className='value'>{packsCount.length}</div>
      </div>
    </div>
  )
}