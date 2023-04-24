
import { useState } from 'react';
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
  },
};

Modal.setAppElement('#root');

export const GemstoneItem = () => {
  let subtitle;
  const [addCartValue, setAddCartValue]= useState(1)
  const [modalIsOpen, setIsOpen] = useState(false);

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = 'red';
  }

  return (
    <div className="gemstoneItem">
      <img className='moreIcon' src="https://gyazo.com/f46cb6b791f89543c2255c7a5f80cda6.png" onClick={()=>setIsOpen(true)}/>
      <img className='itemImg' src="https://gyazo.com/31c34cbd0690875481b599fe4d3693d7.png" />
      <div className='name'>10 gemstones</div>
      <div className='flex justify-center item-center'>
        <div className='price text-success'>$8.00</div>
        <div className='price text-danger'>$10.00</div>
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
        onAfterOpen={afterOpenModal}
        onRequestClose={()=>setIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className='modal-title'>25 squeals spins</div>
        <div className='modal-text'>
          The squeal spins will be added to your account after you relog.
          You can use these spins to spin the squeal of fortune.
          Relog your account in-game after your purchase to receive
          your items.
        </div>
      </Modal>
    </div>
  )
}