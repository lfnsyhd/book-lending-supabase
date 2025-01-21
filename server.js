const express = require('express');
const dotenv = require('dotenv');
// const shipmentRoutes = require('./routes/shipmentRoutes');
const lendingRoutes = require('./routes/lendingRoutes');
const bookRoutes = require('./routes/bookRoutes');
const sequelize = require('./config/database');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swaggerConfig');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/lending', lendingRoutes);
app.use('/books', bookRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

if (process.env.NODE_ENV !== 'test') {
  sequelize.sync({ force: false }).then(() => {
      app.listen(process.env.PORT, () => {
          console.log(`Server running on port ${process.env.PORT}`);
      });
  });
}