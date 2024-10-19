
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router';
import SignIn from './components/Auth/SignIn';
import New from './components/Items/New';
import Shoes from './components/Items/Shoes';
import Cloth from './components/Items/Cloth';
import Gloves from './components/Items/Gloves';
import Kitchen from './components/Items/Kitchen';
import Dashboard from './components/Auth/Dashboard';
import AddPost from './components/Post/AddPost';
import UpdatePost from './components/Post/UpdatePost';
import DeletePost from './components/Post/DeletePost';
import ProductPage from './components/ProductPage/ProductPage';
import Edit from './components/Post/Edit';
import Delete from './components/Post/Delete';
import Cart from './components/Cart';
// import Footer from './components/Footer';
import Checkout from './components/Checkout';
import { CartProvider } from './components/CartContext';
import { useState } from 'react';
import Orders from './components/Post/Orders';
import SignUp from './components/Auth/SignUp';
import FAQs from './components/Customers/FAQs';
import ShippingReturns from './components/Customers/ShippingReturns';
import OrderTracking from './components/Customers/OrderTracking';
import PrivacyPolicy from './components/Customers/PrivacyPolicy';
import TermsOfService from './components/Customers/TermsOfService';
import AboutUs from './components/Customers/AboutUs';
import ContactUs from './components/Customers/ContactUs';
import Home from './components/Home';
import Popup from './components/Popup';
import Footer from './components/Footer/Footer';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  return (
    <div className="App">
      <CartProvider>
        <Popup />
        <Navbar toggleCart={toggleCart} isCartOpen={isCartOpen} />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/new' element={<New />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} /> {/* Corrected route for Orders component */}

          <Route path='/shoes' element={<Shoes />} />
          <Route path='/cloth' element={<Cloth />} />
          <Route path='/gloves' element={<Gloves />} />
          <Route path='/kitchen' element={<Kitchen />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="/product/:id" element={<ProductPage toggleCart={toggleCart} />} />

          <Route path='/addpost' element={<AddPost />} />
          <Route path="/update/:id" element={<UpdatePost />} />
          <Route path="/delete/:id" element={<DeletePost />} />

          <Route path="/edit" element={<Edit />} />
          <Route path="/delete" element={<Delete />} />

          <Route path="/faqs" element={<FAQs />} />
          <Route path="/ship" element={<ShippingReturns />} />
          <Route path="/ordertrack" element={<OrderTracking />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/tearms" element={<TermsOfService />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />

        </Routes>

        {/* <Footer /> */}
        <Footer />
      </CartProvider >
    </div >
  );
}

export default App;
