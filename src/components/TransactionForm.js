// src/components/TransactionForm.js
import React, { useState } from 'react';

const TransactionForm = ({ transactions, setTransactions, setIncome, setExpenses, setBalance }) => {
  const [type, setType] = useState('Income');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTransaction = () => {
    const newTransaction = { type, amount: parseFloat(amount), category, date, description };
    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);

    if (type === 'Income') {
      setIncome(prevIncome => prevIncome + parseFloat(amount));
      setBalance(prevBalance => prevBalance + parseFloat(amount));
    } else {
      setExpenses(prevExpenses => prevExpenses + parseFloat(amount));
      setBalance(prevBalance => prevBalance - parseFloat(amount));
    }

    // Clear form
    setType('Income');
    setAmount('');
    setCategory('');
    setDate('');
    setDescription('');
  };

  return (
    <div className="transaction-form">
      <h2>Add Transaction</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleAddTransaction(); }}>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <input 
          type="number" 
          placeholder="Amount" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Category" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          required 
        />
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default TransactionForm;
