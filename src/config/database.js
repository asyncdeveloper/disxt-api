import config from '../config/config';
import { connect } from 'mongoose';

export default async () => {
    try {
        const databaseUrl = config.MONGO_URL;
        const options = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        };
        return await connect(databaseUrl, options);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};