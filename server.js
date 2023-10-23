import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import corsOptions from './config/corsOptions.js';
import connectDb from './config/connectDb.js';
import mongoose from 'mongoose';
import AuthRoutes from './routes/authRoutes.js';
import PostRoutes from './routes/postRoutes.js';
import CommentRoutes from './routes/commentRoutes.js';


dotenv.config();
connectDb();

const app = express();
const PORT = process.env.PORT;

// middlewares
app.use(cors(corsOptions))
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: "Server is up and running" });
})

app.use('/auth', AuthRoutes);
app.use('/post', PostRoutes);
app.use('/comment', CommentRoutes);

mongoose.connection.once('open', () => {
    console.log('Connected To DB');
    app.listen(PORT, () => {
        console.log(`Listening on PORT ${PORT}`);
    })
})
