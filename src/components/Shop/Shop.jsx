import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakeDb';
import { Link, useLoaderData } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const initialCart = useLoaderData();
    const [cart, setCart] = useState(initialCart);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(9);
    // const { count } = useLoaderData();
    // const count = 65;
    const [count, setCount] = useState(0);
    const storedCart = getShoppingCart();
    const storedCartIds = Object.keys(storedCart);
    // const itemsPerPage = 10;
    const numberOfPages = Math.ceil(count / itemsPerPage);

    // const pages = [];
    // for (let i = 0; i < numberOfPages; i++) {
    //     pages.push(i);
    // }
    // console.log(pages);
    const pages = [...Array(numberOfPages).keys()];

    useEffect(() => {
        fetch('https://ema-john-server-dusky.vercel.app/productsCount')
            .then(res => res.json())
            .then(data => setCount(data.count))
    }, [])


    //* 
    //* DONE 1: get the total number of products
    //* DONE 2: number of items per page dynamic
    //* 
    //* 
    //* 
    //* 
    //* 
    //* 
    //* 

    useEffect(() => {
        fetch(`https://ema-john-server-dusky.vercel.app/products?page=${currentPage}&size=${itemsPerPage}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [currentPage, itemsPerPage]);

    // useEffect(() => {
    //     console.log(storedCart);
    //     // step 1: get id of the storedcart
    //     const savedCart = [];
    //     for (const id in storedCart) {
    //         // step 2: get product from products state by using id
    //         const addedProduct = products.find(product => product.id == id)
    //         if (addedProduct) {
    //             // step 3: add quantity
    //             const quantity = storedCart[id];
    //             addedProduct.quantity = quantity;
    //             // step 4: add the product to saved cart
    //             savedCart.push(addedProduct);
    //         }
    //     }
    //     // step 5: set the cart 
    //     setCart(savedCart);
    // }, [products]);

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
    };

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    };

    const handleItemsPerPage = (e) => {
        setCurrentPage(0);
        const val = parseInt(e.target.value);
        setItemsPerPage(val);
    }

    const handlePageMove = (move) => {
        if (move === 'forward' && currentPage < numberOfPages - 1) {
            setCurrentPage(currentPage + 1);
        } else if (move === 'backward' && currentPage) {
            setCurrentPage(currentPage - 1);
        }
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
                <Cart
                    cart={cart}
                    handleClearCart={handleClearCart}
                >
                    <Link className='proceed-link' to={"/orders"}><button className='btn-proceed'>Review Order</button></Link>
                </Cart>
            </div>
            <div className='pagination'>
                <p>Current Page: {currentPage}</p>
                <button onClick={() => handlePageMove('backward')}>Previous</button>
                {
                    pages.map(page => <button
                        className={page === currentPage ? `selected` : ''}
                        onClick={() => setCurrentPage(page)}
                        key={page}
                    >{page}</button>)
                }
                <select value={itemsPerPage} onChange={handleItemsPerPage}>
                    <option value="9">9</option>
                    <option value="12">12</option>
                    <option value="15">15</option>
                    <option value="18">18</option>
                    <option value="24">24</option>
                </select>
                <button onClick={() => handlePageMove('forward')}>Next</button>
            </div>
        </div>
    );
};

export default Shop;