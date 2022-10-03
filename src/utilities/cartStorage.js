// ========//////======== NOTICE : Problem solved....


// check already insert or not in cart
const isExitsProductInCart = (id) =>{
    const exitCartItems = dataRetriveLocal();
    if(exitCartItems !== null){
        const res = exitCartItems.find(product => product.id === id);
        if(res === undefined){
            return false;
        }else{
            return true;
        }
    }else{
        return false;
    }
}

// insert cart items
const insertItemsInCart = (product) => {
     const productId = product.id;
    product.cartQuantity = 1; 
    product.isActive = true;
    product.eaProTotPrice = product.price;
    if(isExitsProductInCart(productId)){
        console.log("already data save into cart ! select another product");
    }else{
        const prevLocalData = dataRetriveLocal() || [];
        prevLocalData.push(product);
        const updatedPrices = calcEachProdAmt(prevLocalData);
        dataStoreLocal(updatedPrices);
    }
}

// data retrive from localStorage
const dataRetriveLocal = () => {
    const localCartDataJson = localStorage.getItem("cart");
    const localCartData = JSON.parse(localCartDataJson);
    return localCartData;
}
// data store to localStorage
const dataStoreLocal = (data) => {
    const makeString = JSON.stringify(data);
    localStorage.setItem("cart", makeString);
}

// cart each item total price setup as a object property
const calcEachProdAmt = (products) => {
    let updatedProducts = [];
    localStorage.clear("cart");
    products.forEach(product => {
        const updatedPrice = product.price * product.cartQuantity;
        product.eaProTotPrice = updatedPrice;
        updatedProducts.push(product);
    });
    return updatedProducts;
}
// product quantity increment
const prodQntyIncre = (id) => {
    let products = dataRetriveLocal();
    for (let i = 0; i < products.length; i++) {
        if(products[i].id === id){
            products[i].cartQuantity =  products[i].cartQuantity + 1;
            if(products[i].cartQuantity < 11){
                localStorage.clear("cart");
                const updatedPrices = calcEachProdAmt(products);
                dataStoreLocal(updatedPrices);
                break;
            }else{
                console.log("do not access up to add 10 products");
                break;
            }
        }
    }
}

// product quantity decrement
const prodQntyDecre = (id) => {
    let products = dataRetriveLocal();
    for (let i = 0; i < products.length; i++) {
        if(products[i].id === id){
            products[i].cartQuantity =  products[i].cartQuantity - 1;
            if(products[i].cartQuantity > 0){
                localStorage.clear("cart");
                const updatedPrices = calcEachProdAmt(products);
                dataStoreLocal(updatedPrices);
                break;
            }else{
                console.log("min selection product will be 1");
                break;
            }
        }
    }
}
// total prices
const totalCost = () => {
    let sum = 0;
    const localCartItems = dataRetriveLocal();
    if(localCartItems !== null){
        localCartItems.forEach(product =>{
            sum += product.eaProTotPrice;
        });
        return sum;
    }else{
        return 0;
    }

}

// remove cart item 
const removeCartItems = (id) => {
    const localCartItems = dataRetriveLocal();
    if(localCartItems !== null){
        const ids = localCartItems.map(product => product.id);
        const indxId = ids.indexOf(id);
        localCartItems.splice(indxId,1);
        localStorage.clear("cart");
        const updatedPrices = calcEachProdAmt(localCartItems);
        dataStoreLocal(updatedPrices);
    }
}

export {insertItemsInCart,
    dataRetriveLocal,
    prodQntyIncre,
    prodQntyDecre,
    totalCost,
    removeCartItems,
};