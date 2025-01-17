# Logistics Service - Node.js

This repository contains an logistics service built using Node.js. It provides a scalable and secure solution for handle many logistic activities like create, update, track, and get data shipment.

---

## Features

- **Create Shipment**: Allow users to create shipment data including sender, receiver, dan detail.
- **Update Shipment Status**: Allow users to update the shipment status.
- **Track Shipment**: Getting the detail info of shipment datas based on tracking number.
- **Get Shipment**: Getting all of shipment data by user.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/lfnsyhd/logistics-service
   ```

2. Navigate to the project directory:
   ```bash
   cd logistics-service
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

4. Set up environment variables:
   Replace `.env-example` to `.env` and configure the variable

5. Set up database:
   Create new database `logistics_db` or anything else based on `DB_NAME` in `.env` file.

### Running the App

1. Start the development server:
   ```bash
   node server.js

2. Open your browser and navigate to:
   ```
   http://localhost:5007
   ```

3. For the purpose of API documentation, here is the link:
   ```
   http://localhost:5007/api-docs
   ```

4. Test the shipmentService:
   ```
   npm test
   ```

---