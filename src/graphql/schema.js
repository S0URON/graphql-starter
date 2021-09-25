import { gql } from 'apollo-server-express';

const typeDefs = gql`
    scalar JSON

    schema {
        query: Query
    }

    type Query {
        """
        Possible errors:
        - invalid_input_data
        - unknown_error_occurred
        """
        getOtp(phoneNum: String!): GetOtpRes!
        """
        Possible errors:
        - invalid_input_data
        - unknown_error_occurred
        """
        verifyOtp(phoneNum: String!, verifyCode: String!): GetOtpRes!
        """
        Possible errors:
        - invalid_input_data
        - unknown_error_occurred
        """
        resendOtp(phoneNum: String!,verification_sid: String!, verification_service_sid: String!): GetOtpRes!
    }
    type GetOtpRes {
        verification: String!
        verification_sid: String!
        verification_service_sid: String!
    }
    
    enum VerificationStatus {
        approved
        canceled
        expired
        pending
    }
`;
module.exports = typeDefs;
