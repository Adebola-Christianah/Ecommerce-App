import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';
import { listTopProducts } from '../actions/productActions';
import PhoneImage from '../images/phone image.jpg';
import { ReactComponent as AppleIcon } from '../images/Apple_gray.svg';
import { ReactComponent as ArrowRight } from '../images/ArrowRight.svg';

function ProductCarousel() {
    const dispatch = useDispatch();

    const productTopRated = useSelector((state) => state.productTopRated);
    const { error, loading, products } = productTopRated;

    useEffect(() => {
        dispatch(listTopProducts());
    }, [dispatch]);

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : (
        <Carousel className="bg-[#000] px-4 my-4 w-full relative z-10" indicators={false} controls={true} interval={3000}>
        <Carousel.Item>
            <div className="flex flex-col md:flex-row justify-center items-center mx-auto w-full md:w-[85%]">
                <div className='flex flex-col items-start justify-center md:w-1/2 p-4'>
                    <div className="flex gap-3 items-center">
                        <AppleIcon />
                        <span className="text-xs md:text-sm text-[#fafafa]">iPhone 14 Series</span>
                    </div>
                    <p className='text-white text-xl md:text-3xl font-bold my-3'>Up to 10% off Voucher</p>
                    <div className='flex gap-1 items-center text-white text-xs md:text-sm'>
                        Shop Now
                        <ArrowRight />
                    </div>
                </div>
                <img src={PhoneImage} alt="Phone" className="object-cover md:object-contain w-full md:max-w-sm mt-4 md:mt-0" />
            </div>
        </Carousel.Item>
        <Carousel.Item>
            <div className="flex flex-col md:flex-row justify-center items-center mx-auto w-full md:w-[85%]">
                <div className='flex flex-col items-start justify-center md:w-1/2 p-4'>
                    <div className="flex gap-3 items-center">
                        <AppleIcon />
                        <span className="text-xs md:text-sm text-[#fafafa]">iPhone 14 Series</span>
                    </div>
                    <p className='text-white text-xl md:text-3xl font-bold my-3'>Up to 10% off Voucher</p>
                    <div className='flex gap-1 items-center text-white text-xs md:text-sm'>
                        Shop Now
                        <ArrowRight />
                    </div>
                </div>
                <img src={PhoneImage} alt="Phone" className=" md:object-contain w-full md:max-w-sm mt-4 md:mt-0" />
            </div>
        </Carousel.Item>
        <Carousel.Item>
            <div className="flex flex-col md:flex-row justify-center items-center mx-auto w-full md:w-[85%]">
                <div className='flex flex-col items-start justify-center md:w-1/2 p-4'>
                    <div className="flex gap-3 items-center">
                        <AppleIcon />
                        <span className="text-xs md:text-sm text-[#fafafa]">iPhone 14 Series</span>
                    </div>
                    <p className='text-white text-xl md:text-3xl font-bold my-3'>Up to 10% off Voucher</p>
                    <div className='flex gap-1 items-center text-white text-xs md:text-sm'>
                        Shop Now
                        <ArrowRight />
                    </div>
                </div>
                <img src={PhoneImage} alt="Phone" className="object-cover md:object-contain w-full md:max-w-sm md:mt-0" />
            </div>
        </Carousel.Item>
    </Carousel>
    );
}

export default ProductCarousel;
