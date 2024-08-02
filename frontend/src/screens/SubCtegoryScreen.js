import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProductsBySubcategory } from '../actions/productActions';

const SubcategoryScreen = ({ match }) => {
    const subcategoryId = match.params.id;
    const dispatch = useDispatch();

    const productListBySubcategory = useSelector((state) => state.productListBySubcategory);
    const { loading, error, products } = productListBySubcategory;

    useEffect(() => {
        dispatch(listProductsBySubcategory(subcategoryId));
    }, [dispatch, subcategoryId]);

    return (
        <div className="md:container mx-auto">
            <h1 className="text-2xl font-bold my-4">Products in Subcategory</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((product) => (
                        <Product key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SubcategoryScreen;
