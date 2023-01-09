# Backend code

This folder contains the backend/server code.

## Prerequisites

- PostgreSQL 15

## Dependencies

- bcrypt
- cors
- dotenv
- express
- express-validator
- jsonwebtoken
- morgan
- pg
- swagger-ui-express

## Dev dependencies

- nodemon

## Folder structure

- `auth`: contains utilities related to authentication/authorization
- `db`: contains the connection to PostgreSQL and database schemas
- `middleware`: contains middleware functions
- `routes`: contains code related to routing

## API

To view the API documentation, run `npm start` and open `http://localhost:3001/api-docs` in a web browser.

The Swagger UI is auto-generated, based on `swagger.json`.
