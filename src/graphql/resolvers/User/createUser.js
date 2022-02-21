import { GraphQLError } from 'graphql';
import mongoose from 'mongoose';
import Joi from 'joi';
import User from "../../../models/user.model"

export async function createUser(_, { input }, ___) {
    try {
        const body = {
            email: input.email,
            password: input.password,
            firstName: input.firstName,
            lastName: input.lastName,
            role: input.role
        };

        const BodySchema = Joi.object({
            email: Joi.string()
                .email()
                .required(),
            password: Joi.string()
                .min(8)
                .required(),
            firstName: Joi.string()
                .allow(null)
                .required(),
            lastName: Joi.string()
                .allow(null)
                .required(),
            role: Joi.string()
                .required(),
        });

        const { error } = BodySchema.validate(body);
        if (error && error.details) {
            throw new GraphQLError("invalid_input_data")
        }

        const userEmail = await User.findOne({
            email: body.email.toLowerCase()
        })

        if (userEmail)
            throw new GraphQLError("email_already_used")

        const newUser = {
            _id: new mongoose.Types.ObjectId(),
            email: body.email,
            password: body.password,
            firstName: body.firstName,
            lastName: body.lastName,
            role: body.role
        }

        await User.create(newUser);

        return {
            message: "user created !"
        }

    } catch (error) {
        throw new GraphQLError(error);
    }
}