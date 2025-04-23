// require('dotenv').config();
import express from "express";
import transactionsRouter from "../routes/transRoutes.js"

import { PrismaClient } from '../generated/prisma/index.js';


const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use('/transactions', transactionsRouter);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
