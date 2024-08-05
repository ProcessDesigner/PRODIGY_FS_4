import express from "express"
import cookieParser from 'cookie-parser'
import errorMiddleware from "./middlewares/error.middleware.js";
import morgan from "morgan";
import userRoutes from './Routes/user.route.js'
import productRoute from './Routes/product.route.js'
import orderRoutes from './Routes/order.route.js'
import paymentRoutes from './Routes/payment.route.js'
import cors from 'cors'
const app = express();

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({encoded:true}))

app.use(cors({
    origin:['http://localhost:5173'],
    credentials:true
}));
app.use('/ping',(req,res)=>{
    res.send('pong')
})
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/order',orderRoutes);
app.use('/api/v1/products',productRoute);
app.use('/api/v1/payments',paymentRoutes);


app.use('*',(req,res)=>{
    res.status(404).send('404 invalid response')
})
app.use(errorMiddleware)
export default app;