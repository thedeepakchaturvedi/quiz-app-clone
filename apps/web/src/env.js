import { parseEnv, z } from 'znv';

export const { VITE_APP_API_URL } = parseEnv(import.meta.env, {
    VITE_APP_API_URL: {
        schema: z.string().url().default('http://localhost:8000'),
        description: 'Backend API URL',
    },
});
