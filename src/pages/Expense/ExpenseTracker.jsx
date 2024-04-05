import React, { useState } from 'react';
import { useGetTransactions } from "../../Hooks/useGetTransactions";
import { useGetUserInfo } from "../../Hooks/useGetUserInfo";
import useAddTransaction from "../../Hooks/useAddTransaction";
import { signOut } from 'firebase/auth';
import { auth } from '../../Config/FirebaseConfig';
import { useNavigate } from 'react-router-dom';

const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransactions();
  const { name, profilePhoto, email } = useGetUserInfo();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");
  const [filterType, setFilterType] = useState("all"); // State to track which records to display

  const { balance, income, expenses } = transactionTotals;
  
  

  const userSignout = async () => {
    try{
      await signOut(auth);
      localStorage.clear()
      navigate('/')
    }catch(error){
      window.alert(error);
    }
  }
  
  

  const onSubmit = async (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });
    // Reset form fields
    setDescription("");
    setTransactionAmount(0);
    window.alert("Transaction added successfully!");
  };

  // Filter transactions based on filterType state
  const filteredTransactions = filterType === "all"
    ? transactions
    : transactions.filter(transaction => transaction.transactionType === filterType);

  return (
    <>
      <div className="container-fluid">
        <h2 className="text-center">Expense Tracker 💸</h2>
        <hr />
      </div>
      <div className='container-fluid expense-tracker header-section'>
        <div className="row">
          {/* Display user profile */}
          <div className="col-xl-4 col-md-6 col-12">
            <div className="profile">
              <h3>{name}</h3>
            </div>
            <div className="profile">
              <div className="profile-image mt-2 mb-2">
                <img src={profilePhoto} alt="profile-photo" />
              </div>
              <div className="profile-email">
                <h4>Email - {email}</h4>
              </div>
              <div className="profile-signout">
                <button className='btn btn-danger' onClick={userSignout}>Signout</button>
              </div>
            </div>
          </div>
          {/* Display balance, income, and expense */}
          <div className="col-xl-4 col-md-6 col-12">
            <div className="balance">
              <h3>Your Balance</h3>
              { balance >= 0 ? <h4>${balance}</h4> : <h4>-${balance*-1}</h4>}
            </div>
            <div className="summary">
              <div className="income">
                <h4>Income ❤️</h4>
                <h4>${income}</h4>
              </div>
              <div className="expenses">
                <h4>Expense 💔</h4>
                <h4>${expenses}</h4>
              </div>
            </div>
          </div>
          {/* Form for adding transactions */}
          <div className="col-xl-4 col-md-6 col-12 form-container">
            <form className='add-transaction' onSubmit={onSubmit}>
              <div className="mt-2">
                <label htmlFor="income">Add Description</label>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className='form-control mt-1' id="description" 
                  type="text" placeholder='Description' required />
              </div>
              <div className="mt-2">
                <label htmlFor="income">Add Amount</label>
                <input
                  value={transactionAmount} 
                  onChange={(e) => setTransactionAmount(e.target.value)}
                  className='form-control mt-1' id="amount" 
                  type="number" placeholder='Amount' required />
              </div>
              <div className="container mt-2">
                <div className="row">
                  <div className="col-6 transaction-type">
                    <div className="mt-2 mb-1">
                      <input 
                        checked={transactionType === "income"}
                        onChange={(e) => setTransactionType(e.target.value)}
                        type="radio" name="transactionType" 
                        id="income" value="income"
                        className="mx-2"
                      />
                      <label htmlFor="income">Income</label>
                    </div>
                  </div>
                  <div className="col-6 transaction-type">
                    <div className="mt-2 mb-1">
                      <input
                        checked={transactionType === "expense"}
                        value="expense"
                        onChange={(e) => setTransactionType(e.target.value)}
                        type="radio" name="transactionType" 
                        id="expense" 
                        className="mx-2"
                      />
                      <label htmlFor="expense">Expense</label>
                    </div>
                  </div>
                </div>
              </div>
              <button className="btn btn-success form-control mt-3" type='submit'>Add Transaction</button>
            </form>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <hr />
      </div>
      <div className="container-fluid">
        {/* Buttons to toggle showing expense or income */}
        <div className="row">
          <div className="col-4 text-center">
            <button className=
            {`btn btn-${filterType === "all" ? 'primary' : 'secondary'}`} 
            onClick={() => setFilterType("all")}>
            Show All</button>
          </div>
          <div className="col-4 text-center">
            <button className={`btn btn-${filterType === "income" ? 'primary' : 'secondary'}`} 
            onClick={() => setFilterType("income")}>Show Income</button>
          </div>
          <div className="col-4 text-center">
            <button className={`btn btn-${filterType === "expense" ? 'primary' : 'secondary'}`} 
            onClick={() => setFilterType("expense")}>Show Expense</button>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <hr />
      </div>
      {/* Display transactions */}
      <div className="transactions container" style={{height: '500px', border: '1px solid red', overflowY: "scroll"}}>
        <h3 className='text-center'>{filterType === "income" ? 'Income' : filterType === "expense" ? 'Expense' : 'All'} Transactions</h3>
          <hr />
        <ul>
          {filteredTransactions.map((transaction) => (
            <li key={transaction.id}>
              <h4>{transaction.description}</h4>
              <p>$ {transaction.transactionAmount} . <label style={{ color: transaction.transactionType === 'expense' ? 'red' : 'green' }}>{transaction.transactionType}</label> </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default ExpenseTracker;
