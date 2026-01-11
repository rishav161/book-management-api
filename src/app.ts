import express from 'express';
import morgan from 'morgan';
import bookRoutes from './routes/bookRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', bookRoutes);

app.use(errorHandler);

export default app;
