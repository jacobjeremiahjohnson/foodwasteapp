import './App.css';
import Header from "./components/Header"
import Footer from "./components/Footer"
import Create from "./components/Create"
import Login from "./components/Login"
import SupplierDashboard from "./components/SupplierDashboard"
import ConsumerDashboard from "./components/ConsumerDashboard"
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

export const apiUrl = "http://localhost:3000/api/v1/"

export function App() {
  return (
    <div className="App">
      <Router>
      <Header/>
      <Routes>
        <Route exact path='/' element={<Create />} />
        <Route exact path='/login' element={<Login /> } />
        <Route exact path='/dashboard' element={<SupplierDashboard />} />
        <Route exact path='/live' element={<ConsumerDashboard />} />
      </Routes>
      <Footer/>
      </Router>

    </div>
  );
}
