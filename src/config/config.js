import dotenv from 'dotenv';
dotenv.config();

export default {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    WS: process.env.WS,
    API_URL: process.env.API_URL,
    DB_URI: process.env.DB_URI,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET
};
