# Book Lending - Node.js

This repository contains an book lending built using Node.js. It provides a scalable and secure solution for handle many book lending activities like create, update, delete of books data, lending list, and list user.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/lfnsyhd/book-lending-service
   ```

2. Navigate to the project directory:
   ```bash
   cd book-lending-service
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
   Create new database `book_lending_db` or anything else based on `DB_NAME` in `.env` file.

6. Import database (optional):
   For example and running purpose, this project already including dumped postgre sql file named `public.sql` and import it into `book_lending_db` database.

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