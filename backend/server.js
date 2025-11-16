import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js';
import foodRouter from './routes/FoodRoute.js';
import UserRouter from './routes/UserRoute.js';
import 'dotenv/config'
import CartRouter from './routes/CartRoute.js';
import orderRouter from './routes/OrderRoute.js';

//app config 
const app = express();
const port = 4000;

//middleware
app.use(express.json())
app.use(cors())

//Db connection 
connectDB();

//api endpoint 
app.use('/api/food',foodRouter); 
app.use('/images', express.static('uploads'));
app.use('/api/user',UserRouter);
app.use("/api/cart",CartRouter);
app.use("/api/order",orderRouter);

app.get('/',(req,res)=>{
    res.send("API is working")
})

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})

