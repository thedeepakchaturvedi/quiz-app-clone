import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import errorHandler from './middleware/errorHandler';
import { quizRoute, submissionRoute } from './routes';

const app = express();

app.use(helmet())
    .use(helmet.hidePoweredBy())
    .use(morgan('dev'))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(cors());

app.get('/', (_, res) => {
    return res.status(200).json({
        message: 'Hello World!',
    });
});

app.use('/quiz', quizRoute);
app.use('/submit', submissionRoute);

app.use(errorHandler);

export default app;
