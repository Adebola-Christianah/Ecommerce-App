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
import Logo from '../images/logoIcon.svg';
import WhiteLogo from '../images/whiteLogoIcon.svg';

function Header() {
    const userLogin = useSelector(state => state.userLogin);
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    const wishlist = useSelector((state) => state.wishlist);
    const { wishlistItems } = wishlist;
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
            history.push(`/products?keyword=${keyword}&page=1`);
        } else {
            history.push(history.location.pathname);
        }
    };
    const categoryList = useSelector((state) => state.categoryList);
    const { loading: loadingCategories, error: errorCategories, categories } = categoryList;
const [isMouseInCategory, setIsMouseInCategory] = useState(false);

const handleMouseEnter = (categoryId) => {
  setHoveredCategory(categoryId);
};

const handleMouseLeave = () => {
  if (!isMouseInCategory) {
    setHoveredCategory(null);
  }
};

const handleMouseEnterCategory = () => {
  setIsMouseInCategory(true);
};

const handleMouseLeaveCategory = () => {
  setIsMouseInCategory(false);
  setHoveredCategory(null);
};
const renderCategories = () => (
    <ul className="space-y-2 bg-white">
        {categories.map((category) => (
            <li
                key={category.id}
                onMouseEnter={() => handleMouseEnter(category.id)}
                onMouseLeave={handleMouseLeave}
                className="cursor-pointer py-2 px-4"
            >
                
                <div className="flex items-center gap-2 hover:text-red-500" style={{ transition: 'color 0.3s' }}>
                    {category.svg && (
                        <div
                            className="flex-shrink-0"
                            style={{ width: '24px', height: '24px' }}
                            dangerouslySetInnerHTML={{ __html: category.svg }}
                        />
                    )}
                    <div className="font-semibold text-gray-700">
                        <Link to={`/category/${category.id}`} className="hover:text-red-500" style={{ textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
                            {category.name}
                        </Link>
                    </div>
                    
                </div>
                {hoveredCategory === category.id && (
                        <div className=" md:hidden flex   w-full bg-white z-30">
                            {renderSelectedCategory()}
                        </div>
                    )}
            </li>
        ))}
    </ul>
);

const renderSelectedCategory = () => {
    const selectedCategory = categories.find((category) => category.id === hoveredCategory);
    if (!selectedCategory) return null;

    return (
        <div
            className="grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-3 bg-white p-4 h-full"
            onMouseEnter={handleMouseEnterCategory}
            onMouseLeave={handleMouseLeaveCategory}
        >
            {/* Subcategories */}
            {selectedCategory.subcategories.length > 0 && (
                <div className="flex flex-col">
                    <div className="font-semibold text-base text-gray-700 mb-2">
                        {selectedCategory.name}-+
                    </div>
                    <ul className="space-y-1">
                        {selectedCategory.subcategories.map((subcategory) => (
                            <li key={subcategory.id}>
                                <Link
                                    to={`/subcategory/${subcategory.id}`}
                                    className="text-sm text-gray-500 hover:text-gray-800 hover:font-semibold"
                                            style={{textDecoration:'none'}}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {subcategory.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Child Categories */}
            {selectedCategory.children.length > 0 && selectedCategory.children.map((child) => (
                <div key={child.id} className="flex flex-col">
                    <div className="font-semibold text-gray-600 pb-2 text-base hover:text-gray-800 ">
                        <Link
                            to={`/category/${child.id}`}
                            className="hover:text-gray-800"
                            onClick={() => setMenuOpen(false)}
                            style={{textDecoration:'none'}}
                        >
                            {child.name}
                        </Link>
                    </div>
                    {child.subcategories && (
                        <ul className="space-y-1">
                            {child.subcategories.map((sub) => (
                                <li key={sub.id}>
                                    <Link
                                        to={`/subcategory/${sub.id}`}
                                        className="text-sm text-gray-500 hover:text-gray-800 hover:font-semibold"
                                        onClick={() => setMenuOpen(false)}
                                        style={{textDecoration:'none'}}
                                    >
                                        {sub.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
};
  
      
      
       
    // State to manage which category is hovered
    const [hoveredCategory, setHoveredCategory] = useState(null);
    return (
        <header className='relative z-20 '>
            <div className='bg-black text-gray-100 flex items-center justify-between h-12 text-sm md:px-12'>
            <div className='flex justify-between items-center'>
            <div className="flex items-center  flex-1">
                        {/* <Link to="/" className="flex items-center text-[#DB4444] font-bold text-[24px] no-underline gap-1 md:gap-2" >
                            <img src={WhiteLogo} alt="Logo" className="md:h-6 h-4" />
                          <span>Exclusive</span>
                        </Link> */}
        

                    
                    </div>
           
            </div>
            
            <div> Discover Deals, Shop with Ease, and Elevate Your Everyday! </div>
                <div className='flex items-center'> English<Dropdown /></div>
            </div>

            <header className="bg-white border-b border-gray-300 lg:px-12">
                <nav className="mx-auto flex items-center  px-3 py-[0.6rem] lg:px-24" aria-label="Global">
                    {/* Mobile Menu Button */}
                    
                    <div className="lg:hidden flex items-center ">
                        <button type="button" className=" text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    </div>
                    
                    {/* Logo */}
                    <div className="flex items-center  flex-1 ml-1">
                            <Link to="/" className="flex items-center text-[#DB4444] font-bold text-[24px] no-underline gap-1 " style={{textDecoration:'none'}}>
                            <img src={Logo} alt="Logo" className=" md:h-8 h-4 md:w-8 w-4" />
                            <span className=" md:text-lg text-base ">Exclusive</span>
                        </Link>
                        <form className="hidden md:flex max-w-lg mx-auto" onSubmit={submitHandler}>
  <div className="relative w-full">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
      <SearchIcon />
    </div>
    <div className='flex gap-3 items-center'>
      <input 
        type="search" 
        id="default-search" 
        className="block w-full md:w-76 lg:w-[36rem] px-12 text-sm text-gray-900 h-[2.8rem]  bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white rounded-md" 
        placeholder='What are you looking for?' 
        onChange={(e) => setKeyword(e.target.value)} 
      />
      <button className='bg-[#DB4444] text-[#fff] px-3 h-[2.8rem]  font-medium rounded-md'>Search</button>
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
                                                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 no-underline"style={{textDecoration:'none'}}>Profile</Link>
                                                </li>
                                                <li onClick={logoutHandler} className="block px-4 py-2 cursor-pointer hover:bg-gray-100">
                                                    Logout
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <Link className='flex items-center text-gray-900 no-underline' to='/login'style={{textDecoration:'none'}}>
                                    <UserIcon className="mr-1" /> Login
                                    {/* <span className='hidden lg'>Login</span> */}
                                </Link>
                            )}
                            <div className='relative flex items-center'>
                                <div className='relative'>
                                <Link to='/wishlist' style={{textDecoration:'none'}}> <WishList className="mr-2" /></Link>
                                    <span className='absolute top-0 right-2 translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center'>
                                            {wishlistItems.length}
                                        </span>
                                </div>
                               
                               
                                <Link to='/cart' className='relative' style={{textDecoration:'none'}}>
                                    <Cart />
                                    
                                        <span className='absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center'>
                                            {cartItems.length}
                                        </span>
                                    
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

                    
<div className={`fixed top-0 inset-0 bg-black/50 z-40 h-screen ${menuOpen ? 'block' : 'hidden'}`} role="dialog" aria-modal="true">
  <div className={`fixed top-0 inset-y-0 md:left-0 sm:right-0 z-50 h-screen bg-white py-6 overflow-y-auto w-[90%]`}>
    <div className="flex items-center justify-between px-4">
      {/* Logo and Close Button */}
      <Link to="/" className="flex items-center text-[#DB4444] font-bold text-[24px] no-underline" style={{textDecoration:'none'}}>
        <img src={Logo} alt="Logo" className="h-5" />Exclusive
      </Link>
      <button type="button" className="-m-2.5 p-2.5 text-gray-700" onClick={() => setMenuOpen(false)}>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    {/* Categories List */}
  <div className='flex flex-col md:flex-row mt-4 h-screen'>
    <div className='w-full md:w-[30%] md:border-r border-gray-700'>{renderCategories()}</div>
  <div className="hidden md:flex w-full md:w-[70%]">{renderSelectedCategory()}</div>
  </div>
  </div>
</div>


            </header>
        </header>
    );
}

export default Header;
