import express from "express";
import { PrismaClient } from '../generated/prisma/index.js';
import { authenticateToken } from "../middlewares/auth.js";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/income", authenticateToken, async (req, res) => {
  const { description, category, amount, date } = req.body;

  if (!description || !category || !amount) {
    return res
      .status(400)
      .json({ message: "description, category, and amount are required" });
  }

  try {
    const transaction = await prisma.transactions.create({
      data: {
        type: TransactionsType.INCOME,
        description,
        category,
        amount: Number(amount),
        date: date ? new Date(date) : new Date(),
        user: {
          connect: { id: req.user.id },
        },
      },
    });

    res.status(201).json({ message: "Income transaction added", transaction });
  } catch (err) {
    console.error("Error creating transaction:", err);
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/expense", authenticateToken, async (req, res) => {
  const { description, category, amount, date } = req.body;

  if (!description || !category || !amount) {
    return res
      .status(400)
      .json({ message: "description, category, and amount are required" });
  }

  try {
    const transaction = await prisma.transactions.create({
      data: {
        type: TransactionsType.EXPENSE,
        description,
        category,
        amount: Number(amount),
        date: date ? new Date(date) : new Date(),
        user: {
          connect: { id: req.user.id },
        },
      },
    });

    res.status(201).json({ message: "Expense transaction added", transaction });
  } catch (err) {
    console.error("Error creating expense transaction:", err);
    res.status(500).json({ message: "Server error" });
  }
});
// GET /transactions
// GET /transactions?startDate=2025-04-01&endDate=2025-04-16&type=EXPENSE&page=1&limit=10
// date range filters + pagination support in transaction route
router.get("/", authenticateToken, async (req, res) => {
  const { startDate, endDate, type, page = 1, limit = 10 } = req.query;

  const filters = {
    userId: req.user.id,
  };

  // Optional: Filter by type (INCOME or EXPENSE)
  if (type) {
    filters.type = type.toUpperCase(); // just to be safe
  }

  // Optional: Filter by date range
  if (startDate || endDate) {
    filters.date = {};
    if (startDate) filters.date.gte = new Date(startDate);
    if (endDate) filters.date.lte = new Date(endDate);
  }

  try {
    const transactions = await prisma.transactions.findMany({
      where: filters,
      orderBy: {
        date: "desc",
      },
      skip: (page - 1) * limit,
      take: parseInt(limit),
    });

    const total = await prisma.transactions.count({ where: filters });

    res.status(200).json({
      transactions,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res.status(500).json({ message: "Server error" });
  }
});
// POST /transactions/categories
router.post('/categories', authenticateToken, async (req, res) => {
    const { name, type } = req.body;
  
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ message: 'Category name is required and must be a string' });
    }
  
    if (!['INCOME', 'EXPENSE'].includes(type)) {
      return res.status(400).json({ message: 'Type must be either INCOME or EXPENSE' });
    }
  
    try {
      // Check for duplicate in that category type
      const existing = await prisma.transactionCategory.findUnique({
        where: {
          userId_name_type: {
            userId: req.user.id,
            name,
            type
          }
        }
      });
  
      if (existing) {
        return res.status(409).json({ message: 'Category already exists for this type' });
      }
  
      const category = await prisma.transactionCategory.create({
        data: {
          name,
          type,
          user: {
            connect: { id: req.user.id }
          }
        }
      });
  
      res.status(201).json({ message: 'Category created', category });
    } catch (err) {
      console.error('Error creating category:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

export default router;
