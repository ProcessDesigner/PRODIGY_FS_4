import axiosInstance from "../Helperw/axiosInstance";
import { ADD_TO_CART, REMOVE_CARD_ITEM, SAFE_SHIPPING_INFO } from "../constants/cartConstant";

const addItems = (id, quantity) => async (dispatch, getState) => {
  try {
    const { data } = await axiosInstance.get(`/products/${id}`);
    console.log("Fetched product data:", data);

    if (data && data.product) {
      dispatch({
        type: ADD_TO_CART,
        payload: {
          product: data.product._id,
          name: data.product.name,
          price: data.product.price,
          image: data.product.image,
          stock: data.product.stock,
          quantity
        }
      });

      const cartItems = getState().cart.cartItems;
      console.log("Updated cart items:", cartItems);

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } else {
      console.error("Invalid response data");
    }
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
};

const removeCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CARD_ITEM,
    payload: id
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

const safeshippinginfo = (data) => async (dispatch) => {
  dispatch({
    type: SAFE_SHIPPING_INFO,
    payload: data,
  });
  localStorage.setItem("shippinginfo", JSON.stringify(data));
};

export {
  addItems,
  removeCart,
  safeshippinginfo
};
