const express = require('express');
const dotenv = require('dotenv');
const shipmentRoutes = require('./routes/shipmentRoutes');
const sequelize = require('./config/database');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swaggerConfig');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/logistics', shipmentRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

if (process.env.NODE_ENV !== 'test') {
  sequelize.sync().then(() => {
      app.listen(process.env.PORT, () => {
          console.log(`Server running on port ${process.env.PORT}`);
      });
  });
}