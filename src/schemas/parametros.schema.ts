import Joi from "joi";

const name = Joi.string().min(3).max(30);

const campo_1 = Joi.string().min(3).max(30).required();
