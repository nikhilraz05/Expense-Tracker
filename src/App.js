import React from 'react';
import { ExpenseProvider } from './contexts/ExpenseContext';
import HomePage from './components/HomePage';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import './App.css';

const App = () => {
  return (
    <ExpenseProvider>
      <div className="App">
        <HomePage />
        <TransactionForm />
        <TransactionList />
      </div>
    </ExpenseProvider>
  );
};

export default App;
