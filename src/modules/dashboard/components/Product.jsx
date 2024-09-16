import React, { useContext, useEffect } from 'react'
import { CartContext } from '../context/cart-context';
import axios from 'axios';


const trackInteraction = async (interaction) => {
  try {
    const response = await axios.post('/recordInteraction', interaction, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('Error tracking interaction:', error);
  }
};

export const Product = ({product}) => {
  const ctx = useContext(CartContext);
  const myStyle = {width: "18rem"};
  const addToCart = ()=>{
    ctx.addCart({...product})       
    // Example usage: track when a user views a pizza
    useEffect(() => {
      trackInteraction({ userId: 1, pizzaId: product.name, action: 'addedtocart' });
    }, []);
     }
  return (
   
        <div className="card me-4 my-4 mx-3" style={myStyle}>
        <img src={product.assets.menu['0'].url} className="card-img-top" alt="..."/>
          <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">₹ {product.price}</p>
          <button onClick={addToCart}  className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
        
  )
}
