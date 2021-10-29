const { valid } = require('joi');
const Joi = require('joi');

module.exports = {

    addPost:{
        body:Joi.object().required().keys({
            title:Joi.string().required().messages({"required.title":" title is required",}),
            desc:Joi.string().required().messages({"required.description":" description is required",}),
            createdBy:Joi.string().required().$.min(24).max(24).rule({message:"id Incorrect or not available"}),
            imgPost:Joi.array()
        }),
        files:Joi.array()
       
    },
    edit:{
        body:Joi.object().required().keys({
            title:Joi.string().optional(),
            desc:Joi.string().optional(),
            idUser:Joi.string().required().$.min(24).max(24).rule({message:"id Incorrect or not available"}),
            imgPost:Joi.array()
        }),
        params:Joi.object().required().keys({
            idPost:Joi.string().required().$.min(24).max(24).rule({message:"id Incorrect or not available"})
        }),
        files:Joi.array()
    },
    paramsID:{
        params:Joi.object().required().keys({
            id:Joi.string().required().$.min(24).max(24).rule({message:"id Incorrect or not available"})
        })
    },
    AddComment:Joi.object().required().keys({
        comment:Joi.string().required().$.min(1).max(120).rule({message:"comment min cractr 1 match 120"}),
        createdBy:Joi.string().required().$.min(24).max(24).rule({message:"id Incorrect or not available"}),
        postID:Joi.string().required().$.min(24).max(24).rule({message:"id Incorrect or not available"})
    }),
    add_Liek:Joi.object().required().keys({
        liek:Joi.string().required(),
        createdBy:Joi.string().required().$.min(24).max(24).rule({message:"id Incorrect or not available"}),
        postID:Joi.string().required().$.min(24).max(24).rule({message:"id Incorrect or not available"})
    })

}