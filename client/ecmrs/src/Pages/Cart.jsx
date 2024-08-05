import { Fragment } from "react";
import CartItem from '../components/CartItem'; 
import { useDispatch, useSelector } from "react-redux";
import { addItems, removeCart } from "../action/cartAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItems(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (quantity <= 1) {
      return;
    }
    dispatch(addItems(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeCart(id));
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div>
          <RemoveShoppingCartIcon />
          <Typography>No product in your cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div>
            <div>
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>
            <div>
              {cartItems.map((item) => (
                <div key={item.product}>
                  <CartItem item={item} deleteCartItems={deleteCartItems} />
                  <div>
                    <button onClick={() => decreaseQuantity(item.product, item.quantity)}>-</button>
                    <input type="number" value={item.quantity} readOnly />
                    <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</button>
                  </div>
                  <p>{`Rs${item.price * item.quantity}`}</p>
                </div>
              ))}
              <div>
                <div>
                  <p>Gross Total</p>
                  <p>{`Rs${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)}`}</p>
                </div>
                <div>
                  <button onClick={checkoutHandler}>Check Out</button>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Cart;
