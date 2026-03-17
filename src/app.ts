import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import categoriesRoutes from './routes/category.route';
import productRoutes from './routes/product.routes';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use("uploads", express.static(path.join(__dirname, "../uploads")));

app.use('/api/auth', authRoutes)
app.use("/api/categories", categoriesRoutes);
app.use("/api/products", productRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

export default app;