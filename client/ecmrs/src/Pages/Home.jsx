import { useDispatch, useSelector } from "react-redux";
import Product from "../Product/Product";
import MetaData from "../components/MetaData";
import { Fragment, useEffect } from "react";
import { getProduct } from "../action/productAction";
import { useAlert } from "react-alert";
import { logout } from "../action/userAction";

function Home() {
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products);
    const alert = useAlert();

    useEffect(() => {
        if (error) {
            alert.error(error);
        }
        dispatch(getProduct());
    }, [dispatch, error, alert]);

    const handleLogout = () => {
        dispatch(logout());
        alert.success("Logged out successfully");
    };

    return (
        <Fragment>
            <MetaData title={'Ecommerce'} />
            <button 
                className="logout-button bg-red-500 text-white p-2 rounded"
                onClick={handleLogout}
            >
                Logout
            </button>
            {loading ? (
                "Loading..."
            ) : (
                <div className="flex justify-center">
                    <div>
                        {products && products.length > 0 ? (
                            products.map((product) => (
                                <Product key={product._id} product={product} />
                            ))
                        ) : (
                            <p>No products found</p>
                        )}
                    </div>
                </div>
            )}
        </Fragment>
    );
}

export default Home;
