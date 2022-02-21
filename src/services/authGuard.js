import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/user.model';
import config from '../config/config';
import { GraphQLError } from 'graphql';

export function signAccessToken(user) {
    return jwt.sign({
        uid: user.id,
        role: user.role.toLowerCase()
    }, config.ACCESS_TOKEN_SECRET);
}

export async function verifyAccessToken(authorization) {

    const token = authorization.split(' ')[1];
    if (!token) {
        throw new GraphQLError("required_token")
    }
    let authorizedUser = null;
    return jwt.verify(token, config.ACCESS_TOKEN_SECRET, async (err, payload) => {
        if (err) {
            throw new GraphQLError("unknown_error_occured")
        }

        // check if user exists
        const user = await User.findOne({
            _id: mongoose.Types.ObjectId(payload.uid)
        });

        if (!user) {
            throw new GraphQLError("access_denied")
        }

        authorizedUser = {
            id: user.id,
            role: user.role
        }
        return authorizedUser;
    });
}
