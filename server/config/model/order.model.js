import {model,Schema} from 'mongoose'

const orderSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    orderItems:[
        {
            name:{type:String,required:true},
            qty:{type:Number,required:true},
            image:{
                public_id:{
                    type:String,
                    required:true,
                },
                secure_url:{
                    type:String,
                    required:true,
                }
            },
            price:{
                type:Number,
                required:true,
            },
            product: {
                type : Schema.Types.ObjectId,
                required: true,
                ref:'Product'
            },
        }
    ],
    paymentInfo:{
        id:{type:String,required:true},
        status:{type:String,required:true}
    },
    orderstatus:{
      
        type:String,
        required:true,
        default:'processing'
    },
    Stock:{
        type:String,
        required:true
    },
    phoneno:{
        type:Number,
        required:true
    },
    shippingInfo:{
        address:{type:String,required:true},
        city:{type:String,required:true},
        state:{type:String,required:true},
        pincode:{type:Number,required:true}
    },
    paymentMethod:{
        type:String,
        required:true,
    },
    paymentResult:{
        id:{type:String},
        status:{type:String},
        update_time: {type: String },
        email_adress: {type: String },
    },
    itemsPrice:{
        type:Number,
        required:true
    },
    taxPrice:{
        type : Number,
        required: true,
        default: 0.0
    },
    shippingPrice:{
        type : Number,
        required: true,
        default: 0.0
    },
    totalPrice:{
        type : Number,
        required: true,
        default: 0.0
    },
    isPaid:{
        type : Boolean,
        required: true,
        default:false
    },
    paidAt:{
        type: Date
    },
    isDelivered:{
        type : Boolean,
        required: true,
        default:false
    },
    deliveredAt:{
        type: Date
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

},
{
    timestamps:true
}
)

const Order = model('Order',orderSchema);
export default Order; 