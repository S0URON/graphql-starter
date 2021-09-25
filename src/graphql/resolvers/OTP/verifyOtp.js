import { GraphQLError } from 'graphql';
import fetch from 'node-fetch';
import config from '../../../config/config';

export async function verifyOtp(_,{phoneNum, verifyCode},___) {
    try {
        const body = {
            phoneNum,
            verifyCode
        }
        const url = `${config.API_URL}/otp/verify`;

        const response = await fetch(encodeURI(url), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if (response.status >= 400) {
            throw new GraphQLError(data.message);
        }

        return data

    } catch (error) {
        throw new Error(error);
    }
}