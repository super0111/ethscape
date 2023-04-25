
import { useEffect, useState, useContext } from 'react';
import Modal from 'react-modal';
import { BACKEND, Strings } from 'support/Constants';
import { StoreContext } from 'store/Store';

import './style.css';

const customStyles = {
  content: {
    width: '30%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgb(10 10 10 / 75%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
};

Modal.setAppElement('#root');

export const GemstoneItem = (props) => {
  const { productData } = props;
  const { user } = useContext(StoreContext)
  const [ modal_data, setModal_data ] = useState()
  const [ modalIsOpen, setIsOpen ] = useState(false);
  const [ productCount, setProductCount ] = useState(1);
  
  useEffect(()=>{
    if(productData.product_modal_data !== ''){
      setModal_data(JSON.parse(productData.product_modal_data));
    }
  }, [])

  const addToCart = () => {
    if(!user) {
      alert('Please SignIn')
      return
    }

    const validatedBody ={
      item_id: productData._id,
      user_id: user.name,
      product_count: productCount,
    }

    fetch(BACKEND() + '/api/addToCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(validatedBody)
    })
    .then(response => {
      console.log("response", response)
    })
  }

  return (
    <div className="gemstoneItem">
      <img className='moreIcon' src="https://gyazo.com/f46cb6b791f89543c2255c7a5f80cda6.png" onClick={()=>setIsOpen(true)} />
      <img className='itemImg' src={productData.image_url} />
      <div className='name'>{productData.item_name}</div>
      <div className='flex justify-center item-center gap-1'>
        <div className='price text-success'>${(productData.item_price).toFixed(2)}</div>
        <div className='price text-danger'>${(productData.item_price + productData.item_discount).toFixed(2)}</div>
      </div>

      <div className='flex addCartForm'>
        <input 
          type='number' 
          value={productCount} 
          onChange={(e)=>setProductCount(e.target.value)}
        />
        <button onClick={addToCart}>Add to cart</button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={()=>setIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className='modal-title'>{modal_data ? modal_data.title : "No Data"}</div>
        <img src={modal_data?.images} alt='' style={{ width: '80%', margin: 'auto' }} />
        <div className='modal-text'>{modal_data?.description}</div>
      </Modal>
    </div>
  )
}