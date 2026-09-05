import React from 'react'
import Register from './Pages/Register'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
const App = () => {
  return (
  
      <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
      </BrowserRouter>
    
  )
}

export default App
