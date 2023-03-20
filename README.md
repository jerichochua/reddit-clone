# not-reddit, a reddit clone

Reddit clone built with the PERN stack (PostgreSQL, Express, React, Node.js).

## Features

- Login, signup (JWT)
- Create, delete posts
- Create, edit, delete comments
- View own/other user's posts (profile page)
- Backend API (with Swagger documentation)

### Not yet implemented/to-do

- Voting (endpoints created but not implemented on frontend yet)
- Use MVC pattern

## Set up

1. Clone this repository, and enter the `reddit-clone` directory:

```bash
git clone https://github.com/jerichochua/reddit-clone.git
cd reddit-clone
```

2. Enter the `frontend` folder and install dependencies:

```bash
cd frontend
npm install
```

3. Enter the `backend` folder and install dependencies:

```bash
cd backend
npm install
```

4. To start the client:

```bash
cd frontend
npm start
```

Your browser will open `http://localhost:3000/` automatically.

5. To start the server:

```bash
cd backend
npm start
```

Use `http://localhost:3001/` to make API calls.

Alternatively, if you have Docker, run `docker compose up` to create a Docker container for the backend.

## Testing

Testing for both frontend and backend use the `jest` package.

### Frontend

```bash
cd frontend
npm test
```

### Backend

```bash
cd backend
npm test
```

You can also run tests in watch mode, by running `npm run test:watch` instead.

To gather coverage data, run `npm run coverage`.

A test database needs to be created with the same schema as the normal database. The test data can be found in `backend/db/test_data.sql`.

## Environment variables

You will need to create a `.env` file in the `backend` folder (`backend/.env`) with the following variables:
- `DB_USER`
- `DB_PASSWORD`
- `DB_HOST`
- `DB_PORT`
- `DB_DATABASE`
- `DB_TEST_DATABASE`
- `JWT_SECRET`
