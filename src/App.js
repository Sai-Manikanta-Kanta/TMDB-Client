import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Search from './components/Search';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/search/:movieName" Component={Search} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
