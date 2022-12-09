import express from 'express';
import http from 'http';
import { studentsRouter } from './routes/students';

const app = express();

const port = process.env.PORT;

app.use('/students', studentsRouter);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
