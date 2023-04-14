import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css"
import Home from './components/Home';
import Navbar from "./components/Navbar"
import UserService from "./services/Users"
import Profile from "./components/Profile"
import BuyInsurance from "./components/BuyInsurance"
import ClaimInsurance from "./components/ClaimInsurance"
import Wallet from "./components/Wallet"

export default function App() {
  const [user, setuser] = React.useState(null)
  React.useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('token')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setuser(user)
      UserService.setToken(user.token)
    }
  }, [])
  return (
    <Router>
      <div className="container">
        <Navbar user={user} setuser={setuser} />
        <Routes>
          <Route exact path="/" element={!window.localStorage.getItem('token')? <Home user={user} setuser={setuser} />: <Navigate replace to="/profile" />}/>
          <Route path="/profile" element={window.localStorage.getItem('token') ? <Profile user={user} setuser={setuser} /> : <Navigate replace to="/" />} />
          <Route path="/BuyInsurance" element={window.localStorage.getItem('token') ? <BuyInsurance user={user} setuser={setuser} /> : <Navigate replace to="/" />} />
          <Route path="/ClaimInsurance" element={window.localStorage.getItem('token') ? <ClaimInsurance user={user} setuser={setuser} /> : <Navigate replace to="/" />} />
          <Route path="/Wallet" element={window.localStorage.getItem('token') ? <Wallet user={user} setuser={setuser} /> : <Navigate replace to="/" />} />
          <Route path="*" element={<Navigate replace to="/"/>} /> 
        </Routes>
      </div>
    </Router>
  );
}
