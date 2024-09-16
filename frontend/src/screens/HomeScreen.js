import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as ChevronLeft } from '../images/chevronleft.svg';
import { Link } from 'react-router-dom';
// import { Container } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import { listProducts, listSpecialOffers } from '../actions/productActions';
import Flashsale from '../images/display-display-flash-sale-signs-removebg-preview.png'
import { listCategories } from '../actions/categoryAction';
import Countdown from '../components/Countdown';
import { ReactComponent as ChevronRight } from '../images/Chevronright.svg';
import { ReactComponent as ArrowLeft } from '../images/arrowLeft.svg';
import { ReactComponent as FaShippingFast } from '../images/icon-delivery (1).svg';
import { ReactComponent as FaHeadset } from '../images/Icon-Customer service.svg';
import { ReactComponent as FaMoneyBack } from '../images/Icon-secure.svg';
import ProductGrid from '../components/ProductGrid';
import { listTopProducts } from '../actions/productActions';
import Header from '../components/Header';
import Footer from '../components/Footer';

function HomeScreen({ history }) {
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loadingData, setLoadingData] = useState(true); // State to manage loading status
    const thumbnailsRef = useRef(null);
    const productList = useSelector((state) => state.productList);
    const specialOfferList = useSelector((state) => state.specialOfferList);
    const { error, products, page, pages } = productList;
    const { offers } = specialOfferList;
    const categoryList = useSelector((state) => state.categoryList);
    const { loading: loadingCategories, error: errorCategories, categories } = categoryList;

    let keyword = history.location.search;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingData(true); // Start loading
                await Promise.all([
                    dispatch(listProducts(keyword)),
                    dispatch(listCategories()),
                    dispatch(listSpecialOffers(),
                    dispatch(listTopProducts())
                ),

                ]);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoadingData(false); // Stop loading after all data is fetched
            }
        };

        fetchData();
    }, [dispatch, keyword]);
    const productTopRated = useSelector((state) => state.productTopRated);
    const {  loading, productMedia,special_offers } = productTopRated;
     console.log(productTopRated,'torated')


    const handleCategoryClick = (category) => {
        if (category.subcategories.length > 0) {
            setSelectedCategory(category);
        } else {
            history.push(`/category/${category.id}`);
        }
    };
    const sliderRef = useRef(null);

    const scrollThumbnails = (direction) => {
      if (sliderRef.current) {
        sliderRef.current.scrollBy({
          left: direction * 200, // Adjust this value to control scroll distance
          behavior: 'smooth',
        });
      }
    }; const [hoveredCategory, setHoveredCategory] = useState(null);
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
        <div
          className="flex items-center gap-2 hover:text-red-500"
          style={{ transition: 'color 0.3s' }}
        >
         {category.svg ? (
  <div
    className="flex-shrink-0"
    style={{
      width: '24px',
      height: '24px',
    }}
    dangerouslySetInnerHTML={{ __html: category.svg }}
  />
) : null}

<style jsx>{`
  .flex-shrink-0 svg {
    color: currentColor; /* Keeps the color dynamic */
    fill: currentColor; /* Applies the color to the fill */
    stroke: currentColor; /* Applies the color to the stroke */
  }

  .flex-shrink-0:hover svg {
    fill: red; /* Changes the fill color to red on hover */
    stroke: red; /* Changes the stroke color to red on hover */
    color: currentColor
  }
`}</style>


          <div className="font-semibold text-gray-700 ">
            <Link to={`/category/${category.id}`} className="hover:text-red-500" style={{ textDecoration: 'none' }}>
              {category.name}
            </Link>
          </div>
        </div>
      </li>
    ))}
  </ul>
);


const renderSelectedCategory = () => {
  const selectedCategory = categories.find((category) => category.id === hoveredCategory);
  if (!selectedCategory) return null;

  return (
    <div
      className="grid grid-cols-3 gap-6 bg-white p-4 h-full"
      onMouseEnter={handleMouseEnterCategory}
      onMouseLeave={handleMouseLeaveCategory}
    >
      {/* Subcategories */}
      {selectedCategory.subcategories.length > 0 && (
        <div className="flex flex-col">
          <div className="font-bold text-gray-700 mb-2  pb-2 text-base">{selectedCategory.name}</div>
          <ul className="space-y-1">
            {selectedCategory.subcategories.map((subcategory) => (
              <li key={subcategory.id}>
                <Link to={`/subcategory/${subcategory.id}`} className="text-sm text-gray-500 hover:text-gray-800 hover:font-semibold"style={{textDecoration:'none'}}>
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
          <div className="font-bold text-gray-600 pb-2 ">
            <Link to={`/category/${child.id}`} className="hover:text-gray-800" style={{textDecoration:'none'}}>
              {child.name}
            </Link>
          </div>
          {child.subcategories && (
            <ul className="space-y-1">
              {child.subcategories.map((sub) => (
                <li key={sub.id}>
                  <Link to={`/subcategory/${sub.id}`} className="text-sm text-gray-500 hover:text-gray-800" style={{textDecoration:'none'}}>
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


 

    return (
        <div className="w-full ">
            {loadingData ? (
                <Loader /> // Show a single loader while data is being fetched
            ) : (
                <>
                <Header/>
               <div className=' w-[95%] mx-auto'>
               <div className="bg-gray-100 mt-3 md:h-[24rem]">

<div className={`flex flex-col md:flex-row  h-full ${!hoveredCategory?'gap-3':''} `}>
{/* Categories Section */}
<div className="hidden lg:flex flex-col py-4 space-y-2 border-r w-full md:w-[20%] h-full bg-white">
  {renderCategories()}
</div>

{/* Product Carousel or Category Layout */}
<div className={`w-full flex md:justify-center gap-3 md:h-[24rem] `}>
  {hoveredCategory ? (
    <div className="w-full lg:w-[80%]">{renderSelectedCategory()}</div>
  ) : (
    <div className="w-full lg:w-[80%]">
      <ProductCarousel loading={loading} products={productTopRated?.products} />
    </div>
  )}

  {/* Sidebar Section */}
  <div className="w-[24%] hidden lg:flex flex-col h-full gap-3">
    <div className="flex flex-col space-y-4 w-full bg-white rounded p-4 h-[calc(50%-0.375rem)]">
      {/* CALL TO ORDER Section */}
      <p className="font-semibold text-gray-700 w-full">CALL TO ORDER</p>
      <Link to='/coming-soon' className="flex items-center space-x-2 text-gray-700 hover:text-red-500" style={{textDecoration:'none'}}>
        <i className="fas fa-phone-alt text-orange-500"></i>
        <div className="">0700-600-0000</div>
      </Link>
      
      {/* Sell on Jumia Section */}
      <Link to='/coming-soon' className="flex items-center space-x-2 text-gray-700 hover:text-red-500" style={{textDecoration:'none'}}>
        <i className="fas fa-store text-yellow-500"></i>
        <div className="font-semibold ">Sell on Exclusive</div>
      </Link>
      
      {/* Best Deals Section */}
      <Link to='/coming-soon' className="flex items-center space-x-2 text-gray-700 hover:text-red-500" style={{textDecoration:'none'}}>
        <i className="fas fa-tags text-orange-500"></i>
        <div className="font-semibold ">Best Deals</div>
      </Link>
    </div>

    {/* Jumia Force Banner */}
    <div className="h-[calc(50%-0.375rem)] bg-red-600">
      <img src={Flashsale} alt="Jumia Force" className="rounded shadow w-full h-full object-contain pulse-fade"/>
    </div>
  </div>
</div>
</div>

</div>


                <div className="bg-white rounded-md my-4 md:w-[90%] lg:w-full mx-auto">
                    <div className="flex items-center gap-3 bg-white mx-4">
                        <div className="h-8 w-4 bg-red-500 rounded mt-4"></div>
                        <h2 className="text-sm text-red-500 font-bold mt-4">
                            Shop by Category
                        </h2>
                    </div>
                    {keyword === '' && categories && categories.length > 0 ? (
                     <div className="relative bg-white rounded-md px-3">
                     <div
                       ref={sliderRef}
                       className="flex overflow-x-auto space-x-4 md:p-4 p-1 scrollbar-hidden"
                       style={{ scrollBehavior: 'smooth' }}
                     >
                       {categories.map((category) => (
                         <div key={category.id} className="flex flex-col items-center flex-shrink-0">
                           <div
                             className="rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
                             onClick={() => history.push(`/category/${category.id}`)}
                           >
                             <img
                               src={category.image || ''}
                               alt={category.name}
                               className="lg:h-36 md:h-[9.5rem] h-[7rem] w-auto rounded-lg object-contain bg-gray-200"
                               style={{ backgroundColor: category.theme_color || 'gray' }}
                             />
                           </div>
                           <p className="text-center mt-2">{category.name}</p>
                         </div>
                       ))}
                     </div>
               
                     <button
                       onClick={() => scrollThumbnails(-1)}
                       className="absolute left-2 top-1/3 transform -translate-y-1/2 z-20 p-2 bg-white rounded-full hover:shadow-lg"
                       aria-label="Scroll Left"
                     >
                       <ChevronLeft />
                     </button>
                     <button
                       onClick={() => scrollThumbnails(1)}
                       className="absolute right-2 top-1/3 transform -translate-y-1/2 z-20 p-2 bg-white rounded-full hover:shadow-lg"
                       aria-label="Scroll Right"
                     >
                       <ChevronRight />
                     </button>
                   </div>
                    ) : (
                        <p className="text-gray-500 px-4 py-2">
                            No categories available
                        </p>
                    )}
                </div>

                {error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <div className="bg-white p-4 rounded-lg md:w-[90%] lg:w-full mx-auto">
                        <div className="my-3 flex items-center gap-3">
                            <div className="h-8 w-4 bg-red-500 rounded"></div>
                            <h2 className="text-sm text-red-500 font-bold">
                                Top Products
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {products.map((product) => (
                                <Product
                                    key={product._id}
                                    product={product}
                                />
                            ))}
                        </div>
                        <Paginate
                            page={page}
                            pages={pages}
                            keyword={keyword}
                        />
                    </div>
                )}

                {keyword === '' && offers && offers.length > 0 && (
                    <div className="my-4 bg-white rounded-md p-4 md:w-[90%] lg:w-full mx-auto">
                       {offers && Array.isArray(offers) && offers.length > 0 && offers.map((offer) => (
<div key={offer.id} className="mb-6">
    {offer.products && Array.isArray(offer.products) && offer.products.length > 0 && (
        <div className="my-3 flex items-center gap-3">
            <div className="h-8 w-4 bg-red-500 rounded"></div>
            <h2 className="text-sm text-red-500 font-bold">
                {offer.offer_type}
            </h2>
        </div>
    )}
    {offer.products && Array.isArray(offer.products) && offer.products.length > 0 &&
        offer.end_date && (
            <Countdown end_date={offer.end_date} />
        )}
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {offer.products && Array.isArray(offer.products) && offer.products.map((product) => (
            <Product key={product._id} product={product} />
        ))}
    </div>
</div>
))}

                    </div>
                )}

                <div className='w-[92%] mx-auto'><ProductGrid /></div>
         
                <div className="w-[90%] lg:w-full  mx-auto  md:my-0 md:p-6">
            <div className="flex flex-col md:flex-row w-full md:justify-around md:items-center gap-3 md:gap-6">
                {/* Feature 1 */}
                <div className="text-center bg-white p-4 rounded-md">
                    <div className="w-[3.5rem] h-[3.5rem] mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-200">
                        <FaShippingFast className="text-black text-2xl bg-black rounded-full p-1" />
                    </div>
                    <h3 className="text-lg font-bold">Free and Fast Delivery</h3>
                    <p className="text-sm text-gray-600">Free delivery for all orders over $50</p>
                </div>

                {/* Feature 2 */}
                <div className="text-center bg-white p-4 rounded-md">
                    <div className="w-[3.5rem] h-[3.5rem] mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-200">
                        <FaHeadset className="text-black text-2xl bg-black rounded-full p-1" />
                    </div>
                    <h3 className="text-lg font-bold">24/7 Customer Service</h3>
                    <p className="text-sm text-gray-600">Friendly 24/7 customer support</p>
                </div>

                {/* Feature 3 */}
                <div className="text-center bg-white p-4 rounded-md">
                    <div className="w-[3.5rem] h-[3.5rem] mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-200">
                        <FaMoneyBack className="text-black text-2xl bg-black rounded-full p-1" />
                    </div>
                    <h3 className="text-lg font-bold">Money Back Guarantee</h3>
                    <p className="text-sm text-gray-600">We return money within 30 days</p>
                </div>
            </div>
        </div>
               </div>
            <Footer/>
                </>
            )}
        </div>
    );
}

export default HomeScreen;
