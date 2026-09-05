import React from "react";
import "./Register.css";
import {Link} from "react-router-dom"
import axios from "axios"
import { useState } from "react";
const Register = () => {
    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [confirmpass,setConfirmpass]=useState("");

    const handleRegister=async (e)=>{
e.preventDefault();
if(password!==confirmpass){
    alert("Password confirmation does not match");
    return;
}
try{
const respone=await axios.post("http://localhost:3000/auth/register",{
    username,email,password
})
console.log(respone);
alert("User registered Successfully");
setEmail("")
setPassword("")
setUsername("")
setConfirmpass("")
}
catch(error){
    console.log(error)
}
    }

    return (
        <div className="main">

            {/* LEFT SIDE */}
            <div className="register-info">
                <div className="logo">
                    <span>◆</span> Expense<span>Tracker</span>
                </div>

                <p className="tagline">SMART FINANCE. BETTER CONTROL.</p>

                <h1>
                    Take Control
                    <br />
                    of Your <span>Finances.</span>
                </h1>

                <p className="description">
                    Track your expenses, understand your spending,
                    and take control of your financial future.
                </p>

                <div className="tracker-visual">
                    <div className="chart-header">
                        <span>Monthly Spending</span>
                        <strong>₹24,500</strong>
                    </div>

                    <div className="chart">
                        <div className="bar bar1"></div>
                        <div className="bar bar2"></div>
                        <div className="bar bar3"></div>
                        <div className="bar bar4"></div>
                        <div className="bar bar5"></div>
                        <div className="bar bar6"></div>
                    </div>

                    <div className="visual-footer">
                        <span>Income</span>
                        <strong>₹40,000</strong>
                        <span className="expense">Expense ₹15,500</span>
                    </div>
                </div>
            </div>


            <div className="register-card">

                <p className="card-label">CREATE YOUR ACCOUNT</p>

                <h2>Join Expense Tracker</h2>

                <p className="card-description">
                    Start managing your money smarter.
                </p>

               
                    <form action="" className="inp-field" onSubmit={handleRegister}>

                    <input
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e)=>{setUsername(e.target.value)}}
                    />

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

                    <input
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmpass}
                         onChange={(e)=>{setConfirmpass(e.target.value)}}
                         
                    />

                   <button type="submit">
                        
                        Register <span>→</span>
                        
                    </button>
                    </form>

               

                <p className="login-text">
                    Already have an account?
                    <Link to="/login"><span> Login</span></Link>
                </p>

            </div>

        </div>
    );
};

export default Register;