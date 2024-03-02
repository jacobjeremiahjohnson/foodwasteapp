import './App.css';
import Header from "./components/Header"
import Footer from "./components/Footer"
import Create from "./components/Create"

export const apiUrl = "http://localhost:3000/api/v1/"

export function App() {
  return (
    <div className="App">
      <Header/>
      <div className="content">
        <Create/>
      </div>
      <Footer/>
    </div>
  );
}
