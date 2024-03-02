import './App.css';
import Header from "./components/Header"
import Footer from "./components/Footer"

function App() {
  return (
    <div className="App">
      <Header/>
      <div className="content">
        I'm very hungry
      </div>
      <Footer/>
    </div>
  );
}

export default App;
