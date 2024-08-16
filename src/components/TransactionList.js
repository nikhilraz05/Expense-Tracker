import React, { useContext, useState } from 'react';
import { ExpenseContext } from '../contexts/ExpenseContext';

const TransactionList = () => {
  const { transactions, setTransactions, deleteTransaction, editTransaction } = useContext(ExpenseContext);
  const [editIndex, setEditIndex] = useState(null);
  const [editedTransaction, setEditedTransaction] = useState({
    type: 'Income',
    amount: '',
    category: '',
    date: '',
    description: ''
  });

  // Handle changes in the edit form
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedTransaction(prev => ({ ...prev, [name]: value }));
  };

  // Save the edited transaction
  const handleEditTransaction = () => {
    editTransaction(editIndex, editedTransaction);
    setEditIndex(null);
    setEditedTransaction({
      type: 'Income',
      amount: '',
      category: '',
      date: '',
      description: ''
    });
  };

  return (
    <div className="transaction-list">
      <h2>Transaction History</h2>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            <span>{transaction.date} - {transaction.category} - ${transaction.amount} ({transaction.type})</span>
            <button onClick={() => deleteTransaction(index)}>Delete</button>
            <button onClick={() => {
              setEditIndex(index);
              setEditedTransaction(transaction);
            }}>Edit</button>
          </li>
        ))}
      </ul>

      {editIndex !== null && (
        <div className="edit-form">
          <h3>Edit Transaction</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleEditTransaction(); }}>
            <select name="type" value={editedTransaction.type} onChange={handleEditChange}>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
            <input 
              type="number" 
              name="amount" 
              placeholder="Amount" 
              value={editedTransaction.amount} 
              onChange={handleEditChange} 
              required 
            />
            <input 
              type="text" 
              name="category" 
              placeholder="Category" 
              value={editedTransaction.category} 
              onChange={handleEditChange} 
              required 
            />
            <input 
              type="date" 
              name="date" 
              value={editedTransaction.date} 
              onChange={handleEditChange} 
              required 
            />
            <input 
              type="text" 
              name="description" 
              placeholder="Description" 
              value={editedTransaction.description} 
              onChange={handleEditChange} 
              required 
            />
            <button type="submit">Update Transaction</button>
            <button type="button" onClick={() => setEditIndex(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
