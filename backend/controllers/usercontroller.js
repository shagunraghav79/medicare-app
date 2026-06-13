import userModel from "../models/usermodel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"



// login user

const loginuser=async(req,res)=>{
    const {email,password}=req.body;
    try{
      const user=await userModel.findOne({email});
      
      if(!user){
        return res.json({success:false,message:"user doesn't exists"})
      }
       const isMatch= await bcrypt.compare(password,user.password);
       if(!isMatch){
        return res.json({success:false,message:"invalid credentials"})
       }
      const token = createtoken(user._id);
      res.json({success:true,token})
    }catch(error){
     console.log(error);
     res.json({success:false,message:"error"})
    }

}
// 
    const createtoken =(id)=>{
        return jwt.sign({id},process.env.JWT_SECRET)
    }

// registeruser

const registeruser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check for empty fields
    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "All fields are required"
      });
    }

    // Check if email is valid
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email"
      });
    }

    // Check password strength
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters long"
      });
    }

    // Check if user already exists
    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.json({
        success: false,
        message: "Email already exists"
      });
    }

    // Hash password
    const hashedpassword = await bcrypt.hash(password, 10);

    // Create user
    const newuser = new userModel({
      name,
      email,
      password: hashedpassword
    });

    const user = await newuser.save();

    // Generate token
    const token = createtoken(user._id);

    res.json({
      success: true,
      message: "Registration successful",
      token,
       userId: user._id,
    });

  } catch (error) { 
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};

export {loginuser, registeruser};