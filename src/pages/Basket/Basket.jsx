import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBasket } from './fetchBasket';

function Basket({ id }) {
    const basket = useSelector(state => state.basket.basket);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBasket(id));
    }, [dispatch, id]);

    return (
        <div>
            {basket ? (
                <>
                    <h2>Basket</h2>
                    <p>Delivery method ID: {basket.deliveryMethodId}</p>
                    <p>Payment intent ID: {basket.paymentIntentId}</p>
                    <p>Client secret: {basket.clientSecret}</p>
                    <ul>
                        {basket.basketItems.map(item => (
                            <li key={item.id}>
                                <div>{item.productName}</div>
                                <div>{item.price}</div>
                                <div>{item.quantity}</div>
                                <div>{item.pictureUrl}</div>
                                <div>{item.brand}</div>
                                <div>{item.type}</div>
                            </li>
                        ))}
                    </ul>
                    <p>Shipping price: {basket.shippingPrice}</p>
                </>
            ) : (
                <p>Loading basket...</p>
            )}
        </div>
    );
}

export default Basket;