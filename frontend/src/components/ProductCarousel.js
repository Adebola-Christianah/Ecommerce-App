import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';

import PhoneImage from '../images/phone image.jpg';
import Students from '../images/boy-helping-his-friend-with-books-removebg-preview.png';
import { ReactComponent as AppleIcon } from '../images/Apple_gray.svg';
import { ReactComponent as ArrowRight } from '../images/ArrowRight.svg';


function ProductCarousel({error,loading,products}) {
    const dispatch = useDispatch();

  
    return (
        loading ? (
            <Loader />
        ) : error ? (
            <Message variant="danger">{error}</Message>
        ) : (
   <Carousel pause="hover" className="w-full  h-[14rem] md:h-[24rem]">
{products && products.media.map((product) => (
  <Carousel.Item key={product._id} className="w-full h-[14rem] md:h-[24rem] ">
  <Link
  to={
    product.products.length > 0 
      ? `/product/${product.products[0]._id}` 
      : product.subcategories.length > 0 
      ? `/subcategory/${product.subcategories[0].id}`
      : `/category/${product.categories[0].id}`
  }
  className="block no-underline hover:no-underline"
>

      <div
        className="flex items-center h-[14rem] md:h-[24rem] w-full"
        style={{
          backgroundColor: product.background_theme_color || 'red',
        }}
      >
        {/* Text Section with Clipped Background */}
        <div
          className="flex items-center justify-start h-[14rem] md:h-[24rem] px-4"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0% 100%)',
            backgroundColor: product.clip_theme_color || '#2ba855',
            width: '65%',
          }}
        >
          <div className="text-white text-left w-4/5 z-30 mx-0 md:mx-auto">
            <div className="text-2xl md:text-5xl font-bold md:mb-2 w-full md:w-4/5 playfair-display break-words text-white">
              {product.title}
            </div>
            <p className="text-white md:text-base">{product.caption}</p>
            
            <div className="rounded-3xl text-black px-4 py-2 text-sm md:text-sm font-semibold inline-block" style={{background:product?.button_theme_color}}>
              {product.call_to_action_text}
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative  md:h-[24rem] md:w-[35%] flex items-center justify-center">
          
        </div>
        <img
            src={product.img}
            alt={product.name}
            className="object-contain h-[14rem] md:h-[25rem] max-w-auto rounded-md"
            style={{
             
              position: 'absolute',
              right: '0rem',
              top: 0,
            }}
          />
      </div>
    </Link>
  </Carousel.Item>
))}



                        <Carousel.Item className='flex  justify-center items-center flex-col w-full h-[14rem] md:h-[24rem]  bg-black'>
            <div className="flex  justify-center items-center mx-auto h-full w-full md:w-[85%]">
                <div className='flex flex-col  justify-center md:w-1/2 p-4'>
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
                <img
  src={PhoneImage}
  alt="Phone"
  className="object-cover md:object-contain w-1/2  mt-4 md:mt-0"
/>

            </div>
        </Carousel.Item>
            </Carousel>
        )
    );
}

export default ProductCarousel;