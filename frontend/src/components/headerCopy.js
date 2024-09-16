import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { ReactComponent as Dropdown } from '../images/dropdown.svg'
import { ReactComponent as SearchIcon } from '../images/searchIcon.svg'
import { ReactComponent as WishList } from '../images/wishList.svg'
import { ReactComponent as Cart } from '../images/Cart1 with buy.svg'
import { ReactComponent as UserActive } from '../images/userActive.svg'
import { ReactComponent as UserIcon } from '../images/userIcon.svg'
import { logout } from '../actions/userActions'
import './css/header.css'
import Logo from '../images/Logo.png'

function Header() {
    const userLogin = useSelector(state => state.userLogin)
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    const { userInfo } = userLogin
    const [expand, setExpand] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()

    const logoutHandler = () => {
        dispatch(logout())
    }

    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            history.push(/?keyword=${keyword}&page=1)
        } else {
            history.push(history.location.pathname)
        }
    }

    return (
        <header className='relative z-20'>
            <div className='bg-[#000] text-white flex items-center justify-center h-12 text-sm'>
                Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <span className='font-semibold ml-2'>Shop Now!</span>
                <div className='ml-28 flex justify-between'> English<Dropdown /></div>
            </div>

            <header className="bg-white border-bottom border-[#000000]">
                <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8" aria-label="Global">
                    <div className="flex lg:hidden">
                        <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
                            <span className="sr-only">Open main menu</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex lg:flex-1">
                        <Link className="-m-1.5 p-1.5" to="/" style={{textDecoration:'none'}}>
                            <span className="sr-only">Your Company</span>
                            <div className='text-[#DB4444] font-bold text-[24px]' >Exclusive</div>
                        </Link>
                    </div>
                  
                    <div className={hidden lg:flex lg:gap-x-12 ${menuOpen ? 'flex flex-col lg:hidden' : ''}}>
                        <form className="max-w-lg md:w-[600px] mx-auto" onSubmit={submitHandler}>
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
                    <div className={ lg:flex lg:flex-1 lg:justify-end items-center ${menuOpen ? 'flex flex-col lg:hidden' : ''}}>
                        <div className='flex justify-between items-center gap-2 md:gap-12'>
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
                                            className="w-3 h-3"
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
                                            className="z-40 absolute right-2 top-28 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                                        >
                                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                                <li>
                                                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                                                        Profile
                                                    </Link>
                                                </li>
                                                <li onClick={logoutHandler} className="block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600">
                                                    Logout
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <Link className='navlink flex items-center' to='/login'>
                                    <UserIcon />Login
                                </Link>
                            )}
                            <div className='relative flex items-center gap-2'>
                                <WishList />
                                <Link to='/cart' className='cursor-pointor relative' style={{textDecoration:'none'}}>
                                    <Cart />
                                    {cartItems.length > 0 && (
                                        <span className='absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center'>
                                            {cartItems.length}
                                        </span>
                                    )}
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className={lg:hidden ${menuOpen ? 'block' : 'hidden'}} role="dialog" aria-modal="true">
                    <div className="fixed inset-0 z-10"></div>
                    <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white  py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center  justify-between">
                            <Link className=" "style={{textDecoration:'none'}}>
                                <span className="sr-only">Your Company</span>
                                <Link className="" to="/">
                                    <span className="sr-only">Your Company</span>
                                    <div className='text-[#DB4444] font-bold -mr-4 text-[24px]' >Exclusive</div>
                                </Link>
                            </Link>
                            <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700" onClick={() => setMenuOpen(false)}>
                                {/* <span className="sr-only">Close menu</span> */}
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    <div className="-mx-3">
                                        <button type="button" className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" aria-controls="disclosure-1" aria-expanded="false">
                                            Product
                                            <svg className="h-5 w-5 flex-none" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                        <div className="mt-2 space-y-2" id="disclosure-1">
                                            <Link className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">Analytics</Link>
                                            <Link className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">Engagement</Link>
                                            <Link className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">Security</Link>
                                            <Link className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">Integrations</Link>
                                            <Link className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">Automations</Link>
                                            <Link className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">Watch demo</Link>
                                            <Link className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">Contact sales</Link>
                                        </div>
                                    </div>
                                    <Link className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Features</Link>
                                    <Link className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Marketplace</Link>
                                    <Link className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Company</Link>
                                </div>
                                <div className="py-6">
                                    <Link className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log in</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </header>
    )
}