import dotenv from 'dotenv';

dotenv.config();

export default {
    MONGO_URL: process.env.MONGO_URL,
    APP_URL : process.env.APP_URL || 'localhost',
    APP_PORT: process.env.APP_PORT || 3001,
    JWT_SECRET: process.env.JWT_SECRET || 'secret',
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1day'
}