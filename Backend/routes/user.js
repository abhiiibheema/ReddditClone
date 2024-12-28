import { Router } from 'express';
import { z } from 'zod';
import jwt from 'jsonwebtoken';

import verifyToken from '../middleware/auth.js'; 
import { User } from '../db/index.js';

const userRouter = Router();

// Validation schemas
const signupInput = z.object({
  username: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

const signinInput = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});

// POST: Sign up
userRouter.post('/signup', async (req, res) => {
  const body = req.body;
  const parsedInput = signupInput.safeParse(body);

  if (!parsedInput.success) {
    return res.status(411).json({ message: 'Inputs not correct' });
  }

  try {
    const { username, password, name } = body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const user = new User({ username, password, name });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return res.json({ token });
  } catch (e) {
    console.error(e);
    res.status(500).send('Server Error');
  }
});

// POST: Sign in
userRouter.post('/signin', async (req, res) => {
  const body = req.body;
  const parsedInput = signinInput.safeParse(body);

  if (!parsedInput.success) {
    return res.status(411).json({ message: 'Inputs not correct' });
  }

  try {
    const { username, password } = body;

    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(403).json({ message: 'Incorrect credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ token });
  } catch (e) {
    console.error(e);
    res.status(500).send('Server Error');
  }
});

// GET: Auth check
userRouter.get('/auth', verifyToken, async (req, res) => {
  res.status(200).json({});
});

export default userRouter;
