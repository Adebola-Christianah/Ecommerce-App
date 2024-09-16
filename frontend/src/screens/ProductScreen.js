import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listProductDetails, createProductReview } from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { ReactComponent as ChevronRight } from '../images/Chevronright.svg';
import { ReactComponent as ChevronLeft } from '../images/chevronleft.svg';
import { ReactComponent as ArrowUp } from '../images/arrowup.svg';
import { ReactComponent as ArrowDown } from '../images/arrowdown.svg';
import { ReactComponent as DeliveryIcon } from '../images/icon-delivery.svg';
import { ReactComponent as ReturnIcon } from '../images/Icon-return.svg';
import { addToCart, removeFromCart } from '../actions/cartActions';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ProductScreen({ match, history }) {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [mainImage, setMainImage] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');

    const thumbnailsRef = useRef(null);

    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    const {
        loading: loadingProductReview,
        error: errorProductReview,
        success: successProductReview,
    } = productReviewCreate;
    const scrollThumbnails = (direction, isHorizontal = false) => {
        if (thumbnailsRef.current) {
            thumbnailsRef.current.scrollBy({
                left: isHorizontal ? direction * 100 : 0,
                top: isHorizontal ? 0 : direction * 100,
                behavior: 'smooth'
            });
        }
    };
    // useEffect(() => {
    //     if (match.params.id) {
    //         dispatch(addToCart(match.params.id, qty));
    //     }
    // }, [dispatch, match.params.id, qty]);
    useEffect(() => {
        if (successProductReview) {
            setRating(0);
            setComment('');
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        }

        dispatch(listProductDetails(match.params.id));
    }, [dispatch, match, successProductReview]);

    useEffect(() => {
        if (product.image) {
            setMainImage(product.image);
        }
    }, [product]);
    console.log(product)
    const addToCartHandler = () => {
        //const queryParams = `qty=${qty}&color=${selectedColor}&size=${selectedSize}`;
        history.push('/cart');
        dispatch(addToCart(match.params.id, qty, selectedColor, selectedSize));
        console.log(match.params.id,'match id')
        console.log(`Selected Color: ${selectedColor}, Selected Size: ${selectedSize}`,match.params.id);
    };
    
    

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            createProductReview(match.params.id, {
                rating,
                comment,
            })
        );
    };

    const incrementQty = () => {
        if (qty < product.countInStock) {
            setQty(qty + 1);
        }
    };

    const decrementQty = () => {
        if (qty > 1) {
            setQty(qty - 1);
        }
    };

    const handleColorClick = (color) => {
        if (color === selectedColor) {
            setSelectedColor('');
        } else {
            setSelectedColor(color);
        }
    };

    const handleSizeClick = (size) => {
        if (size === selectedSize) {
            setSelectedSize('');
        } else {
            setSelectedSize(size);
        }
    };

    const renderColorVariations = (colors) => {
        return (
            <div className='flex items-center gap-3'>
                <span className='font-[800] text-lg'>Color: </span>
                <div className="flex gap-2">
                    {colors.map((color, index) => (
                        <button
                            key={index}
                            className={`h-4 w-4 rounded-full border border-gray-700 ${selectedColor === color ? 'border-2 border-blue-500' : ''}`}
                            style={{ backgroundColor: color }}
                            onClick={() => handleColorClick(color)}
                        ></button>
                    ))}
                </div>
            </div>
        );
    };

    const renderSizeVariations = (sizes) => {
        return (
            <div className='flex items-center gap-3'>
                <span className='font-[900] text-lg'>Size: </span>
                <div className="size-variation flex gap-2">
                    {sizes.map((size, index) => (
                        <button
                            key={index}
                            className={`size-box border-r-2 border-gray-600 pr-1 ${selectedSize === size ? 'bg-blue-500 text-white' : ''}`}
                            onClick={() => handleSizeClick(size)}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    const renderOtherVariations = (variations, type) => {
        return (
            <div key={type} className='flex items-center gap-3'>
                <span className='font-[900] text-lg'>{type}: </span>
                <div className="variation flex gap-2">
                    {variations.map((variation, index) => (
                        <button
                            key={index}
                            className="variation-box"
                            onClick={() => console.log(`${type}: ${variation}`)}
                        >
                            {variation}
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className=" mx-auto ">
           
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
               <div>
                <Header/>
               
                <div className='w-[90%] mx-auto bg-white mt-4'>
                <Link to='/' className='btn btn-light my-3'>
                Go Back
            </Link>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-4 rounded-md">
                    
                    {/* Images Section */}
                    <div className="flex flex-col md:flex-row md:gap-4  h-[24rem] md:items-center relative">
                        {/* Thumbnails and Arrow Section */}
                        <div className="md:hidden sm:flex mb-4 md:mb-0 flex justify-center w-full h-full rounded-sm bg-[#fafafa]">
                            <img
                                src={mainImage}
                                alt={product.name}
                                className="object-contain max-h-full max-w-full"
                                style={{ backgroundColor: 'transparent', mixBlendMode: 'multiply' }}
                            />
                        </div>
                        
                        <div className='flex flex-col  justify-center'>
                            <button
                                onClick={() => scrollThumbnails(-1)}
                                className="flex items-center justify-center"
                            >
                                <ArrowUp className="h-6 w-6 text-gray-600 hidden md:block" />
                            </button>
                            <button
                                onClick={() => scrollThumbnails(-1, true)}
                                className="absolute -left-8 bottom-2 z-10 p-1 sm:block md:hidden"
                            >
                                <ChevronLeft/>
                            </button>
                            <button
                                onClick={() => scrollThumbnails(1)}
                                className="flex items-center justify-center"
                            >
                                <ArrowDown className="h-6 w-6 text-gray-600 hidden  md:block" />
                            </button>
                            <button
                                onClick={() => scrollThumbnails(1, true)}
                                className="absolute -right-8  bottom-2 z-10 p-1 sm:block md:hidden"
                            >
                                <ChevronRight/>
                            </button>
                        </div>
                        <div className="flex md:flex-col items-center gap-3  relative md:order-1">
                            <div className="md:flex flex-col items-center justify-center">
                                <div
                                    className="flex md:flex-col items-center overflow-hidden h-32 md:h-[24rem]"
                                    ref={thumbnailsRef}
                                    style={{ overflow: 'hidden' }}
                                >
                                    {[{ image: product.image }, ...(product.thumbnails || [])].map(
                                        (thumbnail, index) => (
                                            <img
                                                key={index}
                                                src={thumbnail.image || thumbnail}
                                                alt={product.name}
                                                className={`cursor-pointer h-28 w-32  object-contain mb-3 border p-2 rounded-md  ${
                                                    mainImage === (thumbnail.image || thumbnail)
                                                        ? 'border-2 border-blue-500'
                                                        : ''
                                                }`}
                                                onClick={() => setMainImage(thumbnail.image || thumbnail)}
                                                style={{
                                                    backgroundColor: 'transparent',
                                                    mixBlendMode: 'multiply',
                                                    // background: '#fafafa',
                                                }}
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="relative flex items-center justify-center w-full h-[24rem] md:order-2">
                            <div className="hidden md:flex justify-center w-full h-full rounded-sm bg-[#fafafa]">
                                <img
                                    src={mainImage}
                                    alt={product.name}
                                    className="object-contain max-h-full max-w-full"
                                    style={{ backgroundColor: 'transparent', mixBlendMode: 'multiply' }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="col-span-1">
                        <ul className="space-y-4">
                            <li>
                                <h3 className="text-2xl font-bold">{product.name}</h3>
                            </li>
                            {product.brands && product.brands.length > 0 && (
            <li>
                <span className="font-semibold">Brand:</span>
                <span className="ml-2">{product.brands[0].name}</span> {/* Added margin for gap */}
            </li>
        )}

                            <li>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#FFAD33'} />
                            </li>
                            <li className="text-xl">Price: ₦{product.price}</li>
                            <li className="text-gray-700 pb-3 border-b border-gray-400">Description: {product.description}</li>
                            <div>
                                {product?.variations?.Color && renderColorVariations(product?.variations?.Color)}
                                {product?.variations?.Size && renderSizeVariations(product?.variations?.Size)}
                                {Object.keys(product?.variations || {}).map(variationType => {
                                    if (variationType === 'Color' || variationType === 'Size') return null;
                                    return renderOtherVariations(product.variations[variationType], variationType);
                                })}
                            </div>
                            <li>
                                <span
                                    className={`text-lg font-semibold ${
                                        product.countInStock > 0 ? 'text-green-500' : 'text-red-500'
                                    }`}
                                >
                                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </li>
              
                            {product.countInStock > 0 && (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center border rounded">
                                        <button
                                            onClick={decrementQty}
                                            className="px-3 py-2 font-bold hover:text-white hover:bg-red-500 border-r focus:outline-none"
                                        >
                                            -
                                        </button>
                                        <span className="px-4 font-bold py-2">{qty}</span>
                                        <button
                                            onClick={incrementQty}
                                            className="px-3 py-2 font-bold hover:text-white hover:bg-red-500 border-l focus:outline-none"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                        onClick={addToCartHandler}
                                        disabled={product.countInStock === 0}
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            )}
                                          {product.specifications && product.specifications.length > 0 && (
            <li>
               
                <ul className="">
                    {product.specifications.map(spec => (
                        <li key={spec.id} className="flex items-center my-3">
                            <span className="font-bold strong text-base mr-4">{spec.title}</span> {/* Added margin for gap */}
                            <span className='text-sm'>{spec.value}</span> {/* Removed semicolon */}
                        </li>
                    ))}
                </ul>
            </li>
        )}
                            <ul className='border border-red-600 rounded-md my-3'>
                                <li className='border-b '>
                                    <div className='flex items-center gap-4 p-3'>
                                        <DeliveryIcon/>
                                        <div>
                                            <p className='text-base font-semibold'>Free Delivery</p>
                                            <p className='text-sm'>Enter your postal code for Delivery Availability</p>
                                        </div>
                                    </div>
                                </li>
                                <li className=' flex items-center gap-4 p-3'>
                                    <ReturnIcon/>
                                    <div>
                                        <p className='text-base font-semibold'>Free Delivery</p>
                                        <p className='text-sm'>Enter your postal code for Delivery Availability</p>
                                    </div>
                                </li>
                            </ul>
                        </ul>
                    </div>
                </div>
                </div>
                <Footer/>
               </div>
            )}

          
        </div>
    );
}

export default ProductScreen;
