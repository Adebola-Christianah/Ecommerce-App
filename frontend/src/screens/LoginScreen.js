import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AuthSpinner from '../components/AuthSpinner';
import Message from '../components/Message';
import { login } from '../actions/userActions';
import IMAGE from '../images/dl.beatsnoop 1.png';

function LoginScreen({ location, history }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const userLogin = useSelector((state) => state.userLogin);
    const { error, loading, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    return (
        <div className="flex flex-col lg:flex-row w-full min-h-screen items-center bg-white overflow-hidden">
            {/* Left Image Section */}
            <div className="w-full h-[25%] lg:h-[90%] lg:w-1/2 bg-[#CBE4E8] flex items-center justify-center">
                <img
                    src={IMAGE}
                    alt="Shopping Cart and Phone"
                    className="max-h-full max-w-full object-contain"
                />
            </div>

            {/* Right Login Form Section */}
            <div className="w-full lg:w-1/2 flex items-center mt-4 lg:mt-0 justify-center bg-white">
                <div className="max-w-sm w-full px-6">
                    <h2 className="text-2xl font-semibold mb-4  text-center md:text-left">
                        Log in to Exclusive
                    </h2>
                    <p className="text-gray-600 mb-6 text-center md:text-left">
                        Enter your details below
                    </p>

                    {error && <Message variant="danger">{error}</Message>}
                   

                    <form onSubmit={submitHandler}>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                aria-label="Email"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                aria-label="Password"
                                required
                            />
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring w-full flex items-center justify-center"
                                type="submit"
                            >
                               {loading && <AuthSpinner />} <span>{loading ? '' : 'Log In'}</span>
                            </button>
                           
                        </div>
                        <div className='flex justify-between mb-3'>
                            <span>Forgot Password?</span>
                        <Link
                                className="inline-block align-baseline font-bold text-sm text-red-500 hover:text-red-700  md:mt-0"
                                to="/forgot-password"
                            >
                                Reset?
                            </Link>
                        </div>
                        
                        <div className="text-center text-sm text-gray-600">
                            New Customer?{' '}
                            <Link
                                to={redirect ? `/register?redirect=${redirect}` : '/register'}
                                className="text-red-500 hover:text-red-700 font-bold"
                            >
                                Register
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginScreen;
