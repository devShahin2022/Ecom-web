import React from 'react';
import './ProductCard.css';

const ProductCard = (props) => {
    // let activeColor = false;
    // let activeColorVal = "demoBtn";
    // let activeColorVal1 = "demoBtn active";
    
     const {price} = props.fakeData;
    return (
        <div className='demoFlex'>
            <button onClick={() => props.updateSum(props.fakeData)} className={props.activeColor}>{props.changeText} {price}</button>
        </div>
    );
};

export default ProductCard;