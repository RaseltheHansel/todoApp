import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/db';
import authRoutes from './routes/authRoute'
import todoRoutes from './routes/todoRoute'

const app: Application = express();

//connect to mongodb
connectDB();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

//test route
app.get('/', (_req, res) => {
    res.send('Todo App API is running');
});

const PORT = parseInt(process.env.PORT ?? '5000', 10);
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
