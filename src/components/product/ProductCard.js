import React from 'react';
import './ProductCard.css';

const ProductCard = ({data, addToCart, cartItem}) => {
    let activeSts = '';
    for (let i = 0; i < cartItem.length; i++) {
       if(cartItem[i].id === data.id){
        activeSts = true;
        break;
       }else{
        activeSts = false;
       }
    }
    return (
        <div className='product-wrapper'>
            <h3>{data.name}</h3>
            <p>{data.price}</p>
            <button className={activeSts ? "disableBtn" : ""}  onClick={() => addToCart(data)}>{activeSts ?" Already added ": "Add to cart"}</button>
        </div>
    );
};

export default ProductCard;