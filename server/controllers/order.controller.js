import Order from "../config/model/order.model.js";
import Product from "../config/model/produt.model.js";
import AppError from "../utils/AppError.js";

const newOrder = async(req,res,next)=>{

    const {shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice} = req.body;

    const order = Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id
    });

    return res.status(200).json({
        success:true,
        message:'order created succesfully',
        order
    })
}


const getSingleOrder = async(req,res,next)=>{
    const  order = Order.findById(req.params.id).populate(
        "user",
        "name email"
    )

    if(!order){
        return next(new AppError('order not found',500));
    }

    return res.status(200).json({
        success:true,
        message:'the order',
        order
    })

}
const myorders = async(req,res,next)=>{
    try {
        const orders = await Order.find({ user: req.user._id }); // Assuming req.user contains the authenticated user's info
    
        if (!orders || orders.length === 0) {
          return next(new AppError('Orders not found', 404));
        }
    
        return res.status(200).json({
          success: true,
          message: 'Orders fetched successfully',
          orders
        });
      } catch (error) {
        return next(new AppError(error.message, 500));
      }

}

const getAllOrders = async(req,res,next)=>{
    const  order = Order.find()
    if(!order){
        return next(new AppError('order not found',500));
    }
    let totalPrice = 0

    order.forEach((o)=>{
        totalPrice  += o.totalPrice 
    })
    return res.status(200).json({
        success:true,
        message:'the order',
        order,
        totalPrice
    })

}
const updateOrder = async(req,res,next)=>{
    const  order = Order.findById(req.params.id)
    if(!order){
        return next(new AppError('order not found',500));
    }

    if(order.orderstatus === 'Delivered' ){
        return next(new AppError("you have delivered this order"),500)
    }

    if(req.body.status === 'Shipped'){
        order.orderItems.forEach(async(o)=>{
            await updateStock(o.product,o.quantity)
        });
    }

    order.orderstatus =  req.body.status;
    if(req.body.status === 'Delivered'){
        order.deliveredAt = Date.now()
    }

    await order.save({validateBeforeSave:false})

    return res.status(200).json({
        success:true,
        message:'updated order',
    })

}
async function updateStock(id,quantity){
    const product = await Product.findById(id);

    product.Stock -= quantity;
    await product.save({validateBeforeSave:true}) 
}


const deleteOrder = async (req,res,next)=>{
    const order = Order.find(req.params.id);
    if(!order){
        return next(new AppError('order not found',404));
    }
    await order.remove();

    return res.status(200).json({
        success:true,
        message:'order deleted'
    })
}
export {
    newOrder,
    myorders,
    getSingleOrder,
    deleteOrder,
    updateOrder,
    getAllOrders
}