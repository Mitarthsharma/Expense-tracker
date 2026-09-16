import React from "react";
import "./Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import {useState,useEffect} from "react"
import axios from "axios"

const Dashboard = () => {
    const navigate = useNavigate();
    const [summary,setSummary]=useState({
        totalIncome:0,
        totalExpense:0,
        totalBalance:0
    })
    const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
    const [categorySummary,setCategorySummary]=useState([])
    const [expenses,setExpense]=useState([])
    const [editingExpense,setEditingExpense]=useState(null);
    const editTransaction=(expense)=>{
        setEditingExpense(expense)
    }
const totalCategoryExpense = categorySummary.reduce(
    (sum, category) => sum + category.total,
    0
);
const getCategoryColor = (category) => {
    const colors = {
        Food: "#ffb000",
        Transport: "#ff7600",
        Shopping: "#e85d04",
        Entertainment: "#555",
        Education: "#8b5cf6",
        Bills: "#06b6d4",
        Health: "#22c55e",
        Other: "#888"
    };

    return colors[category] || "#888";
};
const donutGradient = () => {
    if (totalCategoryExpense === 0) {
        return "#222";
    }

    let currentDegree = 0;

    const colors = [
        "#ffb000",
        "#ff7600",
        "#e85d04",
        "#555"
    ];

    const gradientParts = categorySummary.map((category, index) => {
        const degree =
            (category.total / totalCategoryExpense) * 360;

        const start = currentDegree;
        const end = currentDegree + degree;

        currentDegree = end;

        return `${colors[index % colors.length]} ${start}deg ${end}deg`;
    });

    return `conic-gradient(${gradientParts.join(", ")})`;
};

const handleLogout = async () => {
    try {
        const response = await axios.post(
            "http://localhost:3000/auth/logout",
            {},
            {
                withCredentials: true
            }
        );

        console.log(response.data);
        alert("Logout Successful");
        navigate("/login");

    } catch (error) {
        console.log(error);
    }
};
  useEffect(() => {

    const loadDashboard = async () => {
        try {
            setLoading(true);
            setError("");

            await Promise.all([
                getSummary(),
                getExpense(),
                getCategorySummary()
            ]);

        } catch (error) {
            console.log(error);
            setError("Failed to load dashboard data.");
        } finally {
            setLoading(false);
        }
    };

    loadDashboard();

}, []);

const getSummary = async () => {
    const response = await axios.get(
        "http://localhost:3000/expense/summary",
        {
            withCredentials: true
        }
    );

    setSummary(response.data);
};

const getExpense = async () => {
    const response = await axios.get(
        "http://localhost:3000/expense/get",
        {
            withCredentials: true
        }
    );

    setExpense(response.data.expenses);
};

const getCategorySummary = async () => {
    const response = await axios.get(
        "http://localhost:3000/expense/category_expense",
        {
            withCredentials: true
        }
    );

    setCategorySummary(response.data.summary);
};
const updateTransaction = async () => {
    try {
        const response = await axios.patch(
            `http://localhost:3000/expense/update/${editingExpense._id}`,
            {
                title: editingExpense.title,
                amount: Number(editingExpense.amount),
                category: editingExpense.category,
                type: editingExpense.type,
                description: editingExpense.description,
                date: editingExpense.date
            },
            {
                withCredentials: true
            }
        );

        

        setExpense((prevExpenses) =>
            prevExpenses.map((expense) =>
                expense._id === editingExpense._id
                    ? {
                        ...expense,
                        ...editingExpense,
                        amount: Number(editingExpense.amount)
                    }
                    : expense
            )
        );

      getSummary()
        setEditingExpense(null);

        alert("Transaction updated successfully");

    } catch (error) {
        console.log(error);
    }
};

const deleteTransaction=async(id)=>{
    try{
    const response=await axios.delete(`http://localhost:3000/expense/delete/${id}`,{
        withCredentials:true
    })
   
    setExpense((prevExpenses) =>
    prevExpenses.filter((expense) => expense._id !== id)
);
getSummary()
    alert("Transaction deleted successfully");}
    catch(error){
        console.log(error);
        
    }
    
}
   return (
    <div className="dashboard">

        {/* LOADING STATE */}
        {loading && (
            <div className="dashboard-status">
                <div className="loader"></div>
                <p>Loading dashboard...</p>
            </div>
        )}

        {/* ERROR STATE */}
        {error && !loading && (
            <div className="dashboard-status error">
                <p>{error}</p>

                <button onClick={() => window.location.reload()}>
                    Try Again
                </button>
            </div>
        )}

        {/* DASHBOARD CONTENT */}
        {!loading && !error && (
            <>

                {/* SIDEBAR */}
                <aside className="sidebar">

                    <div className="sidebar-logo">
                        <span>◆</span> Expense<span>Tracker</span>
                    </div>

                    <nav className="sidebar-nav">

                        <Link
                            to="/dashboard"
                            className="nav-item active"
                        >
                            <span>⌂</span>
                            Dashboard
                        </Link>

                        <Link
                            to="/transactions"
                            className="nav-item"
                        >
                            <span>↕</span>
                            Transactions
                        </Link>

                        <Link
                            to="/analytics"
                            className="nav-item"
                        >
                            <span>◔</span>
                            Analytics
                        </Link>

                    </nav>

                    <div className="sidebar-bottom">

                        <Link
                            to="/settings"
                            className="nav-item"
                        >
                            <span>⚙</span>
                            Settings
                        </Link>

                        <button
                            className="logout-btn"
                            onClick={handleLogout}
                        >
                            <span>↪</span>
                            Logout
                        </button>

                    </div>

                </aside>


                {/* MAIN CONTENT */}
                <main className="dashboard-content">

                    {/* TOP BAR */}
                    <header className="dashboard-header">

                        <div>
                            <p className="dashboard-label">
                                FINANCIAL OVERVIEW
                            </p>

                            <h1>
                                Good evening, <span>there.</span> 👋
                            </h1>

                            <p className="dashboard-subtitle">
                                Here's what's happening with your money.
                            </p>
                        </div>

                        <div className="header-actions">

                            <button className="notification-btn">
                                ♧
                            </button>

                            <div className="profile">

                                <div className="profile-avatar">
                                    U
                                </div>

                                <div className="profile-info">
                                    <strong>User</strong>
                                    <span>Personal Account</span>
                                </div>

                            </div>

                        </div>

                    </header>


                    {/* SUMMARY CARDS */}
                    <section className="summary-grid">

                        <div className="summary-card balance-card">

                            <div className="card-top">

                                <div>
                                    <p>Total Balance</p>

                                    <h2>
                                        ₹{summary.totalBalance.toLocaleString("en-IN")}
                                    </h2>
                                </div>

                                <div className="card-icon">
                                    ↗
                                </div>

                            </div>

                            <div className="card-bottom">

                                <span className="positive">
                                    ↑ 12.5%
                                </span>

                                <span>
                                    vs last month
                                </span>

                            </div>

                        </div>


                        <div className="summary-card">

                            <div className="card-top">

                                <div>
                                    <p>Total Income</p>

                                    <h2>
                                        ₹{summary.totalIncome.toLocaleString("en-IN")}
                                    </h2>
                                </div>

                                <div className="card-icon income-icon">
                                    ↓
                                </div>

                            </div>

                            <div className="card-bottom">

                                <span className="positive">
                                    ↑ 8.2%
                                </span>

                                <span>
                                    vs last month
                                </span>

                            </div>

                        </div>


                        <div className="summary-card">

                            <div className="card-top">

                                <div>
                                    <p>Total Expenses</p>

                                    <h2>
                                        ₹{summary.totalExpense.toLocaleString("en-IN")}
                                    </h2>
                                </div>

                                <div className="card-icon expense-icon">
                                    ↑
                                </div>

                            </div>

                            <div className="card-bottom">

                                <span className="negative">
                                    ↑ 4.8%
                                </span>

                                <span>
                                    vs last month
                                </span>

                            </div>

                        </div>

                    </section>


                    {/* CHARTS SECTION */}
                    <section className="charts-grid">

                        {/* SPENDING CHART */}
                        <div className="dashboard-card spending-card">

                            <div className="section-header">

                                <div>

                                    <p className="section-label">
                                        OVERVIEW
                                    </p>

                                    <h3>
                                        Spending Overview
                                    </h3>

                                </div>

                                <select className="period-select">
                                    <option>This Month</option>
                                    <option>Last Month</option>
                                    <option>Last 6 Months</option>
                                </select>

                            </div>


                            <div className="chart-container">

                                <div className="chart-y-axis">
                                    <span>₹20k</span>
                                    <span>₹15k</span>
                                    <span>₹10k</span>
                                    <span>₹5k</span>
                                    <span>₹0</span>
                                </div>

                                <div className="bar-chart">

                                    <div className="grid-line line-1"></div>
                                    <div className="grid-line line-2"></div>
                                    <div className="grid-line line-3"></div>
                                    <div className="grid-line line-4"></div>
                                    <div className="grid-line line-5"></div>

                                    <div className="bars">

                                        <div className="bar-column">
                                            <div className="bar-fill bar-1"></div>
                                            <span>Mon</span>
                                        </div>

                                        <div className="bar-column">
                                            <div className="bar-fill bar-2"></div>
                                            <span>Tue</span>
                                        </div>

                                        <div className="bar-column">
                                            <div className="bar-fill bar-3"></div>
                                            <span>Wed</span>
                                        </div>

                                        <div className="bar-column">
                                            <div className="bar-fill bar-4"></div>
                                            <span>Thu</span>
                                        </div>

                                        <div className="bar-column">
                                            <div className="bar-fill bar-5"></div>
                                            <span>Fri</span>
                                        </div>

                                        <div className="bar-column">
                                            <div className="bar-fill bar-6"></div>
                                            <span>Sat</span>
                                        </div>

                                        <div className="bar-column">
                                            <div className="bar-fill bar-7"></div>
                                            <span>Sun</span>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* CATEGORY CARD */}
                        <div className="dashboard-card category-card">

                            <div className="section-header">

                                <div>

                                    <p className="section-label">
                                        BREAKDOWN
                                    </p>

                                    <h3>
                                        Expenses by Category
                                    </h3>

                                </div>

                            </div>


                            <div className="donut-wrapper">

                                <div
                                    className="donut-chart"
                                    style={{
                                        background: donutGradient()
                                    }}
                                >

                                    <div className="donut-center">

                                        <strong>
                                            ₹{totalCategoryExpense.toLocaleString("en-IN")}
                                        </strong>

                                        <span>
                                            Total
                                        </span>

                                    </div>

                                </div>

                            </div>


                            <div className="category-list">

                                {categorySummary.map((category) => {

                                    const total = categorySummary.reduce(
                                        (sum, item) => sum + item.total,
                                        0
                                    );

                                    const percentage =
                                        total === 0
                                            ? 0
                                            : Math.round(
                                                (category.total / total) * 100
                                            );

                                    return (

                                        <div
                                            className="category-item"
                                            key={category._id}
                                        >

                                            <span
                                                className="category-dot"
                                                style={{
                                                    background:
                                                        getCategoryColor(category._id)
                                                }}
                                            ></span>

                                            <div>

                                                <strong>
                                                    {category._id}
                                                </strong>

                                                <span>
                                                    {percentage}%
                                                </span>

                                            </div>

                                            <strong>
                                                ₹{category.total.toLocaleString("en-IN")}
                                            </strong>

                                        </div>

                                    );

                                })}

                            </div>

                        </div>

                    </section>


                    {/* TRANSACTIONS */}
                    <section className="transactions-section">

                        <div className="transactions-header">

                            <div>

                                <p className="section-label">
                                    ACTIVITY
                                </p>

                                <h3>
                                    Recent Transactions
                                </h3>

                            </div>

                            <button
                                className="add-transaction-btn"
                                onClick={() => navigate("/transactions")}
                            >
                                + Add Transaction
                            </button>

                        </div>


                        <div className="transactions-table">

                            <div className="table-header">
                                <span>Transaction</span>
                                <span>Category</span>
                                <span>Date</span>
                                <span>Amount</span>
                            </div>


                            {expenses.map((expense) => (

                                <div
                                    className="transaction-row"
                                    key={expense._id}
                                >

                                    <div className="transaction-name">

                                        <div className="transaction-icon">
                                            💰
                                        </div>

                                        <div>

                                            <strong>
                                                {expense.title}
                                            </strong>

                                            <span>
                                                {expense.description ||
                                                    "No description"}
                                            </span>

                                        </div>

                                    </div>


                                    <span className="transaction-category">
                                        {expense.category}
                                    </span>


                                    <span className="transaction-date">
                                        {new Date(
                                            expense.date
                                        ).toLocaleDateString("en-IN")}
                                    </span>


                                    <strong
                                        className={`amount ${
                                            expense.type === "income"
                                                ? "income"
                                                : "expense"
                                        }`}
                                    >

                                        {expense.type === "income"
                                            ? "+"
                                            : "-"}

                                        ₹{expense.amount.toLocaleString("en-IN")}

                                    </strong>


                                    <button
                                        className="edit-btn"
                                        onClick={() =>
                                            editTransaction(expense)
                                        }
                                    >
                                        ✏️
                                    </button>


                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            deleteTransaction(expense._id)
                                        }
                                    >
                                        🗑️
                                    </button>

                                </div>

                            ))}

                        </div>

                    </section>


                    {/* EDIT MODAL */}
                    {editingExpense && (

                        <div className="edit-modal">

                            <div className="edit-modal-content">

                                <h2>
                                    Edit Transaction
                                </h2>


                                <div className="form-group">

                                    <label>
                                        Title
                                    </label>

                                    <input
                                        type="text"
                                        value={editingExpense.title}
                                        onChange={(e) =>
                                            setEditingExpense({
                                                ...editingExpense,
                                                title: e.target.value
                                            })
                                        }
                                    />

                                </div>


                                <div className="form-group">

                                    <label>
                                        Amount
                                    </label>

                                    <input
                                        type="number"
                                        value={editingExpense.amount}
                                        onChange={(e) =>
                                            setEditingExpense({
                                                ...editingExpense,
                                                amount: e.target.value
                                            })
                                        }
                                    />

                                </div>


                                <div className="form-group">

                                    <label>
                                        Category
                                    </label>

                                    <select
                                        value={editingExpense.category}
                                        onChange={(e) =>
                                            setEditingExpense({
                                                ...editingExpense,
                                                category: e.target.value
                                            })
                                        }
                                    >
                                        <option value="Food">Food</option>
                                        <option value="Transport">Transport</option>
                                        <option value="Shopping">Shopping</option>
                                        <option value="Entertainment">
                                            Entertainment
                                        </option>
                                        <option value="Education">
                                            Education
                                        </option>
                                        <option value="Bills">Bills</option>
                                        <option value="Health">Health</option>
                                        <option value="Other">Other</option>
                                    </select>

                                </div>


                                <div className="form-group">

                                    <label>
                                        Type
                                    </label>

                                    <select
                                        value={editingExpense.type}
                                        onChange={(e) =>
                                            setEditingExpense({
                                                ...editingExpense,
                                                type: e.target.value
                                            })
                                        }
                                    >
                                        <option value="expense">
                                            Expense
                                        </option>

                                        <option value="income">
                                            Income
                                        </option>
                                    </select>

                                </div>


                                <div className="form-group">

                                    <label>
                                        Description
                                    </label>

                                    <textarea
                                        value={
                                            editingExpense.description || ""
                                        }
                                        onChange={(e) =>
                                            setEditingExpense({
                                                ...editingExpense,
                                                description: e.target.value
                                            })
                                        }
                                    />

                                </div>


                                <div className="form-group">

                                    <label>
                                        Date
                                    </label>

                                    <input
                                        type="date"
                                        value={editingExpense.date.slice(0, 10)}
                                        onChange={(e) =>
                                            setEditingExpense({
                                                ...editingExpense,
                                                date: e.target.value
                                            })
                                        }
                                    />

                                </div>


                                <div className="edit-actions">

                                    <button
                                        onClick={() =>
                                            setEditingExpense(null)
                                        }
                                    >
                                        Cancel
                                    </button>


                                    <button
                                        className="update-btn"
                                        onClick={updateTransaction}
                                    >
                                        Update Transaction
                                    </button>

                                </div>

                            </div>

                        </div>

                    )}

                </main>

            </>
        )}

    </div>
);
};

export default Dashboard;