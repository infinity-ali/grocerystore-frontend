import Template from "./template/Template";
import ProductDetail from "./products/detail/ProductDetail";
import { Routes, Route } from "react-router-dom";
import Landing from "./landing/Landing";
import ProductList from "./products/ProductList";
import LoginPage from "./Authorization/Login/LoginPage";
import SignupPage from "./Authorization/Signup/SignupPage";
import Cart from "./Checkout/Cart";
import Checkout from "./Checkout/Checkout";
import EmailOtp from "./Authorization/Login/EmailOtp";
import { NotificationContainer } from "react-notifications";
import ProductsFilter from "./products/ProductsFilter";
import AllProducts from "./products/AllProducts";
import Success from "./Checkout/Success";

function App() {
  // console.log("App ran")
  return (
    <>
      <NotificationContainer/>
      <Template>
        <Routes>
         

          {/* <Route path="/products" element={<ProductList />} exact /> */}
          <Route path="/category/:id" element={<ProductsFilter />} exact />
          {/* <Route path="/category" element={<ProductsFilter />} exact /> */}
           
          {/* <Route path="/products/:slug" element={<ProductDetail />} /> */}
          <Route path="/products/:id" element={<ProductDetail />} />
           
          <Route path="/" element={<Landing />} exact />

          <Route path="/all-products" element={<AllProducts />} exact />
          
          <Route path="/login" element={<LoginPage />} exact />
       
          <Route path="/signup" element={<SignupPage />} exact />

          <Route path="/cart" element={<Cart />} exact />
            
          <Route path="/checkout" element={<Checkout />} exact />

          <Route path="/success" element={<Success />} exact />

          <Route path="/emailverification" element={<EmailOtp />} exact />
         
        </Routes>
      </Template>
    </>
  );
}

export default App;
