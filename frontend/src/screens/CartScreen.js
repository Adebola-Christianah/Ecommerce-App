import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Image, Card } from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';

function CartScreen({ match, location, history }) {
  //  const productId = match.params.id;
    //const qty = location.search ? Number(location.search.split('=')[1]) : 1;
    const dispatch = useDispatch();

   // const cart = useSelector((state) => state.cart);
    const { cartItems } = useSelector(state => state.cart);
console.log(cartItems, 'cartItems');

    const [quantityErrors, setQuantityErrors] = useState({});

   

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
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

    return (
        <div className="container mx-auto mt-6">
            <div className="flex flex-col md:flex-row">
                <div className="w-full">
                    <h1 className="text-2xl mb-4">Shopping Cart</h1>
                    {cartItems.length === 0 ? (
                        <Message variant="info">
                            Your cart is empty <Link to="/">Go Back</Link>
                        </Message>
                    ) : (
                        <>
                            {/* <div className="hidden md:grid md:grid-cols-6 mb-4 p-3 shadow-sm ">
                                <div className="font-bold">Product</div>
                                <div className="font-bold"></div> 
                                <div className="font-bold">Price</div>
                                <div className="font-bold">Quantity</div>
                                <div className="font-bold">Subtotal</div>
                                <div className="font-bold"></div>
                            </div> */}
          <div>
    {/* <h2 className="text-xl font-bold mb-4">Shopping Cart</h2> */}
    <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
        <thead className="">
            <tr>
                <th className="px-4 py-2 text-left text-gray-600  font-bold">Product</th>
                {/* <th className="px-4 py-2 text-left text-gray-600">Product</th> */}
                <th className="pl-12 md:pl-0 md:px-4 py-2 text-left text-gray-600 font-bold">Price</th>
                <th className="px-4 py-2 text-left text-gray-600 font-bold">Quantity</th>
                <th className="px-4 py-2 text-left text-gray-600 font-bold">Action</th>
            </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 my-3 shadow">
            {cartItems.map((item) => (
                <tr key={item.product}>
                    <td className="px-4 w-full py-2 flex gap-3 items-center">
                        <img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded-lg" />
                        <Link to={`/product/${item.product}`} className="text-blue-500 hover:underline" style={{textDecoration:'none'}}>
                            {item.name}
                        </Link>
                    </td>
                  
                    <td className="pl-12 md:pl-0 md:px-4 py-2">
                        ${item.price}
                    </td>
                    <td className="px-4 py-2">
                        <select
                            className="form-select block  p-2 border-gray-400 rounded-md border focus:outline-none focus:border-blue-500 sm:text-sm"
                            value={item.qty}
                            onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                        >
                            {[...Array(item.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                </option>
                            ))}
                        </select>
                    </td>
                    <td className="px-4 py-2">
                        <button
                            type="button"
                            className="text-red-500 focus:outline-none"
                            onClick={() => removeFromCartHandler(item.product)}
                        >
                            <i className="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

   

</div>


                        </>
                    )}
                    <div className="flex justify-between mt-4">
                        <button
                            className="text-black px-4 py-2 rounded mb-4 md:mb-0 border border-gray-400"
                            onClick={() => history.push('/')}
                        >
                            Return To Shop
                        </button>
                        <button
                            className="text-black px-4 py-2 rounded mb-4 md:mb-0 border border-gray-400"
                        >
                            Update Cart
                        </button>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between mt-0 lg:mt-24 ">
                        <div className="flex ">
                            <input
                                type="text"
                                placeholder="Coupon Code"
                                className="border p-2 rounded mr-2 h-12"
                            />
                            <button className="bg-red-500 text-white px-4 py-2 rounded h-12">Apply Coupon</button>
                        </div>
                        <Card className="w-full md:w-1/3 mt-4 lg:mt0">
                            <ul className="p-4">
                                <li className="py-2">
                                    <h2 className="text-xl">Cart Total</h2>
                                    <div className="flex justify-between mt-2">
                                        <span>Subtotal:</span>
                                        <span>
                                        ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                                        </span>
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
                                            ${cartItems
                                                .reduce((acc, item) => acc + item.qty * item.price, 0)
                                                .toFixed(2)}
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
                </div>
            </div>
        </div>
    );
}

export default CartScreen;
