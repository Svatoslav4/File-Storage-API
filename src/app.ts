import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import fileRoutes from '@/models/file/file.routes';
import { errorMiddleware } from '@/middlewares/error.middleware';
import { apiLimiter } from '@/middlewares/rateLimit.middleware';
import { swaggerSpec } from '@/docs/swagger';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(apiLimiter);

app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'File Storage API Running',
  });
});

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec),);
app.use('/api/files', fileRoutes);

app.use(errorMiddleware);

export default app;