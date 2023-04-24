
import './style.css'

export const FilterForm = () => {
  return (
    <div className="filterForm">
      <div className='item'>
        <label>Show all items</label>
        <div className='value'>12</div>
      </div>
      <div className='item'>
        <label>Gemstones</label>
        <div className='value'>3</div>
      </div>
      <div className='item'>
        <label>Squeal of fortune</label>
        <div className='value'>4</div>
      </div>
      <div className='item'>
        <label>Seasonal</label>
        <div className='value'>3</div>
      </div>
      <div className='item'>
        <label>Packs</label>
        <div className='value'>2</div>
      </div>
    </div>
  )
}