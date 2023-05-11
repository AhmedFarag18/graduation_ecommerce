import axios from 'axios';
import { setBasket } from '../../redux/slices/Basket/basket-slice';
import { API_URL } from '../../App';

export const fetchBasket = id => async (dispatch) => {
    try {
        const response = await axios.get(`${API_URL}/Basket`);
        dispatch(setBasket(response.data));
    } catch (error) {
        console.error(error);
    }
};