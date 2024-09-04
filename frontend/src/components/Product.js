import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as WishList } from '../images/wishList.svg';
import { ReactComponent as QuickView } from '../images/Quick View.svg';
import Rating from './Rating';

function Product({ product }) {
    return (
        <div className="group bg-white shadow-md rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
            <Link to={`/product/${product._id}`} className="relative block bg-[#F5F5F5]">
                <div className="relative bg-white">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="object-contain w-[280px] h-[180px] md:h-[180px]"
                        style={{ mixBlendMode: 'multiply'}}
                    />
                    {product.discount && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold rounded p-1">
                            -{product.discount}%
                        </span>
                    )}
                    <div className="bg-white absolute rounded-full p-1 right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <WishList aria-label="Add to Wish List" />
                    </div>
                </div>
            </Link>

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
                        <div className="text-red-600">${product.new_price}</div>
                        <div className="text-gray-500 line-through">${product.price}</div>
                    </div>
                ) : (
                    <div className="text-gray-500 font-bold">${product.price}</div>
                )}
            </div>
        </div>
    );
}

export default Product;
