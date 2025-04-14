// require('dotenv').config();
import express from "express";

import { PrismaClient } from '../generated/prisma/index.js';


const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// Simple route
app.get('/', (req, res) => {
  res.send('API is running!');
});

// Example: create a user
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await prisma.user.create({
      data: { name, email },
    });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
