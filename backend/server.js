import connectToDatabase from './database/db.js';

import express from 'express';
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

async function startServer() {
  try {
    const database = await connectToDatabase();
    app.locals.database = database;

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  } catch (error) {
    console.error('Unable to start server:', error.message);
    process.exitCode = 1;
  }
}

startServer();
