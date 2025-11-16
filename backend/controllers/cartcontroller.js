import userModel from "../models/UserModel.js";


// add to user cart
const AddToCart =async(req,res)=>{
    try {
        let UserData = await userModel.findById({_id:req.body.userId});
        let cartData = await UserData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true,message:"Added to Cart"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
    
}

//remove from user cart
const RemoveFromcart =async(req,res)=>{
    try {
        let UserData = await userModel.findById(req.body.userId);
        let cartData = await UserData.cartData;
        if (cartData[req.body.itemId]>0) {
            cartData[req.body.itemId] -= 1
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed From Cart"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// get item from cart
const getCart = async(req,res)=>{
    try {
        let UserData = await userModel.findById(req.body.userId);
        let cartData = await UserData.cartData;
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

export {AddToCart,RemoveFromcart,getCart}