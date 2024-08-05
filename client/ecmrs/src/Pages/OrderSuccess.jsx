import { Typography } from "@material-ui/core"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import { Link } from "react-router-dom"
const OrderSuccess = () =>{
    return(
        <div>
            <CheckCircleIcon/>
            <Typography>Your Order has been  Placed Successfully</Typography>
            <Link to="/order/me">View Order</Link>
        </div>
    )
}

export default OrderSuccess