import { Fragment, useEffect } from "react"
import { useSelector } from "react-redux"
import CheckoutSteps from "../components/CheckoutSteps"
import { Typography } from "@material-ui/core"
import { Link, useNavigate } from "react-router-dom"

function OrderConfirm() {
    const { shippingInfo, cartItems } = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.user)
    const navigate = useNavigate()
    useEffect(() => {
        console.log("User:", user);
      }, [user]);
    const subTotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0 // Initialize accumulator to 0
    )
    const shippingCharges = subTotal > 1000 ? 0 : 200
    const tax = subTotal * 0.18
    const totalPrice = subTotal + tax + shippingCharges

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}`
    
    const proceedToPayment = () => {
        const data = {
            subTotal,
            shippingCharges,
            tax,
            totalPrice
        }
        sessionStorage.setItem("orderInfo", JSON.stringify(data))
        navigate('/process/payment')
    }

    return (
        <Fragment>
            <CheckoutSteps activeSteps={1} />
            <div>
                <div>
                    <div>
                        <Typography>Shipping Info</Typography>
                        <div>
                            <div>
                                <p>Name:</p>
                                <span>{user.fullName}</span>
                            </div>
                            <div>
                                <p>Phone No.:</p>
                                <span>{user.phoneno}</span>
                            </div>
                            <div>
                                <p>Address:</p>
                                <span>{address}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Typography>Your Cart Item:</Typography>
                        <div>
                            {cartItems && cartItems.map((item) => (
                                <div key={item.product}>
                                    <img src={item.image} alt="Product" />
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    {"  "}
                                    <span>
                                        {item.quantity} X Rs{item.price} = {" "}
                                        <b>Rs{item.price * item.quantity}</b>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <Typography>Order Summary</Typography>
                        <div>
                            <div>
                                <p>Subtotal: </p>
                                <span>Rs{subTotal}</span>
                            </div>
                            <div>
                                <p>Shipping Charges: </p>
                                <span>Rs{shippingCharges}</span>
                            </div>
                            <div>
                                <p>GST: </p>
                                <span>Rs{tax}</span>
                            </div>
                        </div>
                        <div>
                            <p>
                                <b>Total :</b>
                                <span>Rs{totalPrice}</span>
                            </p>
                        </div>
                        <button onClick={proceedToPayment}>Proceed to payment</button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default OrderConfirm
