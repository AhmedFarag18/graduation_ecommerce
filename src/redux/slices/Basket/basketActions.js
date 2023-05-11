import axios from 'axios';
import { setBasket, setBasketTotals } from './basket-slice';

export const fetchBasket = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`/api/basket?id=${id}`);
        dispatch(setBasket(response.data));
        dispatch(calculateTotals());
    } catch (error) {
        console.error(error);
    }
};

export const setShippingPrice = (deliveryMethod) => (dispatch, getState) => {
    const { basket } = getState().basket;
    if (basket) {
        basket.shippingPrice = deliveryMethod.price;
        basket.deliveryMethodId = deliveryMethod.id;
        dispatch(setBasket(basket));
    }
    dispatch(calculateTotals());
};

export const createPaymentIntent = () => async (dispatch, getState) => {
    try {
        const { id } = getState().basket.basket;
        const response = await axios.post(`/api/payments/${id}`);
        dispatch(setBasket(response.data));
    } catch (error) {
        console.error(error);
    }
};

export const addItemToBasket = (item, quantity = 1) => (dispatch, getState) => {
    if (isProduct(item)) {
        item = mapProductItemToBasketItem(item);
    }
    const { basket } = getState().basket;
    const items = addOrUpdateItem(basket.items, item, quantity);
    dispatch(setBasket({ ...basket, items }));
};

export const removeItemFromBasket = (id, quantity = 1) => (dispatch, getState) => {
    const { basket } = getState().basket;
    if (!basket) return;
    const item = basket.items.find((x) => x.id === id);
    if (item) {
        item.quantity -= quantity;
        if (item.quantity === 0) {
            const items = basket.items.filter((x) => x.id !== id);
            dispatch(setBasket({ ...basket, items }));
        } else {
            dispatch(setBasket(basket));
        }
    }
};

export const deleteBasket = () => async (dispatch, getState) => {
    try {
        const { id } = getState().basket.basket;
        await axios.delete(`/api/basket?id=${id}`);
        dispatch(deleteLocalBasket());
    } catch (error) {
        console.error(error);
    }
};

export const deleteLocalBasket = () => (dispatch) => {
    dispatch(setBasket(null));
    dispatch(setBasketTotals(null));
    localStorage.removeItem('basket_id');
};

const addOrUpdateItem = (items, itemToAdd, quantity) => {
    const item = items.find((x) => x.id === itemToAdd.id);
    if (item) item.quantity += quantity;
    else {
        itemToAdd.quantity = quantity;
        items.push(itemToAdd);
    }
    return items;
};

const mapProductItemToBasketItem = (item) => {
    return {
        id: item.id,
        productName: item.name,
        price: item.price,
        quantity: 0,
        pictureUrl: item.pictureUrl,
        brand: item.productBrand,
        type: item.productType
    };
};

const isProduct = (item) => {
    return item.productBrand !== undefined;
};

const calculateTotals = () => (dispatch, getState) => {
    const { basket } = getState().basket;
    if (!basket) return;
    const subtotal = basket.items.reduce((a, b) => b.price * b.quantity + a, 0);
    const total = subtotal + basket.shippingPrice;
    dispatch(setBasketTotals({ shipping: basket.shippingPrice, total, subtotal }));
};