import React from "react";
import "./Dashboard.css";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="dashboard">

            {/* SIDEBAR */}
            <aside className="sidebar">

                <div className="sidebar-logo">
                    <span>◆</span> Expense<span>Tracker</span>
                </div>

                <nav className="sidebar-nav">

                    <Link to="/dashboard" className="nav-item active">
                        <span>⌂</span>
                        Dashboard
                    </Link>

                    <Link to="/transactions" className="nav-item">
                        <span>↕</span>
                        Transactions
                    </Link>

                    <Link to="/analytics" className="nav-item">
                        <span>◔</span>
                        Analytics
                    </Link>

                </nav>

                <div className="sidebar-bottom">

                    <Link to="/settings" className="nav-item">
                        <span>⚙</span>
                        Settings
                    </Link>

                    <button
                        className="logout-btn"
                        onClick={() => navigate("/login")}
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
                                <h2>₹24,500</h2>
                            </div>

                            <div className="card-icon">
                                ↗
                            </div>
                        </div>

                        <div className="card-bottom">
                            <span className="positive">
                                ↑ 12.5%
                            </span>
                            <span>vs last month</span>
                        </div>

                    </div>


                    <div className="summary-card">

                        <div className="card-top">
                            <div>
                                <p>Total Income</p>
                                <h2>₹40,000</h2>
                            </div>

                            <div className="card-icon income-icon">
                                ↓
                            </div>
                        </div>

                        <div className="card-bottom">
                            <span className="positive">
                                ↑ 8.2%
                            </span>
                            <span>vs last month</span>
                        </div>

                    </div>


                    <div className="summary-card">

                        <div className="card-top">
                            <div>
                                <p>Total Expenses</p>
                                <h2>₹15,500</h2>
                            </div>

                            <div className="card-icon expense-icon">
                                ↑
                            </div>
                        </div>

                        <div className="card-bottom">
                            <span className="negative">
                                ↑ 4.8%
                            </span>
                            <span>vs last month</span>
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

                                <h3>Spending Overview</h3>
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

                                <h3>Expenses by Category</h3>
                            </div>

                        </div>


                        <div className="donut-wrapper">

                            <div className="donut-chart">
                                <div className="donut-center">
                                    <strong>₹15.5k</strong>
                                    <span>Total</span>
                                </div>
                            </div>

                        </div>


                        <div className="category-list">

                            <div className="category-item">
                                <span className="category-dot food"></span>

                                <div>
                                    <strong>Food</strong>
                                    <span>30%</span>
                                </div>

                                <strong>₹4,650</strong>
                            </div>

                            <div className="category-item">
                                <span className="category-dot transport"></span>

                                <div>
                                    <strong>Transport</strong>
                                    <span>20%</span>
                                </div>

                                <strong>₹3,100</strong>
                            </div>

                            <div className="category-item">
                                <span className="category-dot shopping"></span>

                                <div>
                                    <strong>Shopping</strong>
                                    <span>25%</span>
                                </div>

                                <strong>₹3,875</strong>
                            </div>

                            <div className="category-item">
                                <span className="category-dot other"></span>

                                <div>
                                    <strong>Other</strong>
                                    <span>25%</span>
                                </div>

                                <strong>₹3,875</strong>
                            </div>

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

                            <h3>Recent Transactions</h3>
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


                        <div className="transaction-row">

                            <div className="transaction-name">
                                <div className="transaction-icon">
                                    🛒
                                </div>

                                <div>
                                    <strong>Groceries</strong>
                                    <span>Weekly shopping</span>
                                </div>
                            </div>

                            <span className="transaction-category">
                                Food
                            </span>

                            <span className="transaction-date">
                                Sep 05, 2026
                            </span>

                            <strong className="amount expense">
                                -₹1,250
                            </strong>

                        </div>


                        <div className="transaction-row">

                            <div className="transaction-name">
                                <div className="transaction-icon">
                                    🎬
                                </div>

                                <div>
                                    <strong>Netflix</strong>
                                    <span>Entertainment</span>
                                </div>
                            </div>

                            <span className="transaction-category">
                                Entertainment
                            </span>

                            <span className="transaction-date">
                                Sep 04, 2026
                            </span>

                            <strong className="amount expense">
                                -₹499
                            </strong>

                        </div>


                        <div className="transaction-row">

                            <div className="transaction-name">
                                <div className="transaction-icon income">
                                    ↑
                                </div>

                                <div>
                                    <strong>Salary</strong>
                                    <span>Monthly salary</span>
                                </div>
                            </div>

                            <span className="transaction-category">
                                Income
                            </span>

                            <span className="transaction-date">
                                Sep 01, 2026
                            </span>

                            <strong className="amount income">
                                +₹40,000
                            </strong>

                        </div>


                        <div className="transaction-row">

                            <div className="transaction-name">
                                <div className="transaction-icon">
                                    🚌
                                </div>

                                <div>
                                    <strong>Transport</strong>
                                    <span>Daily commute</span>
                                </div>
                            </div>

                            <span className="transaction-category">
                                Transport
                            </span>

                            <span className="transaction-date">
                                Aug 31, 2026
                            </span>

                            <strong className="amount expense">
                                -₹350
                            </strong>

                        </div>

                    </div>

                </section>

            </main>

        </div>
    );
};

export default Dashboard;