import React from "react";
import "./Login.css";
import {Link,useNavigate} from "react-router-dom"
import axios from "axios"
import { useState } from "react";

const Login =() => {
    const navigate=useNavigate();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("")
    
    const handleLogin=async(e)=>{
e.preventDefault();
try{
const response=await axios.post("http://localhost:3000/auth/login",{
    email,password
},{withCredentials:true});
console.log(response)
alert("user login successfully");
navigate("/dashboard")
}catch(error){
    console.log(error);
    
}
    }
    
    return (
        <div className="login-main">

            {/* LEFT SIDE */}
            <div className="login-info">

                <div className="login-logo">
                    <span>◆</span> Expense<span>Tracker</span>
                </div>

                <p className="login-tagline">
                    WELCOME BACK. STAY IN CONTROL.
                </p>

                <h1>
                    Your Money.
                    <br />
                    Your <span>Control.</span>
                </h1>

                <p className="login-description">
                    Keep track of your spending, monitor your
                    income and make smarter financial decisions.
                </p>

                {/* EXPENSE VISUAL */}

                <div className="money-visual">

                    <div className="money-top">
                        <div>
                            <p>Total Balance</p>
                            <h3>₹24,500</h3>
                        </div>

                        <div className="balance-icon">
                            ↗
                        </div>
                    </div>

                    <div className="money-chart">

                        <div className="chart-line"></div>

                        <div className="chart-dot dot1"></div>
                        <div className="chart-dot dot2"></div>
                        <div className="chart-dot dot3"></div>
                        <div className="chart-dot dot4"></div>
                        <div className="chart-dot dot5"></div>

                    </div>

                    <div className="money-bottom">

                        <div>
                            <p>Income</p>
                            <strong>₹40,000</strong>
                        </div>

                        <div>
                            <p>Expenses</p>
                            <strong className="red">
                                ₹15,500
                            </strong>
                        </div>

                    </div>

                </div>

            </div>


            {/* RIGHT SIDE */}

            <div className="login-card">

                <p className="login-card-label">
                    WELCOME BACK
                </p>

                <h2>
                    Login to Expense Tracker
                </h2>

                <p className="login-card-description">
                    Enter your details to continue.
                </p>


               
                    <form action="" className="login-inputs" onSubmit={handleLogin}>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                    />

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                         onChange={(e)=>{setPassword(e.target.value)}}
                    />

                    <div className="login-options">

                        <label>
                            <input type="checkbox" />
                            Remember me
                        </label>

                        <span>
                            Forgot password?
                        </span>

                    </div>

                    <button type="submit">
                        Login <span>→</span>
                    </button>
                    </form>

               


                <p className="register-text">
                    Don't have an account?
                   <Link to="/register"> <span> Register</span></Link>
                </p>

            </div>

        </div>
    );
};

export default Login;