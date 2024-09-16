import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'; // Import necessary components
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import SubcategoryScreen from './screens/SubCtegoryScreen';
import CategoryScreen from './screens/CategoryScreen';
import SearchResult from './screens/SearchResult';
import NotFound from './components/ErrorPage';
import WishlistPage from './screens/wishList';
import ComingSoon from './screens/Coming';

// Define AuthLayout and MainLayout
const AuthLayout = ({ children }) => (
    <div className="min-h-screen flex flex-col">
        {children}
        {/* Optionally, you can add a footer or header here if needed */}
    </div>
);

const MainLayout = ({ children }) => (
    <div className="min-h-screen flex flex-col bg-gray-100">
        {/* <Header /> */}
     
            {children}
        {/* <Footer /> */}
    </div>
);

function App() {
  return (
    <Router>
      <Switch>
        {/* Auth Layout Routes */}
        <Route path={['/login', '/register', '/profile']}>
        
          <AuthLayout>
            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/profile' component={ProfileScreen} />
          </AuthLayout>
        </Route>

        {/* Main Layout Routes */}
        <Route path={[
          '/', 
          '/product/:id', 
          '/cart/:id?', 
          '/shipping', 
          '/payment', 
          '/placeorder', 
          '/order/:id', 
          '/admin/user/:id/edit', 
          '/admin/productlist', 
          '/admin/product/:id/edit', 
          '/admin/orderlist', 
          '/category/:id', 
          '/subcategory/:id'
        ]}>
          <MainLayout>
            <Route path='/' component={HomeScreen} exact />
            <Route path='/error' component={NotFound} />
            <Route path='/products' component={SearchResult} exact />
            <Route path='/product/:id' component={ProductScreen} />
            <Route path='/cart/:id?' component={CartScreen} />
            <Route path='/shipping' component={ShippingScreen} />
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/placeorder' component={PlaceOrderScreen} />
            <Route path='/order/:id' component={OrderScreen} />
            <Route path='/admin/user/:id/edit' component={UserEditScreen} />
            <Route path='/admin/productlist' component={ProductListScreen} />
            <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
            <Route path='/admin/orderlist' component={OrderListScreen} />
            <Route path='/category/:id' component={CategoryScreen} />
            <Route path='/subcategory/:id' component={SubcategoryScreen} />
            <Route path='/wishlist' component={WishlistPage} />
            <Route path='/coming-soon' component={ComingSoon} />

          </MainLayout>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
