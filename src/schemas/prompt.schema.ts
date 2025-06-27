import Joi from "joi";

const name = Joi.string().min(3).max(30).required();
const template = Joi.string().min(3).max(2000).required();

export const createPromptSchema = Joi.object({
    name: name.required(),
    template: template.required(),
}).preferences({
    stripUnknown: true,
});

export const updatePromptSchema = Joi.object({
    template: template,
}).preferences({
    stripUnknown: true,
});
