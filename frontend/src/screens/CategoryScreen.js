import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProductsByCategory } from '../actions/categoryAction';
import { listSpecialOffers } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Product from '../components/Product';
import { Container } from 'react-bootstrap';

function CategoryScreen({ match }) {
    const dispatch = useDispatch();
    const categoryId = match.params.id;

    const productList = useSelector((state) => state.productListByCategory);
    const { loading, error, products } = productList;

    const specialOfferList = useSelector((state) => state.specialOfferList);
    const { loading: offersLoading, error: offersError, offers } = specialOfferList;

    useEffect(() => {
        dispatch(listProductsByCategory(categoryId));
        dispatch(listSpecialOffers());
    }, [dispatch, categoryId]);

    // Filter out products with special offers
    const productsWithoutSpecialOffers = products.filter(product => {
        return !offers.some(offer => 
            offer.products.some(offerProduct => offerProduct._id === product._id)
        );
    });
    
    // Filter special offers by category
    const filteredOffers = offers.map(offer => ({
        ...offer,
        products: offer.products.filter(product => 
            product.categories.some(category => category.id === parseInt(categoryId))
        )
    })).filter(offer => offer.products.length > 0);

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

    const categoryName = products.length > 0 && products[0].categories.length > 0
        ? products[0].categories[0].name
        : 'Products';

    return (
        
             <div className='py-4'>
            <h1 className="text-2xl font-bold bg-white px-4 py-3 rounded-md text-center">
                {loading ? 'Loading...' : error ? error : categoryName}
            </h1>

            {loading || offersLoading ? (
                <Loader />
            ) : error || offersError ? (
                <Message variant="danger">{error || offersError}</Message>
            ) : (
                <>
                    {/* Special Offers Section */}
                    {filteredOffers.length > 0 && (
                        <div className='my-4'>
                            {filteredOffers.map(offer => (
                                <div key={offer.id} className='bg-white rounded-md my-4'>
                                    <h2 className="text-xl font-semibold bg-yellow-200 px-4 py-2  rounded-t-md">
                                        {offer.offer_type}
                                    </h2>
                                    <div className='p-4'>
                                    <div className="grid grid-cols-2 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-5 gap-4">
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
                        <div key={subcategory} className='bg-white rounded-lg my-3 '>
                            <h2 className="text-xl font-semibold bg-gray-200 px-4 py-2  rounded-t-md">
                                {subcategory}
                            </h2>
                            <div className='p-4'>
                            <div className="grid grid-cols-2 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-5 gap-4">
                                {productsBySubcategory[subcategory].map(product => (
                                    <Product key={product._id} product={product} />
                                ))}
                            </div>
                            </div>
                          
                        </div>
                    ))}
                </>
            )}
        </div>
       
       
    );
}

export default CategoryScreen;
