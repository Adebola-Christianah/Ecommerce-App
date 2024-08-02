import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import { listProducts, listSpecialOffers } from '../actions/productActions';
import { listCategories } from '../actions/categoryAction';
import Countdown from '../components/Countdown';
import { ReactComponent as ChevronRight } from '../images/Chevronright.svg';
import { ReactComponent as FaShippingFast } from '../images/icon-delivery (1).svg';
import { ReactComponent as FaHeadset } from '../images/Icon-Customer service.svg';
import { ReactComponent as FaMoneyBack } from '../images/Icon-secure.svg';
import ProductGrid from '../components/ProductGrid';

function HomeScreen({ history }) {
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState(null);

    const productList = useSelector((state) => state.productList);
    const specialOfferList = useSelector((state) => state.specialOfferList);
    const { error, loading, products, page, pages } = productList;
    const { offers } = specialOfferList;
    const categoryList = useSelector((state) => state.categoryList);
    const { loading: loadingCategories, error: errorCategories, categories } = categoryList;
    let keyword = history.location.search;

    useEffect(() => {
        dispatch(listProducts(keyword));
        dispatch(listCategories());
        dispatch(listSpecialOffers());
    }, [dispatch, keyword]);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const handleBackClick = () => {
        setSelectedCategory(null);
    };

    const renderSubcategories = (subcategories) => {
        return subcategories.map(subcategory => (
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
            <div className="flex flex-col space-y-2 ">
                {categories.map(category => (
                    <div
                        key={category._id}
                        className="flex items-center hover:bg-gray-100 cursor-pointer justify-between px-4 py-2 text-sm font-semibold text-gray-900  "
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category.name}
                        <ChevronRight className="h-5 w-5 text-gray-500" />
                    </div>
                ))}
            </div>
        ) : (
            <p className="text-gray-500 px-4 py-2">No categories available</p>
        );
    };

    const renderSelectedCategory = () => {
        return (
            <div>
                <button
                    onClick={handleBackClick}
                    className="block px-4 py-2 text-sm text-blue-500 hover:underline no-underline"
                >
                    Back to Categories
                </button>
                <div className="mt-2">
                    {renderSubcategories(selectedCategory.subcategories)}
                </div>
            </div>
        );
    };

    return (
        <div className="w-full mx-auto">
            <div className="flex flex-col md:flex-row gap-3">
                <div className="hidden md:flex flex-col py-4 space-y-2 border-r w-full md:w-1/5">
                    {loadingCategories ? (
                        <Loader />
                    ) : errorCategories ? (
                        <Message variant="danger">{errorCategories}</Message>
                    ) : (
                        selectedCategory ? renderSelectedCategory() : renderCategories()
                    )}
                </div>
                <div className="w-full md:w-4/5 flex md:justify-center">
                    <ProductCarousel />
                </div>
            </div>

            <div className="my-3 flex items-center gap-3">
                <div className="h-8 w-4 bg-red-500 rounded"></div>
                <span className="text-sm text-red-500 font-bold">Today's</span>
            </div>

            <Countdown />

            {/* Special Offers Section */}
            <div className="my-8">
                {offers && offers.length > 0 && offers.map((offer) => (
                    <div key={offer.id} className="mb-6">
                        <h2 className="text-lg font-bold">{offer.offer_type}</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {offer.products.map((product) => (
                                <Product key={product._id} product={product} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <div>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {products.map((product) => (
                            <Product key={product._id} product={product} />
                        ))}
                    </div>
                    <Paginate page={page} pages={pages} keyword={keyword} />
                    <ProductGrid />
                    <div className="container mx-auto p-6">
                        <div className="flex flex-col md:flex-row justify-around items-center gap-3 md:gap-6">
                            {/* Feature 1 */}
                            <div className="text-center">
                                <div className="w-[3.5rem] h-[3.5rem] mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-200">
                                    <FaShippingFast className="text-black text-2xl bg-black rounded-full p-1" />
                                </div>
                                <h3 className="text-lg font-bold">Free and Fast Delivery</h3>
                                <p className="text-sm text-gray-600">Free delivery for all orders over $50</p>
                            </div>

                            {/* Feature 2 */}
                            <div className="text-center">
                                <div className="w-[3.5rem] h-[3.5rem] mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-200">
                                    <FaHeadset className="text-black text-2xl bg-black rounded-full p-1" />
                                </div>
                                <h3 className="text-lg font-bold">24/7 Customer Service</h3>
                                <p className="text-sm text-gray-600">Friendly 24/7 customer support</p>
                            </div>

                            {/* Feature 3 */}
                            <div className="text-center">
                                <div className="w-[3.5rem] h-[3.5rem] mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-200">
                                    <FaMoneyBack className="text-black text-2xl bg-black rounded-full p-1" />
                                </div>
                                <h3 className="text-lg font-bold">Money Back Guarantee</h3>
                                <p className="text-sm text-gray-600">We return money within 30 days</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HomeScreen;
