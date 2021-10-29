const Joi = require('joi');

module.exports = {
    // !  ===> addUser <==== //
    signINValidate:{
        body:Joi.object().required().keys({
            username :Joi.string().required().$.min(3).max(20).rule({message:"firstName must be between 3 and 20"}),
            phone:Joi.string().pattern(new RegExp('^[0-9]{11}$')).messages({"number.phone":" phone is first 01",}),
            location:Joi.string().$.min(0).max(120).rule({message:"location must be between 0 and 120"}),
            email:Joi.string().required().email({tlds: { allow: ['com', 'net','in','ru'] }}).messages({"string.email":" email is required",}).trim(),
            password:Joi.string().required().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/).rule({message:"password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters"}),
            cPassword:Joi.any().equal(Joi.ref('password'))
            .required()
            .label('Confirm password')
            .messages({ 'any.only': '{{#label}} does not match' }),
            roles:Joi.string().optional(),
            imgUser:Joi.string()
        })
    },
    // !  ===> logIn <==== //
    logInValidate:{
        body:Joi.object().required().keys({
            email:Joi.string().required().email({tlds: { allow: ['com', 'net','in'] }}).messages({"string.email":" email is required",}).trim(),
            password:Joi.string().required().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/).rule({message:"password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters"})
        })
    }
}