import { GraphQLError } from 'graphql';
import mongoose from 'mongoose';
import Joi from 'joi';
import User from "../../../models/user.model"
import * as mongodb from 'mongodb';


export async function deleteUser(_, { input }, { authorizedUser }) {
    try {

        const body = {
            userId: input.userId
        };

        const BodySchema = Joi.object({
            userId: Joi.string()
                .required()
        });

        const { error } = BodySchema.validate(body);
        if (error && error.details) {
            throw new GraphQLError(error.details)
        }

        if (!authorizedUser)
            throw new GraphQLError("authorization_required")

        if (!mongodb.ObjectId.isValid(authorizedUser.id)) {
            throw new GraphQLError("invalid_user_id")
        }

        if (!mongodb.ObjectId.isValid(input.userId)) {
            throw new GraphQLError("invalid_user_id")
        }

        if (authorizedUser.role !== "ADMIN")
            throw new GraphQLError("unauthorized_operation")

        const adminUser = await User.findOne({ _id: mongoose.Types.ObjectId(body.userId) })

        if (!adminUser)
            throw new GraphQLError("user_not_found")

        const user = await User.findOne({ _id: mongoose.Types.ObjectId(body.userId) })

        if (!user)
            throw new GraphQLError("user_not_found")

        await User.deleteOne({ _id: mongoose.Types.ObjectId(body.userId) })

        return {
            message: "user deleted !"
        }

    } catch (error) {
        throw new GraphQLError(error);
    }
}