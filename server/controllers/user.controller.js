import User from "../config/model/user.model.js";
import AppError from "../utils/AppError.js";
import cloudinary from 'cloudinary'
import crypto from 'crypto'
const cookieOption = {
    maxAge:7*24*60*60*1000,
    httpOnly:true,
    secure:true
}

const register = async(req,res,next)=>{
    try {
        
        const {fullName,email,password,number} = req.body;
    
        if(!fullName||!email||!password||!number){
            return next(new AppError('all fields are required',500))
        }
        const userExists = await User.findOne({email})
        if(userExists){
            return next(new AppError('try again',500))
        }
        const user = await User.create({
            fullName,
            email,
            password,
            number,
            avatar:{
                public_id:email,
                secure_url:'cloudinary://916367985651227:kWEPTClb0C0UOAsICG1sGTrg7qE@deafm48ba'
            }
        })
        
        if(!user){
            return next(new AppError('user not created',500))
        }

        if(req.file){
            try {
                
                const result = await cloudinary.v2.uploader.upload(req.file.path,{
                    folder:'SERVER',
                    widht:250,
                    height:250,
                    gravity:'faces',
                    crop:'fill'
                })
                if(result){
                    user.avatar.public_id = result.public_id
                    user.avatar.secure_url = result.secure_url
                    await user.save()
                }
            } catch (error) {
                return next(new AppError(error.message,500))
            }
        }
    
        user.password = undefined;
        
        const token = await user.generateJWTToken()
        res.cookie('token',token,cookieOption)
        return res.status(200).json({
            success:true,
            message:'user registered succesfully',
            user
        })
    } catch (error) {
        return next(new AppError(error.message,500))
    }
}
const login = async(req,res,next)=>{
    try {
        
        const {email,password} = req.body;
    
        if(!email||!password){
            return next(new AppError('all fields are required',503))
        }
        const user = await User.findOne({email}).select('+password')
        if(!user || !user.comparePassword){
            return next(new AppError('user not found ',501))
        }
    
        const token = user.generateJWTToken()
        res.cookie('token',token,cookieOption)
    
        return res.status(200).json({
            success:true,
            message:'user logged in succesfully',
            user
        })
    } catch (error) {
        console.log(error)
        return next(new AppError(error.message,502))
    }
}

const logout = async(req,res,next)=>{
    res.cookie('token',null,{
        httpOnly:true,
        secure:true,
        maxAge:0
    })

    res.status(200).json({
        success:true,
        message:'user logged out succesfully'
    })
}
const myprofile = async(req,res,next)=>{
    try {
        
        const id = req.user.id;
    
        const user =await User.findById(id)
        if(!user){
            return next(new AppError('user not found',503));
        }
    
        return res.status(200).json({
            success:true,
            message:'user profile',
            user
        })
    } catch (error) {
        console.error(error);
        return next(new AppError(error.message,504))
    }
}

const forgotPassword = async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return next(new AppError('user not found',500));
    }
    const forgotPassword = user.getresetpasswordtoken()

    await user.save({validateBeforeSave:false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset${forgotPassword}`
    const message= `your password reset token is :- \n\n ${resetPasswordUrl}`

    try {
        await sendEmail({
            email:user.email,
            subject:'Password Recovery',
            message,
        });
        res.status(200).json({
            success:true,
            message:`mail sent to ${user.email} sucessfully` 
        })
    } catch (error) {
        user.forgotpasswordexpiry= undefined
        user.forgotpasswordtoken= undefined
        await user.save({validateBeforeSave:false});
        return next(new AppError(error.message,500))
    }
}

const resetPassword = async(req,res,next)=>{
    const forgotpasswordtoken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex')
    const user = await User.findOne({
        forgotpasswordtoken,
        forgotpasswordexpiry:{$gt:Date.now()},  
    });
    if(!user){
        return next(new AppError('reset passsowr token invalid',500));

    }

    if(req.body.password !==req.body.confirmPassword){
        return next(new AppError('password doesnt match',500));
    }
    user.password = req.body.password;
    user.forgotpasswordexpiry =undefined
    user.forgotpasswordtoken =undefined

    await user.save();

    return res.status(200).json({
        success:true,
        message:'password changed',
        user
    })

}

const updatePassword =async (req,res,next) =>{
    const user = await User.findById(req.user.id).selectO('+password')

    const ispasswordmatch = await user.comparePassword(req.body.oldPassword);

    if(!ispasswordmatch){
        return next(new AppError('password didnt match',501));

    }
    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new AppError('password didnt match',503))
    }
    user.password = req.body.newPassword
    await user.save();  
    return res.status(200).json({
        success:true,
        message:'password updated succesfully',
        user
    })
}

const getSingleUser = async(req,res,next)=>{
    const users = await User.find();

    return res.status(200).json({
        success:true,
        users
    })
}

const getAllUser = async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new AppError('user not found',500));
    }   
    return res.status(200).json( {
        success:true,
        user
    })
}

const deleteuser = async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new AppError('user not found',500))
    }
    await user.remove()

    return res.status(200).json({
        success:true,
        message:'user deleted'
    })
}

export {
    register,
    login,
    logout,
    myprofile,
    forgotPassword,
    resetPassword,
    updatePassword,
    getAllUser,
    getSingleUser
}