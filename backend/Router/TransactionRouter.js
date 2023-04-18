"use strict";

const express = require("express");
const transactionRouter = express.Router();

// init auth
const { auth } = require("../Middleware/Auth");

// init controller
const {
  TransactionController,
} = require("../Controller/TransactionController");

// endpoint router

// menampilkan data
transactionRouter.get("/transaction", auth ,TransactionController.ShowAllTransactionsController);

// detail transaksi
transactionRouter.get("/transaction/:id", TransactionController.ShowTransationByIdController);

// membuat pesanan
transactionRouter.put("/transaction/:id", auth, TransactionController.UpdateStatusTransactionController)

module.exports = { transactionRouter };
