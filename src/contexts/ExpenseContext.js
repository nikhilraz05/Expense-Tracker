import React, { createContext, useState, useEffect } from 'react';

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    setTransactions(savedTransactions);
    calculateFinancialSummary(savedTransactions);
  }, []);

  useEffect(() => {
    calculateFinancialSummary(transactions);
  }, [transactions]);

  const calculateFinancialSummary = (transactions) => {
    const totalIncome = transactions
      .filter((transaction) => transaction.type === 'Income')
      .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);

    const totalExpenses = transactions
      .filter((transaction) => transaction.type === 'Expense')
      .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);

    const newBalance = totalIncome - totalExpenses;

    setIncome(totalIncome);
    setExpenses(totalExpenses);
    setBalance(newBalance);
  };

  const addTransaction = (newTransaction) => {
    newTransaction.amount = parseFloat(newTransaction.amount);
    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  };

  const deleteTransaction = (index) => {
    const updatedTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  };

  const editTransaction = (index, updatedTransaction) => {
    updatedTransaction.amount = parseFloat(updatedTransaction.amount);
    const updatedTransactions = [...transactions];
    updatedTransactions[index] = updatedTransaction;
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  };

  return (
    <ExpenseContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        editTransaction,
        income,
        expenses,
        balance,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
