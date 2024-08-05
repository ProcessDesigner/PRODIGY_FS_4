import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import ProductDetails from "./Pages/ProductDetails";
import Products from "./Pages/Product";
import Search from "./Pages/Search";
import { useEffect, useState } from "react";
import Cart from "./Pages/Cart";
import Shipping from "./Pages/Shipping";
import OrderConfirm from "./constants/OrderConfirm";
import axiosInstance from "./Helperw/axiosInstance";
import store1 from "./Redux/store1";
import { loadUser } from "./action/userAction";
import Payment from "./components/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./Pages/OrderSuccess";
import MyOrder from "./Pages/MyOrder";
import OrderDetails from "./Pages/OrderDetails";
import LoginSignUp from "./user/LoginSignup";
import ForgotPassword from "./user/Forgotpassword";
import ResetPassword from "./user/ResetPassword";
import Profile from "./user/Profile";
import UpdatePassword from "./user/UpdatePassword";
import Dashboard from "./admin/Dashboard";
import NewProduct from "./admin/NewProduct";
import ProductList from "./admin/ProductList";
import UpdateProduct from "./admin/UpdateProduct";
import OrderList from "./admin/OrderList";
import ProcessOrder from "./admin/ProcessOrder";
import { useDispatch } from "react-redux";
// import UpdateProfile from "./user/Updateprofile";

function App1() {
    const dispatch = useDispatch()
    const [StripeApiKey, setStripeApiKey] = useState("");

    async function getStripeApiKey() {
        const { data } = await axiosInstance.get('/payments/stripeapikey');
        setStripeApiKey(data.stripe_api_key);
    }
    

    useEffect(() => {
        dispatch(loadUser());
        getStripeApiKey();
    }, [dispatch]);

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginSignUp />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:keywords" element={<Products />} />
                <Route path="/search" element={<Search />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/success" element={<OrderSuccess />} />
                <Route path="/orders" element={<MyOrder />} />
                <Route path="/password/forgot" element={<ForgotPassword/>} />
                <Route path="/password/reset/:token" element={<ResetPassword/>} />
                <Route path="/account" element={<Profile/>} />
                <Route path="/password/update" element={<UpdatePassword/>} />
                <Route path="/order/:id" element={<OrderDetails />} />
                <Route path="/shipping/order/confirm" element={<OrderConfirm />} />
                {/* <Route path="/me/update" element={<UpdateProfile/>} /> */}
                {StripeApiKey && (
                    <Route path="/process/payment" element={
                        <Elements stripe={loadStripe(StripeApiKey)}>
                            <Payment />
                        </Elements>
                    } />
                )}
                <Route path="/admin/dashboard" element={<Dashboard/>}/> 
                <Route path="/admin/products" element = {<ProductList/>}/>
                <Route path="/admin/product" element={<NewProduct/>}/> 
                <Route path=  "/admin/product/:id" element= {<UpdateProduct/>}/>
                <Route path=  "/admin/orders" element= {<OrderList/>}/>
                <Route path=  "/admin/orders/:id" element= {<ProcessOrder/>}/>
            </Routes>
        </>
    );
}

export default App1;
