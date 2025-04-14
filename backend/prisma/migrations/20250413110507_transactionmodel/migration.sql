-- CreateEnum
CREATE TYPE "TransactionsType" AS ENUM ('EXPENSE', 'INCOME');

-- CreateEnum
CREATE TYPE "TransactionsCategory" AS ENUM ('FOOD', 'SALARY', 'TRANSPORT', 'SHOPPING', 'ENTERTAINMENT', 'HEALTH', 'OTHER');

-- CreateTable
CREATE TABLE "Transactions" (
    "id" SERIAL NOT NULL,
    "type" "TransactionsType" NOT NULL DEFAULT 'INCOME',
    "description" TEXT NOT NULL,
    "category" "TransactionsCategory" NOT NULL DEFAULT 'OTHER',
    "date" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);
