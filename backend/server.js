import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { errorHandler, routeNotFound } from './middleware/errorMiddleware.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors());

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie parser
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send(
    `Server port ${port} üzerinde ve Babamerdan komutasında çalışıyor...`
  );
});

//routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

//middleware
app.use(routeNotFound);
app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server port ${port} üzerinde çalışıyor...`)
);
