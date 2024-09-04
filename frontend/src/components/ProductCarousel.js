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
   <Carousel pause="hover" className="w-full lg:w-[80%] h-[14rem] md:h-[24rem]">
{products && products.media.map((product) => (
  <Carousel.Item key={product._id} className="w-full h-[14rem] md:h-[24rem]">
    <Link
      to={`/product/${product._id}`}
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
          <div className="text-white text-left w-4/5 z-10">
            <div className="text-2xl md:text-5xl font-bold md:mb-2 playfair-display break-words text-white">
              {product.title}
            </div>
            <p className="text-white md:text-base">{product.caption}</p>
            
            <div className="rounded-3xl text-black px-4 py-2 text-sm md:text-sm font-semibold inline-block" style={{background:product?.button_theme_color}}>
              {product.call_to_action_text}
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative z-20 h-[14rem] md:h-[24rem] w-[35%] flex items-center justify-center">
          
        </div>
        <img
            src={product.img}
            alt={product.name}
            className="object-contain h-[12rem] md:h-[26rem] w-auto rounded-md"
            style={{
              zIndex: 10,
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
        <Carousel.Item className="w-full h-[14rem] md:h-[24rem]">
  <div className=" flex items-center justify-between bg-blue-700 rounded-md p-6 text-white h-full overflow-hidden">
    
    {/* Green clipped background */}
    <div 
      className="absolute inset-0 z-0"
      style={{
        clipPath: 'polygon(0 0, 65% 0, 55% 100%, 0% 100%)',
        backgroundColor: '#2ba855',
      }}
    />
    
    {/* Text content */}
    <div className="z-10 pl-4 md:pl-8">
      <h2 className="text-3xl md:text-4xl font-bold">BACK TO SCHOOL</h2>
      <p className="text-md md:text-lg mt-2">26 AUG - 01 SEPT</p>
      <p className="text-lg md:text-2xl mt-4 font-semibold">Shop School Essentials</p>
      <div className="mt-4 bg-orange-500 inline-block py-2 px-4 rounded text-md md:text-lg font-bold">
        UP TO 35% OFF
      </div>
    </div>
    
    {/* Image */}
    <div className=" z-10">
      <img
        src={Students}
        alt="Children with abacus"
        className="w-full  h-[20rem]  md:h-[29rem] object-cover rounded-md "
      />
      {/* <svg
        className="absolute inset-0 w-full h-full z-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 300 300"
        preserveAspectRatio="none"
      >
        <polygon
          fill="#1e3a8a"
          points="50,0 300,0 300,300"
          transform="scale(2) translate(50, -75)"
        />
      </svg> */}
    </div>
  </div>

  {/* Shop Now button */}
  <div className="text-right mt-2">
    <button className="bg-black text-white py-2 px-4 rounded font-bold">
      SHOP NOW &gt;
    </button>
  </div>
</Carousel.Item>


    

            </Carousel>
        )
    );
}

export default ProductCarousel;
