import userModel from "../models/UserModel.js";
import jwt from "jsonwebtoken"
import bcrypt, { genSalt } from "bcrypt"
import validator from "validator"


//login user
const LoginUser = async(req,res)=>{
        const {email,password} =req.body;
        try {
            const user = await userModel.findOne({email})

            if (!user) {
                return res.json({Success:false,message:"user does not exist"})
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.json({Success:false,message:"invalid credentials"})
            }

            const token = createToken(user._id);
            res.json({Success:true,token})

        } catch (error) {
            console.log(error);
            res.json({Success:false,message:"Error"})
        }
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' });
};

// Register user
const RegisterUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const exist = await userModel.findOne({ email });
        if (exist) {
            return res.json({ Success: false, message: "User already exists" });
        }

        // Validate email and password
        if (!validator.isEmail(email)) {
            return res.json({ Success: false, message: "Please enter a valid email" });
        }

        if (password.length < 8) {
            return res.json({ Success: false, message: "Please enter a stronger password" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt); // ✅ add await

        // Create user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();

        // Generate JWT
        const token = createToken(user._id);

        res.json({ Success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ Success: false, message: "Error registering user" });
    }
};

export {LoginUser,RegisterUser}