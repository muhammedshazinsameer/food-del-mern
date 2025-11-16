import mongoose from "mongoose";

export const connectDB = async () =>{
  await mongoose.connect('mongodb+srv://muhammedshazinsameer:targetOn21top@cluster0.mzljbp6.mongodb.net/food-del').then(()=>console.log("DB connected"));
}    