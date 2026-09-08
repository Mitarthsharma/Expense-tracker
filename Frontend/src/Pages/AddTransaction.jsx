import React from "react";
import "./AddTransaction.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState,useEffect } from "react";
const AddTransaction = () => {
   const [title, setTitle] = useState("");
const [amount, setAmount] = useState("");
const [category, setCategory] = useState("");
const [type, setType] = useState("expense");
const [description, setDescription] = useState("");
const [date, setDate] = useState("");

const transaction=async(e)=>{
    e.preventDefault();
    try{
const response=await axios.post("http://localhost:3000/expense/create",{
    title,amount,category,type,description,date
},{withCredentials:true})
console.log(response);
alert("Transaction added successfully");
setTitle("")
setAmount("")
setCategory("")
setType("expense")
setDescription("")
setDate("")

}catch(error){
    console.log(error);
    
}


}
    return (
        <div className="transaction-page">

            {/* BACKGROUND GLOW */}
            <div className="transaction-glow"></div>


            {/* HEADER */}
            <header className="transaction-header">

                <Link to="/dashboard" className="transaction-logo">
                    <span>◆</span> Expense<span>Tracker</span>
                </Link>

                <Link to="/dashboard" className="back-dashboard">
                    ← Dashboard
                </Link>

            </header>


            {/* MAIN */}
            <main className="transaction-main">

                <div className="transaction-intro">

                    <p className="transaction-label">
                        TRANSACTION
                    </p>

                    <h1>
                        Add a <span>Transaction.</span>
                    </h1>

                    <p>
                        Record your income or expense and keep your
                        finances organized.
                    </p>

                </div>


                {/* FORM CARD */}
                <div className="transaction-card">

                    <div className="transaction-card-header">

                        <div>
                            <p className="card-label">
                                NEW ENTRY
                            </p>

                            <h2>
                                Transaction Details
                            </h2>
                        </div>

                        <div className="transaction-symbol">
                            ₹
                        </div>

                    </div>


                    <form className="transaction-form" onSubmit={transaction}>

                        {/* TITLE */}
                        <div className="form-group">

                            <label>
                                Transaction Title
                            </label>

                            <input
                                type="text"
                                placeholder="e.g. Groceries, Salary, Rent" value={title} onChange={(e)=>{setTitle(e.target.value)}}
                            />

                        </div>


                        {/* AMOUNT */}
                        <div className="form-group">

                            <label>
                                Amount
                            </label>

                            <div className="amount-input">

                                <span>₹</span>

                                <input
                                    type="number"
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={(e)=>{setAmount(e.target.value)}}
                                />

                            </div>

                        </div>


                        {/* CATEGORY + TYPE */}
                        <div className="form-row">

                            <div className="form-group">

                                <label>
                                    Category
                                </label>

                                <select defaultValue="" value={category} onChange={(e)=>{setCategory(e.target.value)}}>
                                    <option value="" disabled>
                                        Select category
                                    </option>

                                    <option value="Food">
                                        Food
                                    </option>

                                    <option value="Transport">
                                        Transport
                                    </option>

                                    <option value="Shopping">
                                        Shopping
                                    </option>

                                    <option value="Entertainment">
                                        Entertainment
                                    </option>

                                    <option value="Education">
                                        Education
                                    </option>

                                    <option value="Bills">
                                        Bills
                                    </option>

                                    <option value="Health">
                                        Health
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>

                                </select>

                            </div>


                            <div className="form-group">

                                <label>
                                    Transaction Type
                                </label>

                                <select defaultValue="expense" value={type} onChange={(e)=>{setType(e.target.value)}}>

                                    <option value="expense">
                                        Expense
                                    </option>

                                    <option value="income">
                                        Income
                                    </option>

                                </select>

                            </div>

                        </div>


                        {/* DESCRIPTION */}
                        <div className="form-group">

                            <label>
                                Description
                                <span>Optional</span>
                            </label>

                            <textarea
                                placeholder="Add a note about this transaction..."
                                rows="4" value={description} onChange={(e) => {
    setDescription(e.target.value);
}}
                            ></textarea>

                        </div>


                        {/* DATE */}
                        <div className="form-group">

                            <label>
                                Date
                            </label>

                            <input
                                type="date" value={date} onChange={(e)=>{setDate(e.target.value)}}
                            />

                        </div>


                        {/* ACTIONS */}
                        <div className="form-actions">

                            <Link
                                to="/dashboard"
                                className="cancel-btn"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                className="submit-transaction-btn"
                            >
                                Add Transaction
                                <span>→</span>
                            </button>

                        </div>

                    </form>

                </div>

            </main>

        </div>
    );
};

export default AddTransaction;