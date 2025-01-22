import express from 'express';
import dotenv from 'dotenv';
// import shipmentRoutes from './routes/shipmentRoutes';
import lendingRoutes from './routes/lendingRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
// import sequelize from './config/database';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swaggerConfig.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/lending', lendingRoutes);
app.use('/books', bookRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// if (process.env.NODE_ENV !== 'test') {
//   sequelize.sync({ force: false }).then(() => {
      app.listen(process.env.PORT, () => {
          console.log(`Server running on port ${process.env.PORT}`);
      });
//   });
// }

export default app;