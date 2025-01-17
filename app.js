const express = require('express');
const shipmentRoutes = require('./routes/shipmentRoutes');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/shipments', shipmentRoutes);

module.exports = app;
