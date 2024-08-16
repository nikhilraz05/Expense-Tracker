// src/components/TransactionList.js
import React from 'react';

const TransactionList = ({ transactions, setTransactions, setIncome, setExpenses, setBalance }) => {
  const handleDeleteTransaction = (index) => {
    const updatedTransactions = [...transactions];
    const [removedTransaction] = updatedTransactions.splice(index, 1);

    if (removedTransaction.type === 'Income') {
      setIncome(prevIncome => prevIncome - removedTransaction.amount);
      setBalance(prevBalance => prevBalance - removedTransaction.amount);
    } else {
      setExpenses(prevExpenses => prevExpenses - removedTransaction.amount);
      setBalance(prevBalance => prevBalance + removedTransaction.amount);
    }

    setTransactions(updatedTransactions);
  };

  return (
    <div className="transaction-list">
      <h2>Transaction History</h2>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            <span>{transaction.date} - {transaction.category} - ${transaction.amount} ({transaction.type})</span>
            <button onClick={() => handleDeleteTransaction(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
