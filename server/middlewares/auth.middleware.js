import AppError from "../utils/AppError.js";
import jwt from 'jsonwebtoken'
const isLoggedIn = async(req,res,next)=>{
    try {
        const {token} = req.cookies;
        if(!token){
            return next (new AppError('user not authorized plaese login',510))
        }
        const userDetails = await jwt.verify(token,'BPYG2uaGqbm2od3ZbYVPqHc/+WZ5X32OL8XP0hXEI58=')
        req.user = userDetails;
        next();
    } catch (error) {
        console.log(error)
        return next(new AppError(error.message,500))
    }
}


const authorizedRole =(...roles)=> async(req,res,next)=>{
    const currentrole = req.user.role;
    if(!roles.includes(currentrole)){
        return next(new AppError('You are not allowed ',500));
    }
    next();
}

export {
    isLoggedIn,
    authorizedRole
}