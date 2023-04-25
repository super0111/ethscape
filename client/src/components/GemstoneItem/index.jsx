
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
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
  const { data } = props;
  const [ modal_data, setModal_data ] = useState()
  useEffect(()=>{
    if(data.product_modal_data !== ''){
      setModal_data(JSON.parse(data.product_modal_data));
    }
  }, [])
  
  console.log('modal_datamodal_data', modal_data)
  const [addCartValue, setAddCartValue]= useState(1)
  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <div className="gemstoneItem">
      <img className='moreIcon' src="https://gyazo.com/f46cb6b791f89543c2255c7a5f80cda6.png" onClick={()=>setIsOpen(true)}/>
      <img className='itemImg' src={data.image_url} />
      <div className='name'>{data.item_name}</div>
      <div className='flex justify-center item-center gap-1'>
        <div className='price text-success'>${(data.item_price).toFixed(2)}</div>
        <div className='price text-danger'>${(data.item_price + data.item_discount).toFixed(2)}</div>
      </div>

      <div className='flex addCartForm'>
        <input 
          type='number' 
          value={addCartValue} 
          onChange={(e)=>setAddCartValue(e.target.value)}
        />
        <button>Add to cart</button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={()=>setIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className='modal-title'>{modal_data ? modal_data.title : "No Data"}</div>
        <img src={modal_data?.images} alt='' style={{ width: '80%', margin: 'auto' }}/>
        <div className='modal-text'>{modal_data?.description}</div>
      </Modal>
    </div>
  )
}