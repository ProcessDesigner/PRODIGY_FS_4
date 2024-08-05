import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {thunk} from "redux-thunk";
import { newProductReducer, newReviewReducer, proReducer, productDetailReducer, productReducer } from "../Reducers/productReducer";
import { cartReducer } from "../Reducers/cartReducer";
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from "../Reducers/userReducers";
import { newOrderReducer, myOrderReducer, orderDetailReducer } from "../Reducers/orderReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrder: myOrderReducer,
  orderDetails: orderDetailReducer,
  newReview : newReviewReducer,
  newProduct:newProductReducer,
  pro:proReducer
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {}
  }
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
