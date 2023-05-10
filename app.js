import express from 'express';
import userRoutes from './routes/userRoutes.js';
import UserData from './db.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('UserData', UserData);
app.use('/api/users', userRoutes);
app.all('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
  });
});
export default app;
