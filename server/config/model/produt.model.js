import mongoose, { model,Schema } from "mongoose";

const reviewSchema = new Schema({
    name:{type:String,required:true},
    rating:{type:Number,required:true},
    comment:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
},{
    timestamps:true,
})

const productSchema =new Schema({
    name:{
        type:String,
        required:true,
    },
    images:[{
        public_id:{type:String,required:true},
        secure_url:{type:String,required:true},
    }],
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    sizes:[{
        type:String,
        required:true
    }],
    reviews:[reviewSchema],
    ratings:{
        type:Number,
        required:true,
        default:0
    },
    numReviews:{
        type : Number,
        required: true,
        default: 0
    },
    price:{
        type : Number,
        required: true,
        default: 0
    },
    countInStock:{
        type : Number,
        required: true,
        default: 0
    },
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
},{timestamps:true})

const Product = model('Product',productSchema)
export default Product 