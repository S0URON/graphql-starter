import { GraphQLError } from 'graphql';
import mongoose from 'mongoose';
import User from "../../../models/user.model"
import * as mongodb from 'mongodb';


export async function getUserById(_, __, {authorizedUser}) {
    try {
        
        if (!authorizedUser)
            throw new GraphQLError("authorization_required")
        

        if (!mongodb.ObjectId.isValid(authorizedUser.id)) {
            throw new GraphQLError("invalid_user_id")
        }

        const user = await User.findOne({
            _id: mongoose.Types.ObjectId(authorizedUser.id)
        })

        if (!user)
            throw new GraphQLError("user_not_found")

        return {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
        }

    } catch (error) {
        throw new GraphQLError(error);
    }
}