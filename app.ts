import express from 'express';
import http from 'http';
import { teachersAuthRouter } from './routes/auth/teachers';
import { studentsRouter } from './routes/students';

const app = express();

const port = process.env.PORT;

app.use(express.json());

app.use('/auth', teachersAuthRouter);

app.use('/students', studentsRouter);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
