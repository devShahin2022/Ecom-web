import './Cart.css';

const Cart = ({data,incre,decre,removeCartItem}) => {
    return (
        <div>
           <div className='cart-item-wrap'>
                <div>
                <p>{data.name}</p>
                <p><b>{data.eaProTotPrice}</b> tk</p>
                </div>
                <div className='cart-controller'>
                    <button onClick={() => decre(data.id)} >-</button>
                    <p><b>{data.cartQuantity}</b></p>
                    <button onClick={() => incre(data.id)}>+</button>
                </div>
                <button onClick={() => removeCartItem(data.id)} className='cart-delete'>d</button>
           </div>
        </div>
    );
};

export default Cart;