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
function HomeScreen({ history }) {
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loadingData, setLoadingData] = useState(true); // State to manage loading status

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

    const handleBackClick = () => {
        setSelectedCategory(null);
    };

    const containerRef = useRef(null);

    const scrollLeft = () => {
        containerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    };

    const scrollRight = () => {
        containerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    };

    const renderSubcategories = (subcategories) => {
        return subcategories.map((subcategory) => (
            <Link
                key={subcategory._id}
                to={`/subcategory/${subcategory.id}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 no-underline"
            >
                {subcategory.name}
            </Link>
        ));
    };

    const renderCategories = () => {
        return categories && categories.length > 0 ? (
            <div className="flex flex-col space-y-2 bg-white overflow-y-auto">
                {categories.map((category) => (
                    <div
                        key={category._id}
                        className="flex items-center hover:bg-gray-100 cursor-pointer justify-between px-4 py-2 text-sm font-semibold text-gray-900"
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category.name}
                        {category.subcategories.length > 0 && (
                            <ChevronRight className="h-5 w-5 text-gray-500" />
                        )}
                    </div>
                ))}
            </div>
        ) : (
            <p className="text-gray-500 px-4 py-2">No categories available</p>
        );
    };

    const renderSelectedCategory = () => {
        return (
            <div className="">
                <button
                    onClick={handleBackClick}
                    className="px-4 w-full py-2 text-sm flex hover:bg-gray-100 items-center gap-2"
                >
                    <ArrowLeft className="text-black" />
                    Categories
                </button>
                <div className="mt-2">{renderSubcategories(selectedCategory.subcategories)}</div>
            </div>
        );
    };

    return (
        <div className="w-full lg:w-[90%] mx-auto">
            {loadingData ? (
                <Loader /> // Show a single loader while data is being fetched
            ) : (
                <>
                  <div className="bg-gray-100 mt-3 md:h-[24rem]">
  {keyword === '' && (
    <div className="flex flex-col md:flex-row gap-3 h-full">
      {/* Categories Section */}
      <div className="hidden lg:flex flex-col py-4 space-y-2 border-r w-full md:w-[18%] h-full bg-white">
        {selectedCategory ? renderSelectedCategory() : renderCategories()}
      </div>
      
      {/* Product Carousel and Sidebar */}
      <div className="w-full lg:w-[82%] flex md:justify-center md:h-[24rem]">
        <ProductCarousel loading={loading} products={productTopRated?.products} />
        
        {/* Sidebar Section */}
        <div className="px-4 max-w-md mx-auto hidden md:flex flex-col h-full gap-3">
  <div className="flex flex-col space-y-4 w-[14.5rem] bg-white rounded p-4 h-[calc(50%-0.375rem)]">
    {/* CALL TO ORDER Section */}
    <p className="font-semibold text-gray-700 w-full">CALL TO ORDER</p>
    <div className="flex items-center space-x-2 w-full">
      <i className="fas fa-phone-alt text-orange-500"></i>
      <div className="text-gray-500">0700-600-0000</div>
    </div>
    
    {/* Sell on Jumia Section */}
    <div className="flex items-center space-x-2">
      <i className="fas fa-store text-yellow-500"></i>
      <div className="font-semibold text-gray-700">Sell on Jumia</div>
    </div>
    
    {/* Best Deals Section */}
    <div className="flex items-center space-x-2">
      <i className="fas fa-tags text-orange-500"></i>
      <div className="font-semibold text-gray-700">Best Deals</div>
    </div>
  </div>

  {/* Jumia Force Banner */}
  <div className="h-[calc(50%-0.375rem)] bg-red-600">
    <img src={Flashsale} alt="Jumia Force" className="rounded shadow w-full h-full object-contain pulse-fade"/>
  </div>
</div>


      </div>
    </div>
  )}
</div>


                    <div className="bg-white rounded-md my-4 md:w-[90%] lg:w-full mx-auto">
                        <div className="flex items-center gap-3 bg-white mx-4">
                            <div className="h-8 w-4 bg-red-500 rounded mt-4"></div>
                            <h2 className="text-sm text-red-500 font-bold mt-4">
                                Shop by Category
                            </h2>
                        </div>
                        {keyword === '' && categories && categories.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 bg-white rounded-md">
                                {categories.map((category) => (
                                    <div
                                        key={category.id}
                                        className="flex flex-col items-center"
                                    >
                                        <div
  className="rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
  onClick={() => history.push(`/category/${category.id}`)}
>
  <img
    src={category.image || ''}
    alt={category.name}
    className="h-32 w-full rounded-lg object-contain bg-gray-200"
    style={{
      backgroundColor: category.theme_color || 'gray',
    }}
  />
</div>
                                        <p className="text-center mt-2">
                                            {category.name}
                                        </p>
                                    </div>
                                ))}
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
                            {offers.map((offer) => (
                                <div key={offer.id} className="mb-6">
                                    {offer.products.length > 0 && (
                                        <div className="my-3 flex items-center gap-3">
                                            <div className="h-8 w-4 bg-red-500 rounded"></div>
                                            <h2 className="text-sm text-red-500 font-bold">
                                                {offer.offer_type}
                                            </h2>
                                        </div>
                                    )}
                                    {offer.products.length > 0 &&
                                        offer.end_date && (
                                            <Countdown
                                                end_date={offer.end_date}
                                            />
                                        )}
                                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                        {offer.products.map((product) => (
                                            <Product
                                                key={product._id}
                                                product={product}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
 {keyword === '' && offers && offers.length > 0 && (
                        <div className="my-4 bg-white rounded-md p-4 md:w-[90%] lg:w-full mx-auto">
                            {offers.map((offer) => (
                                <div key={offer.id} className="mb-6">
                                    {offer.products.length > 0 && (
                                        <div className="my-3 flex items-center gap-3">
                                            <div className="h-8 w-4 bg-red-500 rounded"></div>
                                            <h2 className="text-sm text-red-500 font-bold">
                                                {offer.offer_type}
                                            </h2>
                                        </div>
                                    )}
                                    {offer.products.length > 0 &&
                                        offer.end_date && (
                                            <Countdown
                                                end_date={offer.end_date}
                                            />
                                        )}
                                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                        {offer.products.map((product) => (
                                            <Product
                                                key={product._id}
                                                product={product}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <ProductGrid />

                  

                    <div className="md:w-[90%] lg:w-full  mx-auto p-6">
                <div className="flex flex-col md:flex-row justify-around items-center gap-3 md:gap-6">
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
                </>
            )}
        </div>
    );
}

export default HomeScreen;
