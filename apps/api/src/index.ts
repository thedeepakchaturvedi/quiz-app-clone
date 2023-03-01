import mongoose from 'mongoose';
import { MONGO_URL, PORT } from './env';

import server from './server';
import swaggerDocs from './utils/swagger';

(async function () {
    try {
        await mongoose.set('strictQuery', false).connect(MONGO_URL);
        console.log('Connected to DB successfully!');

        server.listen(PORT, () => {
            console.log(`Server listening on http://localhost:${PORT}/`);
            swaggerDocs(server, PORT);
        });
    } catch (err: any) {
        console.log('Error starting the server!', err.message);
        process.exit(0);
    }
})();
