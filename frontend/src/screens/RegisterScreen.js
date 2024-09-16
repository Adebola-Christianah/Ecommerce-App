import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AuthSpinner from '../components/AuthSpinner';
import Message from '../components/Message';
import { register } from '../actions/userActions';
import IMAGE from '../images/dl.beatsnoop 1.png';

function RegisterScreen({ location, history }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const userRegister = useSelector((state) => state.userRegister);
    const { error, loading, userInfo } = userRegister;

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            dispatch(register(name, email, password));
        }
    };

    return (
        <div className="flex flex-col lg:flex-row w-full min-h-screen items-center bg-white overflow-hidden">
        {/* Left Image Section */}
        <div className="w-full h-[39%] lg:h-[90%] lg:w-1/2 bg-[#CBE4E8] flex items-center justify-center">
                <img
                    src={IMAGE}
                    alt="Shopping Cart and Phone"
                    className="max-h-full max-w-full object-contain"
                />
            </div>

            {/* Right Registration Form Section */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-white">
                <div className="max-w-sm w-full px-6 md:px-8 py-8 md:py-12">
                    <h2 className="text-xl font-semibold mb-4 text-center md:text-left">Sign Up for Exclusive</h2>
                    {/* <p className="text-gray-600 mb-6 text-center md:text-left">Create your account below</p> */}

                    {message && <Message variant="danger">{message}</Message>}
                    {error && <Message variant="danger">{error}</Message>}

                    <form onSubmit={submitHandler}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter your name"
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                aria-label="Name"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
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
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
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
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="passwordConfirm">
                                Confirm Password
                            </label>
                            <input
                                id="passwordConfirm"
                                type="password"
                                placeholder="Confirm your password"
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                aria-label="Confirm Password"
                                required
                            />
                        </div>
                      
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring w-full flex items-center justify-center"
                                type="submit"
                            >
                               {loading && <AuthSpinner />} <span>{loading ? '' : 'Register'}</span>
                            </button>
                           
                     
                        </div>
                    </form>
                    <div className="text-center mt-6 md:mt-8">
                        <span className="text-gray-600">Have an Account? </span>
                        <Link
                            className="text-red-500 hover:text-red-700 font-bold"
                            to={redirect ? `/login?redirect=${redirect}` : '/login'}
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterScreen;
