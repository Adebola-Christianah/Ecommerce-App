import axios from 'axios';
import { 
    WISHLIST_ADD_ITEM, 
    WISHLIST_REMOVE_ITEM, 
    WISHLIST_CLEAR 
} from '../constants/wishlistConstants';

// Add item to wishlist
export const addToWishlist = (id) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}/`);

    dispatch({
        type: WISHLIST_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            discount:data.discount?data.discount:0,
            new_price:data.new_price?data.new_price:0
        },
    });

    localStorage.setItem('wishlistItems', JSON.stringify(getState().wishlist.wishlistItems));
};

// Remove item from wishlist
export const removeFromWishlist = (id) => (dispatch, getState) => {
    dispatch({
        type: WISHLIST_REMOVE_ITEM,
        payload: id,
    });

    localStorage.setItem('wishlistItems', JSON.stringify(getState().wishlist.wishlistItems));
};

// Clear wishlist
export const clearWishlist = () => (dispatch) => {
    dispatch({ type: WISHLIST_CLEAR });
    localStorage.removeItem('wishlistItems');
};
