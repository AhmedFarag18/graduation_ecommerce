import { useDispatch, useSelector } from 'react-redux';
import {
    addItemToBasket,
    createPaymentIntent,
    deleteBasket,
    deleteLocalBasket,
    fetchBasket,
    removeItemFromBasket,
    setShippingPrice
} from './basketActions';
import { getCurrentBasket, getCurrentBasketTotals } from './basketSelectors';
import { useEffect } from 'react';


function Basket_final() {

    const dispatch = useDispatch();

    // Fetch the basket when the component mounts
    useEffect(() => {
        dispatch(fetchBasket(basketId));
    }, [dispatch, basketId]);

    // Add an item to the basket
    const handleAddToBasket = (item) => {
        dispatch(addItemToBasket(item));
    };

    // Remove an item from the basket
    const handleRemoveFromBasket = (itemId) => {
        dispatch(removeItemFromBasket(itemId));
    };

    // Set the shipping price for the basket
    const handleSetShippingPrice = (deliveryMethod) => {
        dispatch(setShippingPrice(deliveryMethod));
    };

    // Create a payment intent for the basket
    const handleCreatePaymentIntent = () => {
        dispatch(createPaymentIntent());
    };

    // Delete the basket
    const handleDeleteBasket = () => {
        dispatch(deleteBasket());
    };

    // Delete the local basket
    const handleDeleteLocalBasket = () => {
        dispatch(deleteLocalBasket());
    };


    const basket = useSelector(getCurrentBasket);
    const basketTotals = useSelector(getCurrentBasketTotals);
    return (
        <div>Basket_final</div>
    )
}

export default Basket_final