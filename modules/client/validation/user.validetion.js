const Joi = require('joi');

module.exports = {

    proflie:{
        file:Joi.object(),
        body:Joi.object().required().keys({
            username :Joi.string().$.min(3).max(20).rule({message:"firstName must be between 3 and 20"}),
            phone:Joi.string().optional().pattern(new RegExp('^[0-9]{11}$')).messages({"number.phone":" phone is first 01",}),
            imgUser:Joi.string(),
            location:Joi.string().$.min(0).max(120).rule({message:"location must be between 0 and 120"}),
            email:Joi.string().email({tlds: { allow: ['com', 'net','in'] }}).messages({"string.email":" email is required",}),
            password:Joi.string().optional().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/).rule({message:"password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters"}),
            
        })
        
    },
    PasswordUpdate:{
        body:Joi.object().required().keys({
            oldpassword:Joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/).rule({message:"oldpassword must contain at least eight characters, at least one number and both lower and uppercase letters and special characters"}),
            newPassword:Joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/).rule({message:"newPassword must contain at least eight characters, at least one number and both lower and uppercase letters and special characters"}),
            cPassword:Joi.any().equal(Joi.ref('newPassword'))
            .required()
            .label('Confirm password')
            .messages({ 'any.only': '{{#label}} does not match' })
        })
    },
    
    AddReporT:{
        body:Joi.object().required().keys({
            Comment:Joi.string().required(),
            PostWriterID:Joi.string().required().$.min(24).max(24).rule({message:"userID required  or not available"}),
            postID:Joi.string().required().$.min(24).max(24).rule({message:"postID required  or not available"}),
            createByReport:Joi.string().required().$.min(24).max(24).rule({message:"postID required  or not available"})
        })

    }
}