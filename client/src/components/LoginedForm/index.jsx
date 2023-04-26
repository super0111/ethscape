
import { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { StoreContext } from 'store/Store';
import { BACKEND } from 'support/Constants';

import './style.css'

const customStyles = {
  content: {
    width: '40%',
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
    position: 'relative'
  },
};
Modal.setAppElement('#root');

export const LoginedForm= () => {
  const { user, logout, cartLists, setCartLists } = useContext(StoreContext)
  const [ modalIsOpen, setIsOpen ] = useState(false);
  const [ totalPrice, setTotalPrice ] = useState(0);

  useEffect(()=> {
    let total = 0;
    cartLists && cartLists.map((item) => {
      total = total + item.item_price * item.product_count;
      setTotalPrice(total)
    });
  }, [cartLists])

  useEffect(()=> {
    fetch(BACKEND() + '/api/getCartLists', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then( async response => {
      // console.log("res", await response.json())
      setCartLists(await response.json())
    })
  }, [])

  const emptyCartList = () => {
    if(!user) {
      alert('Please SignIn')
      return
    }

    const validatedBody ={
      user_id: user.name,
    }

    fetch(BACKEND() + '/api/emptyCartList1', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(validatedBody)
    })
    .then( async response => {
      if(response.status === 200) {
        setTotalPrice(0)
      }
    })
  }

  const checkout = () => {
    if(totalPrice === 0) {
      alert("Please add to cart")
      return
    }

    const validatedBody = {
      user_id: user.id,
      user_name: user.name,
      amount: totalPrice,
    }

    fetch(BACKEND() + '/api/checkoutPayment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(validatedBody)
    })
    .then( async response => {
      if(response.status === 200) {
        emptyCartList()
        setTotalPrice(0)
        setIsOpen(false)
      } else {
        alert("There was some error") 
        return
      }
    })
  }

  return (
    <div className="loginedForm">
      <h4>Logged in as</h4>
      <label>YOU HAVE NO PRODUCTS IN YOUR SHOPPING CART.</label>
      <div className="mid-text">Total: ${totalPrice.toFixed(2)}</div>

      <button onClick={()=>setIsOpen(true)}>Checkout with Paypal</button>
      <button onClick={logout}>Log out</button>

      <div className="mid-text text-center cursor-pointer" onClick={emptyCartList}>Empty cart</div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={()=>setIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h1 className='modal-title'>TERMS OF SERVICE</h1>
        <div className='modal-text'>
          Payments through this store is a payment for the virtual items contained in the purchase. This transaction is final and there are no refunds. If you are banned for breaking the rules, you will not be refunded. Bans are subject to the full discretion of the server admins and rules can be changed at any time. There is no guarantee on being able to enter the server, and if the server is no longer operated the virtual items are forfeit. Refund requests due to issues concerning lag, game glitches, or any other issues are subject to the discretion of the server administration team. All items are virtual and have no value. By purchasing, you agree that all purchases are final, refunds will ONLY be given at the discretion of EthScape's administration.
        </div>
        <div className='modal-text text-center'>
          Once the transaction is done, you can relog to receive your items in-game.
        </div>
        <button 
          onClick={checkout}
          className='modal-accept'
          style={{
            width: '100%',
            height: '30px',
            marginTop: '30px',
            background: '#43AC6A',
            border: 'none',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontFamily: 'inherit',
            textAlign: 'center',
          }}
        >Accept</button>
        <div className='close-modal' onClick={()=>setIsOpen(false)}>✖</div>
      </Modal>
    </div>
  )
}