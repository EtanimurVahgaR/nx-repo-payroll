import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
<<<<<<< HEAD
import authRoutes from './routes/authRoutes';
import employeeRoutes from './routes/employeeRoutes';
=======
import authRoutes from './routes/auth';
import employeeRoutes from './routes/employee';

>>>>>>> authentication
const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 8080;

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
<<<<<<< HEAD
    origin: ['http://localhost:3000'],
=======
    origin: `http://localhost:3000`,
>>>>>>> authentication
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.use('/api/auth', authRoutes);
app.use('/api/employee', employeeRoutes);

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});


