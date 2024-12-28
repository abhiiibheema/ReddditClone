import express from 'express';
import cors from 'cors';
// import dotenv from 'dotenv';
import userRouter from './routes/user.js';
import OrgRouter from './routes/org.js';


// dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/users', userRouter);
app.use("/test/orgs", OrgRouter);


// Default route
app.get('/', (req, res) => {
  res.send('Welcome to your Express application!');
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
