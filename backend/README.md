Prerequisites

- Node.js installed

Installation

Install dependencies:
   npm install

Database Setup

1. Create a .env file in the root directory and set your PostgreSql database credentials:
   DATABASE_URL=postgresql://user:password@localhost:5432/database
   Replace user, password, and database with your PostgreSql credentials.
2. copy env variables of env.example file located in the root directory into the .env file

To start the application in run following command

docker-compose up --build

If you set env PORT variable the application will be served at http://localhost:PORT host otherwise at http://localhost:5000.
