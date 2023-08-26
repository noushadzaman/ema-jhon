import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, getShoppingCart } from '../../utilities/fakeDb';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('../../../public/products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    useEffect(() => {
        const storedCart = getShoppingCart();
        // step 1: get id of the storedcart
        const savedCart = [];
        for (const id in storedCart) {
            // step 2: get product from products state by using id
            const addedProduct = products.find(product => product.id == id)
            if (addedProduct) {
                // step 3: add quantity
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                // step 4: add the product to saved cart
                savedCart.push(addedProduct);
            }
        }
        // step 5: set the cart 
        setCart(savedCart);
        console.log(savedCart);
    }, [products])

    const handleAddToCart = (product) => {
        // const newCart = [...cart, product];
        let newCart = [];
        const exists = cart.find(pd => pd.id === product.id)
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id);
            newCart = [...remaining, exists];
        }
        setCart(newCart);
        addToDb(product.id);
    }

    return (
        <div className='shop-container'>
            <div className='products-container'>
                {
                    products.map(card => <Product
                        product={card}
                        key={card.id}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className='cart-container'>
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;