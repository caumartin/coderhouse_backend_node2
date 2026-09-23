import express from 'express';
import cookieParser from 'cookie-parser';
import { env } from './config/env.js';
import rootRouter from './routes/root.router.js';
import userRouter from './routes/user.router.js';
import ticketRouter from './routes/ticket.router.js';
import eventRouter from './routes/event.router.js';
import sessionRouter from './routes/session.router.js';

const app = express();

app.use(express.json());
app.use(cookieParser(env.COOKIE_SECRET));

app.use('/', rootRouter);
app.use('/api/users', userRouter);
app.use('/api/tickets', ticketRouter);
app.use('/api/events', eventRouter);
app.use('/api/sessions', sessionRouter);


export default app;

