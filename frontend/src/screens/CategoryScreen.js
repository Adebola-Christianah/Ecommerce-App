import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProductsByCategory } from '../actions/categoryAction';
import { listSpecialOffers } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Product from '../components/Product';
import Header from '../components/Header';
import Footer from '../components/Footer';

function CategoryScreen({ match }) {
    const dispatch = useDispatch();
    const categoryId = match.params.id;

    const productList = useSelector((state) => state.productListByCategory);
    const { loading, error, products } = productList;
    console.log(products)

    const specialOfferList = useSelector((state) => state.specialOfferList);
    const { loading: offersLoading, error: offersError, offers } = specialOfferList;

    useEffect(() => {
        dispatch(listProductsByCategory(categoryId));
        dispatch(listSpecialOffers());
    }, [dispatch, categoryId]);
    const categoryName = products.length > 0 && products[0].categories.length > 0
    ? products[0].categories[0].name
    : 'Products';

    // Check if a product's category or any of its child categories match the current categoryId
    const isProductInCategoryOrChild = (productCategories) => {
        return productCategories.some(category => 
            category.id === parseInt(categoryId) ||
            category.parent === categoryName
        );
    };

    // Filter out products with special offers
    const productsWithoutSpecialOffers = products.filter(product =>
        !offers.some(offer =>
            offer.products.some(offerProduct => offerProduct._id === product._id)
        )
    );

    // Filter special offers by category and child categories
    console.log(offers)
    const offersGroupedBySpecialOffer = offers.reduce((acc, offer) => {
        const offerProducts = offer.products.filter(product =>
           
            isProductInCategoryOrChild(product.categories)
        );

        if (offerProducts.length > 0) {
            acc.push({ ...offer, products: offerProducts });
        }
        return acc;
    }, []);

    // Group products by subcategory
    const productsBySubcategory = productsWithoutSpecialOffers.reduce((acc, product) => {
        product.subcategories.forEach(subcategory => {
            if (!acc[subcategory.name]) {
                acc[subcategory.name] = [];
            }
            acc[subcategory.name].push(product);
        });
        return acc;
    }, {});

   

    return (
        <div className=''>
           

            {loading || offersLoading ? (
                <Loader />
            ) : error || offersError ? (
                <Message variant="danger">{error || offersError}</Message>
            ) : (
                <>
                <div>
                    <Header/>
                    <div className='mt-4 w-[95%] mx-auto'>
                    <h1 className="text-2xl font-bold bg-white px-4 py-3 rounded-md text-center">
                {loading ? 'Loading...' : error ? error : categoryName}
            </h1>
                    {offersGroupedBySpecialOffer.length > 0 && (
                        <div className='my-4'>
                            {offersGroupedBySpecialOffer.map(offer => (
                                <div key={offer.id} className='bg-white rounded-md my-4'>
                                    <h2 className="text-xl font-semibold bg-yellow-200 px-4 py-2 rounded-t-md">
                                        {offer.offer_type}
                                    </h2>
                                    <div className='p-4'>
                                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                            {offer.products.map(product => (
                                                <Product key={product._id} product={product} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Products by Subcategory */}
                    {Object.keys(productsBySubcategory).map(subcategory => (
                        <div key={subcategory} className='bg-white rounded-lg my-3'>
                            <div className="relative text-center">
                                {productsBySubcategory[subcategory][0].subcategories[0].image ? (
                                    <div className='relative'>
                                        <img
                                            src={productsBySubcategory[subcategory][0].subcategories[0].image}
                                            alt={subcategory}
                                            className="w-full h-[20rem] object-cover mx-auto"
                                        />
                                        <div className='absolute inset-0 bg-gray-900 bg-opacity-30 flex justify-center items-center'>
                                            <h2 className="text-2xl font-bold text-white">
                                                {subcategory}
                                            </h2>
                                        </div>
                                    </div>
                                ) : (
                                    <h2 className="text-xl font-semibold bg-gray-200 px-4 py-2 rounded-t-md">
                                        {subcategory}
                                    </h2>
                                )}
                            </div>
                            <div className='p-4'>
                                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                    {productsBySubcategory[subcategory].map(product => (
                                        <Product key={product._id} product={product} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                    <Footer/>
                    </div>
                </div>
                    {/* Special Offers Section */}
                   
                </>
            )}
        </div>
    );
}

export default CategoryScreen;
