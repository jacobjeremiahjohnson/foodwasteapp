import './App.css';
import Header from "./components/Header"
import Footer from "./components/Footer"
import Create from "./components/Create"
import Login from "./components/Login"
import SupplierDashboard from "./components/SupplierDashboard"
import ConsumerDashboard from "./components/ConsumerDashboard"
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState } from "react"

export const apiUrl = "http://localhost:3000/api/v1/"

export function App() {

  const [token, setToken] = useState("")

  return (
    <div className="App">
      <Router>
      <Header/>
      <Routes>
        <Route exact path='/' element={<Create setToken = {setToken}/>} />
        <Route exact path='/login' element={<Login setToken = {setToken}/> } />
        <Route exact path='/dashboard' element={<SupplierDashboard token = {token}/>} />
        <Route exact path='/live' element={<ConsumerDashboard token = {token}/>} />
      </Routes>
      <Footer/>
      </Router>

    </div>
  );
}
