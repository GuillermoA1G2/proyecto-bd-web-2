import express from 'express';
import mongoose from 'mongoose';
import {
  logErrors,
  errorHandler,
  boomErrorHandler
} from './middlewares/error.handler';
import routerApi from './routes';
import { config } from './config/config';
import passport from 'passport';
import './utils/auth';

const { mongoUri, port } = config;

const app = express();
app.use(express.json());

// Conectar a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Could not connect to MongoDB', error);
    process.exit(1); // Salir del proceso con un código de error
  }
};

app.use(passport.initialize());
routerApi(app);

// Middlewares de manejo de errores
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

// Iniciar la aplicación después de conectar a la base de datos
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
});
