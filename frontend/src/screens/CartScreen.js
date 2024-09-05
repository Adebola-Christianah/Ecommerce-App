import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';

function CartScreen({ history }) {
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart);

    const [quantityErrors, setQuantityErrors] = useState({});
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [showModal, setShowModal] = useState(null); // Store ID of the item to delete

    const showDeleteModal = (id) => {
        setShowModal(id);
    };

    const closeModal = () => {
        setShowModal(null);
    };

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
        closeModal(); // Close modal after deletion
    };

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping');
    };

    const handleQuantityChange = (productId, newQty, countInStock) => {
        if (newQty > countInStock) {
            setQuantityErrors({
                ...quantityErrors,
                [productId]: `Maximum quantity available is ${countInStock}`,
            });
        } else {
            setQuantityErrors({
                ...quantityErrors,
                [productId]: '',
            });
            dispatch(addToCart(productId, Number(newQty)));
        }
    };

    const applyCouponHandler = () => {
        if (couponCode === "SAVE10") {
            setDiscount(10); // Apply a 10% discount
        } else {
            setDiscount(0); // No discount
        }
    };

    // Get the product name for the modal
    const productToDelete = showModal !== null ? cartItems.find(item => item.product === showModal) : null;

    return (
        <div className="px-6 mx-auto mt-6 bg-white rounded-lg">
            <div className="flex flex-col md:flex-row">
                <div className="w-full">
                    <h1 className="text-2xl mb-4">Shopping Cart</h1>
                    {cartItems.length === 0 ? (
                        <Message variant="info">
                            Your cart is empty <Link to="/">Go Back</Link>
                        </Message>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 text-left text-gray-600 font-bold">Product</th>
                                            <th className="pl-12 md:pl-0 md:px-4 py-2 text-left text-gray-600 font-bold">Price</th>
                                            <th className="px-4 py-2 text-left text-gray-600 font-bold">Quantity</th>
                                            <th className="px-4 py-2 text-left text-gray-600 font-bold">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {cartItems.map((item) => (
                                            <tr key={item.product}>
                                                <td className="px-4 w-full py-2 flex gap-3 items-center">
                                                    <img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded-lg" />
                                                    <Link to={`/product/${item.product}`} className="text-blue-500 hover:underline">
                                                        {item.name}
                                                    </Link>
                                                </td>
                                                <td className="pl-12 md:pl-0 md:px-4 py-2">${item.price}</td>
                                                <td className="px-4 py-2">
                                                    <select
                                                        className="form-select block p-2 border-gray-400 rounded-md border focus:outline-none focus:border-blue-500 sm:text-sm"
                                                        value={item.qty}
                                                        onChange={(e) => handleQuantityChange(item.product, Number(e.target.value), item.countInStock)}
                                                    >
                                                        {[...Array(item.countInStock).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {quantityErrors[item.product] && (
                                                        <p className="text-red-500 text-sm">{quantityErrors[item.product]}</p>
                                                    )}
                                                </td>
                                                <td className="px-4 py-2">
                                                    <button
                                                        type="button"
                                                        className="text-red-500 focus:outline-none"
                                                        onClick={() => showDeleteModal(item.product)}
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                    {cartItems.length > 0 && (
                        <>
                            <div className="flex justify-between mt-4">
                                <button
                                    className="text-black px-4 py-2 rounded mb-4 md:mb-0 border border-gray-400"
                                    onClick={() => history.push('/')}
                                >
                                    Return To Shop
                                </button>
                                <button
                                    className="text-black px-4 py-2 rounded mb-4 md:mb-0 border border-gray-400"
                                    onClick={() => dispatch(/* Add update cart action here */)}
                                >
                                    Update Cart
                                </button>
                            </div>
                            <div className="flex flex-col md:flex-row justify-between mt-0 lg:mt-24 ">
                                <div className="flex">
                                    <input
                                        type="text"
                                        placeholder="Coupon Code"
                                        className="border p-2 rounded mr-2 h-12"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                    />
                                    <button 
                                        className="bg-red-500 text-white px-4 py-2 rounded h-12"
                                        onClick={applyCouponHandler}
                                    >
                                        Apply Coupon
                                    </button>
                                </div>
                                <Card className="w-full md:w-1/3 mt-4 lg:mt-0">
                                    <ul className="p-4">
                                        <li className="py-2">
                                            <h2 className="text-xl">Cart Total</h2>
                                            <div className="flex justify-between mt-2">
                                                <span>Subtotal:</span>
                                                <span>({cartItems.reduce((acc, item) => acc + item.qty, 0)})</span>
                                            </div>
                                            <div className="flex justify-between mt-2">
                                                <span>Shipping:</span>
                                                <span>Free</span>
                                            </div>
                                            <div className="flex justify-between mt-2">
                                                <span>Tax:</span>
                                                <span>0.00</span>
                                            </div>
                                            <div className="flex justify-between mt-2 font-bold">
                                                <span>Total:</span>
                                                <span>
                                                    ${(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0) * (1 - discount / 100)).toFixed(2)}
                                                </span>
                                            </div>
                                        </li>
                                        <li className="py-2">
                                            <button
                                                type="button"
                                                className="bg-red-500 text-white w-full py-2 rounded px-3"
                                                disabled={cartItems.length === 0}
                                                onClick={checkoutHandler}
                                            >
                                                Proceed to Checkout
                                            </button>
                                        </li>
                                    </ul>
                                </Card>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Modal for confirming deletion */}
            {showModal !== null && productToDelete && (
                <div id="deleteModal" className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6">
                        <h2 className="text-xl mb-4 flex items-center justify-center">
                            Confirm Deletion
                        </h2>
                        <p>Are you sure you want to delete <span className='font-[800] text-base'>{productToDelete.name}</span>?</p>
                        <div className="flex justify-center mt-4">
                            <button 
                                className="py-2 px-4 bg-gray-300 rounded mr-2"
                                onClick={closeModal}
                            >
                                No, cancel
                            </button>
                            <button 
                                className="py-2 px-4 bg-red-600 text-white rounded"
                                onClick={() => removeFromCartHandler(productToDelete.product)}
                            >
                                Yes, I'm sure
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartScreen;
