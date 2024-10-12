// Base imports
import React, { useState, useEffect } from 'react';
import './App.css';
import { CartItem, Dessert } from './interfaces';
// Components 
import Card from './components/Card';
// Icons/Images
import EmptyCart from './assets/illustration-empty-cart.svg';
import removeItemIcon from './assets/icon-remove-item.svg';
import carbonNeutralIcon from './assets/icon-carbon-neutral.svg';

function App() {
  const data = require('./data.json');

  const [itemsInCart, setItemsInCart] = useState<CartItem[]>([]);
  const [itemsInCartCount, setItemsInCartCount] = useState(0);
  const [orderTotal, setOrderTotal] = useState('');

  const renderItemsInCart = () => {
    return itemsInCart.map((item: CartItem, i: number) => (
      <div className='cart-item-container'>
        <div>
          <div className='cart-item-name'>{item.name}</div>
          <div className='cart-item-details'>
            <div className='cart-item-quantity'>{item.quantity}x</div>

            <div className='cart-item-price-and-total'>
              <div className='cart-item-price'>@{item.price.toFixed(2)}</div>
              <div className='cart-item-total'>${(item.quantity * Number(item.price)).toFixed(2)}</div>
            </div>
          </div>
        </div>

        <div className='remove-from-cart-container'>
          <img className='remove-from-cart-icon' src={removeItemIcon} alt='remove-item-icon' />
        </div>
      </div>
    ))
  };

  useEffect(() => {
    const quantities = itemsInCart.map(item => item.price * item.quantity);

    const sum = quantities.reduce((acc, val) => (
      acc + val
    ), 0);

    setOrderTotal(sum.toFixed(2));
  }, [itemsInCartCount]);

  return (
    <div className='outer-container'>
      <div className='inner-container-1'>
        <h1>Desserts</h1>

        <div className='card-container'>
          {data?.map((item: Dessert, i: number) =>
            <Card
              key={i}
              index={i}
              dessert={item}
              itemsInCart={itemsInCart}
              setItemsInCart={setItemsInCart}
              itemsInCartCount={itemsInCartCount}
              setItemsInCartCount={setItemsInCartCount}
            />
          )}
        </div>
      </div>

      <div className='inner-container-2'>
        <h2 className='your-cart-title'>Your Cart ({itemsInCartCount})</h2>
        {itemsInCartCount > 0 ?
          <>
            {renderItemsInCart()}
            <div className='order-total-container'>
              <div className='order-total'>Order Total</div>
              <div className='total'>${orderTotal}</div>
            </div>

            <div className='carbon-neutral-container'>
              <img src={carbonNeutralIcon} alt='carbon-neutral-icon' />
              <span>This is a carbon-neutral delivery</span>
            </div>

            <button className='confirm-order'>Confirm Order</button>
          </>
          :
          <>
            <img className='empty-cart-icon' src={EmptyCart} alt='empty-cart-icon' />
            <div className='added-items-here'>Your added items will appear here</div>
          </>
        }
      </div>
    </div>
  );
}

export default App;
