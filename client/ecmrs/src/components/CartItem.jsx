import { Link } from "react-router-dom";
import { removeCart } from "../action/cartAction";

function CartItem ({item,deleteCartItems}){
    return(
        <div>
            <img src={item.image} alt="ssa"/>
            <div>
                <Link to={`/product/${item.product}`}>{item.name}</Link>
                <p onClick={()=>deleteCartItems(item.product)}>Remove</p>
            </div> 
        </div>
    );
}

export default CartItem;
