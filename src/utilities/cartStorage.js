// ========//////======== NOTICE : front end a data gulo cart ar majh khane aktu 
// lafalafi korar karon hoilo ami array item delete korar jonno splice use kora hoice


// check already insert or not in cart
const isExitsProductInCart = (id) =>{
    // console.log(id);
    const exitCartItems = dataRetriveLocal();
    if(exitCartItems !== null){
        // console.log(exitCartItems);
        const res = exitCartItems.find(product => product.id === id);
        // console.log("inside find", res);
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
        console.log(id);
        let products = dataRetriveLocal();
        let ids =products.map(product => product.id);
        const indexId = ids.indexOf(id);
        let sliceProduct = products.splice(indexId,1);
        let qnty = sliceProduct[0].cartQuantity;
        if(qnty < 10){ // condition max selection
            qnty += 1;
            sliceProduct[0].cartQuantity = qnty;
            products.push(sliceProduct[0]);
            localStorage.clear("cart");
            const updatedPrices = calcEachProdAmt(products);
            dataStoreLocal(updatedPrices);
        }else{
            console.log("sooooory!!!! max 10 product you will be added.");
        }
}

// product quantity decrement
const prodQntyDecre = (id) => {
    console.log(id);
    let products = dataRetriveLocal();
    let ids =products.map(product => product.id);
    const indexId = ids.indexOf(id);
    let sliceProduct = products.splice(indexId,1);
    let qnty = sliceProduct[0].cartQuantity;
    if(qnty > 1){ // condition min selection
        qnty -= 1;
        sliceProduct[0].cartQuantity = qnty;
        products.push(sliceProduct[0]);
        localStorage.clear("cart");
        // dataStoreLocal(products);
        const updatedPrices = calcEachProdAmt(products);
        dataStoreLocal(updatedPrices);
    }else{
        console.log("sooooory!!!! minimum product selection is 1");
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