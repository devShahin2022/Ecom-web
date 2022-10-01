import { useState } from 'react';
import './App.css';
import Cart from './components/cart/Cart';
import Header from './components/header/Header';
import ProductCard from './components/product/ProductCard';

function App() {
return (
    <div className="App">
      <Header></Header>
      <Shop></Shop>
    </div>
  );
}

let sum = 0;
let existAddToCartItems = [];
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
    }
  ]
  const checkInsertOrNot = (arr,curId) => {
    if(arr.includes(curId)){
      return true;
    }else{
      return false;
    }
  }
  const [currentData, setData] = useState(sum);
  const [exitsItems, setExitsItems] = useState(existAddToCartItems);
  const updateSum = (eachProduct) => {
    sum += eachProduct.price;
    setData(sum);
    const curProductId = eachProduct.id;
    const checkExistId = checkInsertOrNot(exitsItems,curProductId);
    if(!checkExistId){
      const newArr = [...existAddToCartItems,curProductId];
      existAddToCartItems = [...newArr];
      setExitsItems(newArr);
    }
  } 
  return (
    <div>
      <div className='left-contant-area'>
        <h1>Hello World</h1>
        {
          fakeData.map(each => {
            let status = '';
            for (let i = 0; i < exitsItems.length; i++) {
              if(exitsItems[i] === each.id){
                status = true;
                break;
              }else{
                status = false;
              }
            }
            return <ProductCard key={each.id} changeText ={status ? "Product added" : "Add to cart" } activeColor={status ? "demoBtn active" : "demoBtn"} fakeData={each} updateSum = {updateSum} ></ProductCard>
          })
        }
      </div>
      <div className='right-contant-area'>
        <div className='test1'>
          <Cart data={currentData} ></Cart>
        </div>
      </div>
    </div>
  );
    
}
export default App;