import Joi from "joi";

const paymentValidationSchema = Joi.object({
    ticketId: Joi.number().required(),
    cardData: Joi.object({
        issuer: Joi.string().max(30).required(),
        number: Joi.string().max(16).required(),
        name: Joi.string().max(70).required(),
        expirationDate: Joi.date().required(),
        cvv: Joi.string().max(3).required()
    }).required()
})

export {paymentValidationSchema}