const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
async function registerUser(req, res) {
    const {username, email, password, role = 'user'} = req.body;
    const isUserAlreadyExist = await userModel.findOne({
        $or: [{username}, {email}]
    });
    if(isUserAlreadyExist){
        return res.status(409).json({message: 'User Already Exists'});
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
        username,
        email,
        password: hash,
        role
    });
    const token = jwt.sign({
    id: newUser._id,
    role: newUser.role
},process.env.JWT_SECRET);
res.cookie('token', token)
res.status(201).json({message: 'User Registered Sucessfully', 
    newUser:{
    id: newUser._id,
    username: newUser.username,
    email: newUser.email,
    role: newUser.role}
})} 
    async function loginUser(req, res){
      const {username, email, password}= req.body;
      const user = await userModel.findOne({
        $or: [{username}, {email}]
      });
      if(!user){
        return res.status(404).json({message:'User Not Found'});
      }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
      
        if(!isPasswordValid){
            return res.status(401).json({message:'Invalid Password'});
        }
        const logintoken = jwt.sign({
            id: user._id,
            role: user.role
         }, process.env.JWT_SECRET);
         res.cookie("token", logintoken);
         res.status(200).json({
            message: 'Login Sucessful',
            user:{
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
         })
         

        } 
        async function logoutUser(req, res){
            res.clearCookie('token');
            res.status(200).json({message: 'Logout Successful'});
         }



module.exports = {registerUser, loginUser, logoutUser};