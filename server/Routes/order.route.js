import { Router } from "express";
import { deleteOrder, getAllOrders, getSingleOrder, myorders, newOrder, updateOrder } from "../controllers/order.controller.js";



const router = Router();

router.route('/order/new').post(newOrder)
router.route('/order/:id').get(getSingleOrder);
router.route('/me').get(myorders)
router.route('/admin/order',).get(getAllOrders)
router.route('/admin/order/:id')
    .put(updateOrder)
    .delete(deleteOrder)
export default router;