const joi = require('@hapi/joi')
const resHeandlear = require('../handlers/responseHandler')
 
const validation = async (req,res,next) =>{
    try {
        const Data = joi.object({
            //urs_name : joi.string().required(),
            email : joi.string().email().required(),
           // phone : joi.string().regex(/^\d{3}-\d{3}-\d{4}$/).required(),
            password: joi.string().min(6).max(255).required(),
            //password : joi.string().required(),
            //urs_address : joi.string().required(),
            urs_role :joi.string().valid('buyer', 'seller').required()
           
        })
        await Data.validateAsync(req.body,{allowUnknown:true})
        //console.log('any')
        next()
    }catch (error){
        //console.log('any1')
        resHeandlear.validationErrorHandler(res,error);
    }
}

module.exports = validation 