import { GraphQLError } from 'graphql';
import mongoose from 'mongoose';
import Joi from 'joi';
import User from "../../../models/user.model"
import * as mongodb from 'mongodb';


export async function updateUser(_, { input }, { authorizedUser }) {
    try {

        if (!authorizedUser)
            throw new GraphQLError("authorization_required")

        if (!mongodb.ObjectId.isValid(authorizedUser.id)) {
            throw new GraphQLError("invalid_user_id")
        }

        const body = {
            email: input.email,
            firstName: input.firstName,
            lastName: input.lastName
        };

        const BodySchema = Joi.object({
            email: Joi.string()
                .email()
                .optional(),
            firstName: Joi.string()
                .allow(null)
                .optional(),
            lastName: Joi.string()
                .allow(null)
                .optional(),
        });

        const { error } = BodySchema.validate(body);
        if (error && error.details) {
            throw new GraphQLError(error.details)
        }

        if (body.email) {
            const email = await User.findOne({ email: body.email.toLowerCase() })
            if (email)
                throw new GraphQLError("email_already_used")
        }

        const user = await User.findOne({ _id: mongoose.Types.ObjectId(authorizedUser.id) })

        if (!user)
            throw new GraphQLError("user_not_found")

        await User.updateOne({_id:mongoose.Types.ObjectId(authorizedUser.id)},{
            $set : {
                ...body
            }
        })

        return {
            message: "user updated !"
        }

    } catch (error) {
        throw new GraphQLError(error);
    }
}