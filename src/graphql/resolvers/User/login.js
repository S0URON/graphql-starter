import { GraphQLError } from 'graphql';
import Joi from 'joi';
import User from "../../../models/user.model"
import * as authGuard from "../../../services/authGuard"

export async function signIn(_, {input}, ___) {
    try {
        const body = {
            email: input.email,
            password: input.password
        };
        // validation
        const BodySchema = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().min(8).required()
        });
        const { error } = BodySchema.validate(body);
        if (error && error.details) {
            throw new GraphQLError("invalid_input_data")
        }

        // check if email/pseudo exists
        const user = await User.findOne({ email: body.email.toLowerCase() });

        if (!user) {
            throw new GraphQLError("user_not_found")
        }
        // check password is correct
        if (!user.checkPassword(body.password)) {
            throw new GraphQLError("wrong_password")
        }
        // generate new access token
        const accessToken = await authGuard.signAccessToken(user);

        return {
            token: accessToken
        }

    } catch (error) {
        throw new GraphQLError(error);
    }
}