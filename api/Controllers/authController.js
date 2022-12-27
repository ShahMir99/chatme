import User from "../Models/userModel.js";
import jwt from "jsonwebtoken"

export const register = async (req, res) => {

  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json("please Fill The Complete Form")
    }
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json("User Already Exist");
    }

    const user = await User.create(req.body);
    const token = await user.generateJwtToken()

    res.status(201).json({...user._doc , token});
  } catch (err) {
    res.status(500).send(err);
  }
};

export const login = async (req, res) => {
  try{
    const {email , password} = req.body;

    if(!email || !password){
      return res.status(400).json("please Fill The Complete Form");
    }
    
    const findUser = await User.findOne({email});

    if(!findUser){
      return res.status(404).json("Invalid Credentials")
    }
    if(findUser.password !== password){
       res.status(404).json("Invalid Password")
    }else{

      const token = await findUser.generateJwtToken()

      res.status(201).json({...findUser._doc , token})
    }


  }catch(err){
    res.status(500).send(err);
  }
};


export const allUsers = async (req, res) => {
  try{
    const keyword = req.query.search ? {
      name : {$regex : req.query.search , $options : "i"}
    } : {};

    // for Autharization
    
    const findUser = await User.find(keyword).find({_id : {$ne : req.user._id}})
    res.status(201).json(findUser)
    
  }catch(err){
    res.status(500).send(err);
  }
}