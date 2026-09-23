import {config} from 'dotenv';

config();

export const env = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    COOKIE_SECRET: process.env.COOKIE_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    NODE_ENV: process.env.NODE_ENV || 'development'
}