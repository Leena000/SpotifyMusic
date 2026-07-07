// Imports the user model for reading and saving users in MongoDB.
const userModel = require('../models/user.model');

// Imports JWT for creating login/register tokens.
const jwt = require('jsonwebtoken');

// Imports bcrypt for hashing and comparing passwords securely.
const bcrypt = require('bcryptjs');

// Handles new user registration.
async function handleUserRegistration(req, res) {
    // Gets user details from the request body. If role is not sent, it defaults to user.
    const {username, email, password, role = 'user'} = req.body;

    // Checks whether another user already has the same username or email.
    const isUserAlreadyExist = await userModel.findOne({
        $or: [{username}, {email}]
    });

    // Stops registration if the user already exists.
    if(isUserAlreadyExist){
        return res.status(409).json({message: 'User Already Exists'});
    }

    // Hashes the password before saving it to MongoDB.
    const hash = await bcrypt.hash(password, 10);

    // Creates the new user document in MongoDB.
    const newUser = await userModel.create({
        username,
        email,
        password: hash,
        role
    });

    // Creates a JWT token containing the user id and role.
    const token = jwt.sign({
    id: newUser._id,
    role: newUser.role
},process.env.JWT_SECRET);

// Stores the token in a cookie so protected APIs can verify the user later.
res.cookie('token', token)

// Sends a successful registration response without exposing the hashed password.
res.status(201).json({message: 'User Registered Sucessfully', 
    newUser:{
    id: newUser._id,
    username: newUser.username,
    email: newUser.email,
    role: newUser.role}
})} 

// Handles user login.
async function handleUserLogin(req, res){
      // Gets login details from the request body.
      const {username, email, password}= req.body;

      // Finds the user by username or email.
      const user = await userModel.findOne({
        $or: [{username}, {email}]
      });

      // Stops login if no matching user is found.
      if(!user){
        return res.status(404).json({message:'User Not Found'});
      }
    
        // Compares the plain password with the hashed password stored in MongoDB.
        const isPasswordValid = await bcrypt.compare(password, user.password);
      
        // Stops login if the password is incorrect.
        if(!isPasswordValid){
            return res.status(401).json({message:'Invalid Password'});
        }

        // Creates a JWT token for the logged-in user.
        const logintoken = jwt.sign({
            id: user._id,
            role: user.role
         }, process.env.JWT_SECRET);

         // Stores the login token in a cookie.
         res.cookie("token", logintoken);

         // Sends the logged-in user's safe details back to the client.
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

// Handles user logout.
async function handleUserLogout(req, res){
            // Removes the authentication cookie from the browser/Postman client.
            res.clearCookie('token');

            // Sends logout confirmation.
            res.status(200).json({message: 'Logout Successful'});
         }

// Exports controller functions for auth.routes.js.
module.exports = {handleUserRegistration, handleUserLogin, handleUserLogout};
