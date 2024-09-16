import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromWishlist } from '../actions/wishlististActions';
import { addToCart } from '../actions/cartActions';
import NotFound from '../components/NotFound';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ReactComponent as Cart } from '../images/Cart1.svg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WishlistPage = () => {
    const dispatch = useDispatch();
    const wishlist = useSelector((state) => state.wishlist);
    const { wishlistItems } = wishlist;

    const [wishList, setWishList] = useState(wishlistItems);

    useEffect(() => {
        if (wishlistItems.length === 0) {
            const storedWishlist = JSON.parse(localStorage.getItem('wishlistItems')) || [];
            setWishList(storedWishlist);
        } else {
            setWishList(wishlistItems);
        }
    }, [wishlistItems]);

    const removeFromWishlistHandler = (id) => {
        dispatch(removeFromWishlist(id));
    };

    const addToCartHandler = (id) => {
        dispatch(addToCart(id));
        toast.success('Product added to cart successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    return (
        <div className="wishlist-page">
            <Header />
            <ToastContainer /> {/* Ensure this is placed here or higher in the tree */}
            {wishList.length === 0 ? (
                <NotFound />
            ) : (
                <div>
                    <div className='w-[95%] mx-auto bg-white p-4 mt-4'>
                        <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {wishList.map(item => (
                                <div key={item.product} className="border rounded-lg relative bg-gray-50">
                                    {item.discount > 0 && (
                                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
                                            -{item.discount}%
                                        </div>
                                    )}
                                    <button 
                                        onClick={() => removeFromWishlistHandler(item.product)} 
                                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 bg-white rounded-full h-8 w-8"
                                    >
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                    <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        className="w-full h-48 object-cover mt-4 px-4"
                                    />
                                    <button 
                                        onClick={() => {
                                            console.log('Add to Cart button clicked');
                                            addToCartHandler(item.product);
                                        }} 
                                        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 my-4 flex gap-2 justify-center items-center"
                                    >
                                        <Cart />
                                        Add to Cart
                                    </button>
                                    <Link 
                                        to={`/product/${item.product}`} 
                                        className="block font-semibold text-base mb-2 hover:text-lg mx-4"
                                    >
                                        {item.name}
                                    </Link>
                                    <div className="mb-4 mx-4">
                                        {item.discount > 0 ? (
                                            <div className="flex gap-3">
                                                <span className="text-red-600 font-semibold">
                                                    ${item.new_price}
                                                </span>
                                                <span className="text-gray-500 line-through">
                                                    ${item.price}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-black font-semibold">${item.price}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default WishlistPage;
