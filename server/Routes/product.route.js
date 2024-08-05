import { Router } from "express";
import { createProduct, createProductReviews, deleteProduct, deleteReview, getAdminProduct, getAllProducts, getProductReviews, getproductbyid, updateProduct } from "../controllers/product.controllers.js";
import upload from "../middlewares/multer.middleware.js";
import { authorizedRole, isLoggedIn } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/admin/products').get(getAdminProduct)

router.route('/')
    .get(getAllProducts)
    .post(upload.array('images',),createProduct)

router.route('/:id/reviews')
    .post(createProductReviews)
router.route('/:id')
    .get(getproductbyid)
    .delete(deleteProduct)
    .put(updateProduct)

router.route('/review').put(createProductReviews)

router.route('/reviews').get(getProductReviews).delete(deleteReview)
export default router;