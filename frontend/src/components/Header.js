import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { ReactComponent as Dropdown } from '../images/dropdown.svg';
import { ReactComponent as SearchIcon } from '../images/searchIcon.svg';
import { ReactComponent as WishList } from '../images/wishList.svg';
import { ReactComponent as Cart } from '../images/Cart1 with buy.svg';
import { ReactComponent as UserActive } from '../images/userActive.svg';
import { ReactComponent as UserIcon } from '../images/userIcon.svg';
import { logout } from '../actions/userActions';
import './css/header.css';
import Logo from '../images/Logo.png';

function Header() {
    const userLogin = useSelector(state => state.userLogin);
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    const { userInfo } = userLogin;
    const [expand, setExpand] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const logoutHandler = () => {
        dispatch(logout());
    };

    const [keyword, setKeyword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword) {
            history.push(`/?keyword=${keyword}&page=1`);
        } else {
            history.push(history.location.pathname);
        }
    };

    return (
        <header className='relative z-20'>
            <div className='bg-gray-100 text-gray-700 flex items-center justify-center h-12 text-sm'>
                Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <span className='font-semibold ml-2'>Shop Now!</span>
                <div className='ml-28 flex items-center'> English<Dropdown /></div>
            </div>

            <header className="bg-white border-b border-gray-300">
                <nav className="mx-auto flex items-center  px-3 py-[0.6rem] lg:px-24" aria-label="Global">
                    {/* Mobile Menu Button */}
                    
                    <div className="md:hidden flex items-center">
                        <button type="button" className=" text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    </div>
                    
                    {/* Logo */}
                    <div className="flex items-center  flex-1">
                        <Link to="/" className="flex items-center text-[#DB4444] font-bold text-[24px] no-underline" >
                            {/* <img src={Logo} alt="Logo" className="h-8" /> */}
                            <span className="ml-2">Exclusive</span>
                        </Link>
                        <form className="hidden md:flex max-w-lg mx-auto" onSubmit={submitHandler}>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <SearchIcon />
                                </div>
                                <div className='flex gap-3 items-center'>
                                    <input type="search" id="default-search" className="block w-full px-12 text-sm text-gray-900 h-[3rem] bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white rounded-md" placeholder='What are you looking for?' onChange={(e) => setKeyword(e.target.value)} />
                                    <button className='bg-[#DB4444] text-[#fff] px-3 h-[3rem] font-medium rounded-md'>Search</button>
                                </div>
                            </div>
                        </form>
                    
                    </div>
                   
                       
                        <div className='flex items-center gap-2 md:gap-6'>
                            {userInfo ? (
                                <>
                                    <button
                                        id="dropdownDefaultButton"
                                        className="flex items-center focus:outline-none"
                                        onClick={() => setExpand(!expand)}
                                    >
                                        <UserActive />
                                        {userInfo.name}
                                        <svg
                                            className="w-3 h-3 ml-1"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 10 6"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m1 1 4 4 4-4"
                                            />
                                        </svg>
                                    </button>
                                    {expand && (
                                        <div
                                            id="dropdown"
                                            className="z-40 absolute right-12 top-24  divide-y divide-gray-100 rounded-lg shadow bg-white"
                                        >
                                            <ul className="py-2 text-sm text-gray-700">
                                                <li>
                                                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 no-underline">Profile</Link>
                                                </li>
                                                <li onClick={logoutHandler} className="block px-4 py-2 cursor-pointer hover:bg-gray-100">
                                                    Logout
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <Link className='flex items-center text-gray-900 no-underline' to='/login'>
                                    <UserIcon className="mr-1" /> Login
                                    {/* <span className='hidden lg'>Login</span> */}
                                </Link>
                            )}
                            <div className='relative flex items-center'>
                                <WishList className="mr-2" />
                                <Link to='/cart' className='relative'>
                                    <Cart />
                                    {cartItems.length > 0 && (
                                        <span className='absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center'>
                                            {cartItems.length}
                                        </span>
                                    )}
                                </Link>
                            </div>
                        </div>
                    
                </nav>
                <form className="flex md:hidden max-w-lg mx-2 mb-3 border rounded-full border-black dark:border-gray-600" onSubmit={submitHandler}>
    <div className="flex items-center justify-between h-[2.9rem] bg-gray-white dark:bg-gray-700 rounded-full w-full">
        <input
            type="search"
            id="default-search"
            className="block w-full h-full px-4 text-sm text-gray-900 bg-transparent dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-0"
            placeholder='What are you looking for?'
            onChange={(e) => setKeyword(e.target.value)}
        />
        <div className="flex items-center cursor-pointer p-3" onClick={submitHandler}>
            <SearchIcon />
        </div>
    </div>
</form>

                    
                {/* Mobile Menu */}
                <div className={`sm:hidden ${menuOpen ? 'block' : 'hidden'}`} role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-black/50 z-40"></div>
                    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white py-6 overflow-y-auto">
                        <div className="flex items-center justify-between px-4">
                            <Link to="/" className="flex items-center text-[#DB4444] font-bold text-[24px] no-underline">
                                <img src={Logo} alt="Logo" className="h-8" />
                                {/* <span className="ml-2">Exclusive</span> */}
                            </Link>
                            <button type="button" className="-m-2.5 p-2.5 text-gray-700" onClick={() => setMenuOpen(false)}>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="mt-6">
                            <div className="-my-6 divide-y divide-gray-500">
                                <div className="space-y-2 py-6">
                                    <button type="button" className="flex w-full items-center justify-between py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                        Product
                                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    <div className="mt-2 space-y-2">
                                        <Link className="block py-2 pl-6 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">Analytics</Link>
                                        <Link className="block py-2 pl-6 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">Engagement</Link>
                                        <Link className="block py-2 pl-6 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">Security</Link>
                                        <Link className="block py-2 pl-6 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">Integrations</Link>
                                        <Link className="block py-2 pl-6 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">Automations</Link>
                                        <Link className="block py-2 pl-6 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">Watch demo</Link>
                                        <Link className="block py-2 pl-6 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">Contact sales</Link>
                                    </div>
                                </div>
                                <Link className="block px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Features</Link>
                                <Link className="block px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Marketplace</Link>
                                <Link className="block px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Company</Link>
                                <div className="py-6">
                                    <Link className="block px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log in</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </header>
    );
}

export default Header;
