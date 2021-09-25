import { GraphQLError } from 'graphql';
import fetch from 'node-fetch';
import config from '../../../config/config';

export async function resendOtp(_,{phoneNum, verification_sid, verification_service_sid},___) {
    try {
        const body = {
            phoneNum,
            verification_sid,
            verification_service_sid
        }
        const url = `${config.API_URL}/otp/resend`;

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