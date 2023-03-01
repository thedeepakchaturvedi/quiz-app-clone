import * as dotenv from 'dotenv';
import { parseEnv, port, z } from 'znv';

dotenv.config();

export const { PORT, MONGO_URL } = parseEnv(process.env, {
    MONGO_URL: {
        schema: z.string().url().default('mongodb://localhost:27017/quiz'),
        description: 'MongoDB database URL',
    },

    PORT: port().default(8000),
});
