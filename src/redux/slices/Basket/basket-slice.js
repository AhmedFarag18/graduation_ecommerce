import { createSlice } from '@reduxjs/toolkit';
import cuid from 'cuid';
import { API_URL } from '../../../App';


export const createBasket = () => async (dispatch) => {
    const basketId = cuid();
    const response = await fetch(`${API_URL}/basket`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: basketId })
    });

    if (response.ok) {
        const basket = await response.json();
        dispatch({ type: 'CREATE_BASKET_SUCCESS', payload: basket });
    } else {
        const error = await response.text();
        dispatch({ type: 'CREATE_BASKET_FAILURE', payload: error });
    }
};

const basketSlice = createSlice({
    name: 'basket',
    initialState: {
        "id": "",
        "basketItems": [],
        "deliveryMethodId": 0,
        "paymentIntentId": "",
        "clientSecret": "",
        "shippingPrice": 0
    },
    reducers: {
        setBasket: (state, action) => {
            state.basket;
            state.id = cuid();
            localStorage.setItem("basket_id", state.basket.id);
            state.basketItems = state.basket.items;
        },
        setBasketTotals: (state, action) => {
            state.basketTotals = action.payload;
        }
    }
});

export const { setBasket, setBasketTotals } = basketSlice.actions;
export default basketSlice.reducer;