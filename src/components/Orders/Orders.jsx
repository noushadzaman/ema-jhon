import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Orders.css'

const Orders = () => {
    const [] = useState([])
    const savedCart = useLoaderData();
    console.log(savedCart);

    return (
        <div className='shop-container'>
            <div className='review-container'>
                {
                    savedCart.map(product => <ReviewItem
                        key={product.id}
                        product={product}
                    >
                    </ReviewItem>)
                }
            </div>
            <div className='savedCart-container'>
                <savedCart savedCart={savedCart}></savedCart>
            </div>
        </div>
    );
};

export default Orders;