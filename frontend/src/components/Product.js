import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToWishlist, removeFromWishlist } from '../actions/wishlististActions'; // Corrected import path
import { ReactComponent as WishList } from '../images/wishList.svg';
import Rating from './Rating';

function Product({ product }) {
    const dispatch = useDispatch();
    const wishlist = useSelector((state) => state.wishlist.wishlistItems);
    const [inWishlist, setInWishlist] = useState(false);

    useEffect(() => {
        if (wishlist.find((item) => item.product === product._id)) {
            setInWishlist(true);
        } else {
            setInWishlist(false);
        }
    }, [wishlist, product._id]);

    const handleWishlistClick = (e) => {
        e.stopPropagation(); // Prevent the click from bubbling up and triggering the Link
        if (inWishlist) {
            dispatch(removeFromWishlist(product._id));
        } else {
            dispatch(addToWishlist(product._id));
        }
        setInWishlist(!inWishlist);
    };

    return (
        <div className="group relative bg-white shadow-md rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
            {/* Product Link */}
            <Link to={`/product/${product._id}`} className="block bg-[#F5F5F5]">
                <div className="relative bg-white">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="object-contain w-[280px] h-[180px] md:h-[180px]"
                        style={{ mixBlendMode: 'multiply' }}
                    />
                    {product.discount && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold rounded p-1">
                            -{product.discount}%
                        </span>
                    )}
                </div>
            </Link>

            {/* Wishlist Button */}
            <div
                className="absolute z-40 rounded-full p-1 right-2 top-2 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                onClick={handleWishlistClick}
            >
                <WishList
                    aria-label="Add to Wish List"
                    className={`fill-current ${inWishlist ? 'text-red-500 stroke-current' : 'text-white stroke-current'}`}
                />
            </div>

            {/* Product Details */}
            <div className="px-4 py-2">
                <Link to={`/product/${product._id}`}>
                    <h6 className="font-semibold">{product.name}</h6>
                </Link>

                <div>
                    <Rating
                        value={product.rating}
                        text={`${product.numReviews} ${product.numReviews > 1 ? 'reviews' : 'review'}`}
                        color={'#FFAD33'}
                    />
                </div>

                {product.discount ? (
                    <div className="flex gap-4">
                        <div className="text-red-600">₦{product.new_price}</div>
                        <div className="text-gray-500 line-through">₦{product.price}</div>
                    </div>
                ) : (
                    <div className="text-gray-500 font-bold">₦{product.price}</div>
                )}
            </div>
        </div>
    );
}

export default Product;
