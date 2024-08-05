import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
// eslint-disable-next-line react/prop-types
function Product({ product }) {
    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision:0.5
    };

    return (
        <div className="product-card">
            <Link to={`/product/${product._id}`}>
                <img src={product.images[0].url} alt={product.name} className="product-image" />
                <p>{product.name}</p>
                <div>
                    <Rating {...options} />
                    <span>{product.numReviews} Reviews</span>
                </div>
                <span>{`Rs${product.price}`}</span>
            </Link>
        </div>
    );
}

export default Product;
