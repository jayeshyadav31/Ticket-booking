import express from "express"
import dotenv from "dotenv"
import UserRoutes from "./Routes/UserRoutes.js"
import cookieParser from "cookie-parser"
import connectDB from "./db/connectDB.js"
import MovieRoutes from "./Routes/MovieRoutes.js"
import TicketRoutes from "./Routes/TicketRoutes.js"
import {v2 as cloudinary} from "cloudinary";
import bodyParser from 'body-parser';
import { confirmation, stripePayment } from "./Controllers/StripeController.js"
const app=express()
dotenv.config()
connectDB()
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});
app.use(bodyParser.json({ limit: '20mb' }));
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
const port=process.env.PORT || 5000

app.use('/api/users',UserRoutes)
app.use('/api/ticket',TicketRoutes)
app.use('/api/movie',MovieRoutes);
app.use('/api/stripe/checkout',stripePayment)
app.use('/api/stripe/confirmation',confirmation)
app.listen(port,()=>{
    console.log(`server is listening to post ${port}`)
})