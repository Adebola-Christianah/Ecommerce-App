import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Container } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import { listProducts, listSpecialOffers } from '../actions/productActions';
import { listCategories } from '../actions/categoryAction';
import { listTopProducts } from '../actions/productActions';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';
import ErrorPage from '../components/ErrorPage';
function SearchResult({ history }) {
    const dispatch = useDispatch();
    const [loadingData, setLoadingData] = useState(true); // State to manage loading status
    const location=useLocation()
    const productList = useSelector((state) => state.productList);
    const { error, products, page, pages } = productList;

    let keyword = history.location.search;
    const params = new URLSearchParams(location.search);
    const searched = params.get('keyword') || ''; 
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

 

    return (
        <>
           {
    products.length===0 ?
   <ErrorPage/>:
   <div className="w-full h-screen mx-auto  bg-white">
         

   {loadingData ? (
       <Loader /> // Show a single loader while data is being fetched
   ) : (
       <>

          
           {error ? (
               <ErrorPage/>
           ) : (

               <div>
                   <Header/>
                   <div className="bg-white p-4 rounded-lg md:w-[90%] lg:w-full mx-auto h-screen">
 {products.length>0 &&                  <div className="my-3 flex items-center h-12 gap-3">
<div className="text-2xl font-semibold ">

Search {products.length > 1? 'results' : 'result'} for {searched}
</div>
<div className="text-sm text-gray-400 flex ">
{products.length} {products.length > 1 ? 'results' : 'result'}
</div>
</div>}

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
                   <Footer/>
               </div>
           )}
       </>
   )}
</div>
}
        </>
       
    );
}

export default SearchResult;
