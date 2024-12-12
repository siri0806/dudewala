import './cardes.css';
import React from 'react';
import { useState} from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Cardes(props) {
  let dispatch = useDispatchCart();
  let data = useCart();

  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  const handleAddToCart = () => {
    const totalPrice = quantity * props.foodItem.price;
    const item = {
      id: props.foodItem._id,
      name: props.foodItem.name,
      image: props.foodItem.image,
      description: props.foodItem.description,
      quantity: props.foodItem.quantity,
      price: props.foodItem.price,
      brand: props.foodItem.brand,
      selectedQuantity: quantity,
      totalPrice: totalPrice
    };
  
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
  
    if (food.length !== 0) {
      
      dispatch({ type: 'UPDATE', id: props.foodItem._id, totalPrice:totalPrice, selectedQuantity: quantity});
      return;
    }
  
    dispatch({ type: 'ADD', item });
  };
  
  

  return (
    <div className="card" style={{ width: "15rem", backgroundColor: 'white #99DBF5' }}>
      <img style={{ maxHeight: "10rem", objectFit: "contain" ,backgroundColor:' white'}} src={props.foodItem.image} className="card-img-top img-fluid" alt={props.foodItem.description} />
      <hr style={{ margin: "0" }} />
      <div className="card-body" style={{ maxHeight: "15rem" }}>
        <h5 className="card-title">
          {props.foodItem.name}
        </h5>
        <p className="card-text" style={{ marginBottom: '6px' }}>
          product company: <span style={{ fontWeight: '600' }}>{props.foodItem.brand}</span>
          <br />
          qty per pack: <span style={{ fontWeight: '600' }}>{props.foodItem.quantity}</span>
          <br />
          price per pack: <span style={{ fontWeight: '600' }}>{props.foodItem.price}</span>
        </p>
        <div style={{ marginBottom: '6px' }}>
          <label htmlFor="amount">Quantity:</label>
          <input style={{ marginLeft: '10px', borderRadius: '5px', boxShadow: '0 5px 7px rgba(0, 0, 0, 0.2)' }} type="number" id="amount" name="amount" min="0" max="100" step="1" value={quantity}
            onChange={handleQuantityChange} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p>total price: <span style={{ fontWeight: '600' }}>{quantity * props.foodItem.price}</span></p>
          <div>
            <button type="button" className="btn btn-light"
              style={{ "--bs-btn-font-size": ".75rem", backgroundColor: ' #99DBF5', boxShadow: '0 5px 7px rgba(0, 0, 0, 0.2)' }} onClick={handleAddToCart}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
