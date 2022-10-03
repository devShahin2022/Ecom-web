import { useEffect, useState } from 'react';
import './App.css';
import Cart from './components/cart/Cart';
import Header from './components/header/Header';
import ProductCard from './components/product/ProductCard';
import { dataRetriveLocal, insertItemsInCart, prodQntyDecre, prodQntyIncre, removeCartItems, totalCost } from './utilities/cartStorage';


function App() {
return (
    <div className="App">
      <Header></Header>
      <Shop></Shop>
    </div>
  );
}


const Shop = () => {
  const fakeData = [
    {
      id : 0,
      price:300,
      name:"head phone"
    },
    {
      id : 1,
      price:340,
      name:"Charger"
    },
    {
      id : 2,
      price:100,
      name:"Mobile stand"
    },
    {
      id : 3,
      price:1000,
      name:"Speaker"
    },
    {
      id : 4,
      price:1200,
      name:"Sound box"
    },
    {
      id :5,
      price:1500,
      name:"Sound box core"
    },
    {
      id : 6,
      price:210,
      name:"Sound box 1"
    },
    {
      id : 7,
      price:2200,
      name:"Sound box 2"
    }
  ]

// let initCartProducts = [
//   {
//     "id" : 1,
//     "name":"Header",
//     "cartQuantity" : 2,
//     "carteachItemTotalPrice" : 200, // aita notun toiri korte hbe
//     "price" : 210,
//     "cardAddStatus" : false
//   },
//   {
//     "id" : 2,
//     "name":"Feather",
//     "cartQuantity" : 1,
//     "carteachItemTotalPrice" : 400, // aita notun toiri korte hbe
//     "price" : 20,
//     "cardAddStatus" : false
//   },
//   {
//     "id" : 3,
//     "name":"Kedar",
//     "cartQuantity" : 1,
//     "carteachItemTotalPrice" : 500, // aita notun toiri korte hbe
//     "price" : 40,
//     "cardAddStatus" : false
//   }
// ];

//let prevCartData = // localhost cart product key name is cartProductKey

// state set for perform button status, cart product, items calculation dynamically
// const [cartItems, setCartItems] = useState (initCartProducts);


let initCartData = dataRetriveLocal() || [];
const [cartItems, setCartItems] = useState(initCartData);
// product add to cart items
const addToCart = (product) =>{
  insertItemsInCart(product);
  // console.log(dataRetriveLocal());
  let addItems = dataRetriveLocal();
  setCartItems(addItems);
}

// increment cart
const incre = (id) => {
  prodQntyIncre(id);
  console.log("data retrive from updated everything : ",dataRetriveLocal());
  let incrementProd = dataRetriveLocal();
  setCartItems(incrementProd);
}
// product quantity decrement
const decre = (id) => {
  prodQntyDecre(id);
  // console.log("data retrive from updated everything : ",dataRetriveLocal());
  let decrementProd = dataRetriveLocal();
  setCartItems(decrementProd);
}

// remove cart item
const removeCartItem = (id) => {
  removeCartItems(id);
  let decrementProd = dataRetriveLocal();
  setCartItems(decrementProd);
}

  return (
    <div>
      <div className='left-contant-area'>
        {
          fakeData.map(product => <ProductCard
            key={product.id}
            data={product}
            cartItem = {cartItems}
            addToCart = {addToCart}
            
            >
            </ProductCard> )
        }
        
      </div>
      <div className='right-contant-area'>
        <div className='test1'>
          <div className='cart-header'><h3>cart items : {cartItems.length}</h3></div>
          <div className='cart-header'><h3>Total price : {totalCost()}</h3></div>
          {
            cartItems.map(items =>  <Cart
              key = {items.id}
              data = {items}
              incre = {incre}
              decre = {decre}
              removeCartItem = {removeCartItem}
            > 
            </Cart> )
          }
        </div>
      </div>
    </div>
  );
    
}
export default App;