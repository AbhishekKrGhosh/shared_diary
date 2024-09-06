import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js"
import jwt from 'jsonwebtoken'

export const signup = async (req,res,next)=>{
    const {name, email, password} = req.body
    const validUser = await User.findOne({ email });
    if(validUser){
        try {
            const validPassword = bcryptjs.compareSync(password, validUser.password)
            if(!validPassword) return next(errorHandler(401, 'wrong credentials'))
            const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)
            const { password: hashedPassword, ...rest} = validUser._doc
            const expiryTime = new Date(Date.now()+3600000)//1hr
            res
            .cookie('access_token', token, { httpOnly: true, expires: expiryTime} )
            .status(200)
            .json(rest)
        } catch (error) {
            next(error)
        }
    }else{
        const hassedPassword = bcryptjs.hashSync(password, 10)
        const newUser = new User({name, email, password:hassedPassword})
        try {
            const savedUser = await newUser.save();
            const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
      const expiryTime = new Date(Date.now() + 3600000); // 1 hour
      const { password: hashedPassword, ...rest } = savedUser._doc; // Remove password from response

      // Set the token in an HTTP-only cookie and send the response
      res
        .cookie('access_token', token, { httpOnly: true, expires: expiryTime })
        .status(201)
        .json({
          message: 'Account created successfully',
          ...rest,
        });
        } catch (error) {
            next(error)
        }
    }
}

export const signin = async (req, res, next)=> {
    const {email, password} = req.body
    try {
        const validUser = await User.findOne({email})
        if(!validUser) return next(errorHandler(404, 'User not found'))
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if(!validPassword) return next(errorHandler(401, 'wrong credentials'))
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)
        const { password: hashedPassword, ...rest} = validUser._doc
        const expiryTime = new Date(Date.now()+3600000)//1hr
        res
        .cookie('access_token', token, { httpOnly: true, expires: expiryTime} )
        .status(200)
        .json(rest)
    } catch (error) {
        next(error)
    }
}

export const google = async (req, res, next) => {
    try {
        const { name, email, photo } = req.body;

        if (!email || !name) {
            return res.status(400).json({ success: false, message: 'Name and email are required' });
        }

        const user = await User.findOne({ email });

        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: hashedPassword, ...rest } = user._doc;
            const expiryTime = new Date(Date.now() + 3600000); // 1hr
            res.cookie('access_token', token, { httpOnly: true, expires: expiryTime })
               .status(200)
               .json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                profilePicture: photo
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: hashedPassword2, ...rest } = newUser._doc;
            const expiryTime = new Date(Date.now() + 3600000); // 1hr
            res.cookie('access_token', token, { httpOnly: true, expires: expiryTime })
               .status(200)
               .json(rest);
        }
    } catch (error) {
        console.error('Google login error:', error); // Log the error details
        next(error);
    }
}

export const signout = async(req, res)=>{
    res.clearCookie('access_token').status(200).json('SignOut success!')
}