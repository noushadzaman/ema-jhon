import { getShoppingCart } from "../utilities/fakeDb";

const cartProductsLoaders = async () => {
    const loadedProducts = await fetch('products.json');
    const products = await loadedProducts.json();


    //! if cart data in database u have to use async await
    const storedCart = getShoppingCart();
    const savedCart = [];

    for(const id in storedCart){
        const addedProduct = products.find(pd=> pd.id === id)
        if(addedProduct){
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct)
        }
    }


    // console.log(storedCart);
    return savedCart;
};
export default cartProductsLoaders;
