require('dotenv').config();
import express from 'express';
import http from 'http';
import { authRouter } from './routes/auth';
import { studentsRouter } from './routes/students';
import { teachersRouter } from './routes/teachers';

const app = express();

const port = process.env.PORT;

app.use(express.json());

app.use('/auth', authRouter);

app.use('/students', studentsRouter);

app.use('/teachers', teachersRouter);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
