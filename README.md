# not-reddit, a reddit clone

🚧 **Work in progress**

Reddit clone built with the PERN stack (PostgreSQL, Express, React, Node.js).

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
npm run start
```

5. To start the server:

```bash
cd backend
npm run start
```

## Environment variables

You will need to create a `.env` file in the `backend` folder (`backend/.env`) with the following variables:
- `DB_USER`
- `DB_PASSWORD`
- `DB_HOST`
- `DB_PORT`
- `DB_DATABASE`
