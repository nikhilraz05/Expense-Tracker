// src/App.js
import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import './App.css';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const savedIncome = JSON.parse(localStorage.getItem('income')) || 0;
    const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || 0;
    const savedBalance = JSON.parse(localStorage.getItem('balance')) || 0;

    setTransactions(savedTransactions);
    setIncome(savedIncome);
    setExpenses(savedExpenses);
    setBalance(savedBalance);
  }, []);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
    localStorage.setItem('income', JSON.stringify(income));
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('balance', JSON.stringify(balance));
  }, [transactions, income, expenses, balance]);

  return (
    <div className="App">
      <HomePage income={income} expenses={expenses} balance={balance} />
      <TransactionForm 
        transactions={transactions} 
        setTransactions={setTransactions} 
        setIncome={setIncome} 
        setExpenses={setExpenses} 
        setBalance={setBalance} 
      />
      <TransactionList 
        transactions={transactions} 
        setTransactions={setTransactions} 
        setIncome={setIncome} 
        setExpenses={setExpenses} 
        setBalance={setBalance} 
      />
    </div>
  );
};

export default App;
