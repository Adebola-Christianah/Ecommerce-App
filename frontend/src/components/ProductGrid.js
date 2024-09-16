import React from 'react';
import ps5Image from '../images/ps.png';
import womenCollectionImage from '../images/woman.png';
import speakersImage from '../images/speaker.png';
import perfumeImage from '../images/perfume.png';
import { Link } from 'react-router-dom';

function ProductGrid() {
    return (
        <div className=" lg:w-full  mx-auto py-6">
            <div className="flex flex-col lg:flex-row gap-4 md:h-[75vh]">
                {/* First div with background image */}
                <div className="flex-1 bg-contain bg-no-repeat bg-center bg-black rounded-lg shadow-md" style={{ backgroundImage: `url(${ps5Image})` }}>
                    <div className="flex flex-col justify-end h-full text-white bg-black bg-opacity-50 p-6 rounded-lg">
                        <h3 className="text-2xl font-bold text-white">PlayStation 5</h3>
                        <p className="text-md">Black and White version of the PS5 coming out on sale.</p>
                        <a href="#" className="mt-2 inline-block px-4 py-2 text-white font-semibold rounded hover:bg-gray-200">Shop Now</a>
                    </div>
                </div>

                {/* Second div with flex column of two equal height divs */}
                <div className="flex-1 flex flex-col gap-4">
                    <div className="flex-1 bg-contain bg-no-repeat bg-center bg-black rounded-lg shadow-md" style={{ backgroundImage: `url(${womenCollectionImage})` }}>
                        <div className="flex flex-col justify-end h-full text-white bg-black bg-opacity-50 p-6 rounded-lg">
                            <h3 className="text-lg font-bold text-white">Women's Collections</h3>
                            <p className="text-sm">Featured women collections that give you another vibe.</p>
                            <a href="#" className="mt-2 inline-block px-4 py-2 text-white font-semibold rounded hover:bg-gray-200">Shop Now</a>
                        </div>
                    </div>
                    <div className="flex-1 flex gap-4">
                        <div className="flex-1 bg-contain bg-no-repeat bg-center rounded-lg shadow-md" style={{ backgroundImage: `url(${speakersImage})` }}>
                            <div className="flex flex-col justify-end h-full text-white bg-black bg-opacity-50 p-6 rounded-lg">
                                <h3 className="text-lg font-bold text-white">Speakers</h3>
                                <p className="text-sm">Amazon wireless speakers.</p>
                                <a href="#" className="mt-2 inline-block px-4 py-2 text-white font-semibold rounded hover:bg-gray-200">Shop Now</a>
                            </div>
                        </div>
                        <div className="flex-1 bg-contain bg-no-repeat bg-center rounded-lg shadow-md" style={{ backgroundImage: `url(${perfumeImage})` }}>
                            <div className="flex flex-col justify-end h-full text-white bg-black bg-opacity-50 p-6 rounded-lg">
                                <h3 className="text-lg font-bold text-white">Perfume</h3>
                                <p className="text-sm">GUCCI INTENSE OUD EDP.</p>
                                <Link to="/error" className="mt-2 inline-block px-4 py-2 text-white font-semibold rounded hover:bg-gray-200">Shop Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductGrid;
