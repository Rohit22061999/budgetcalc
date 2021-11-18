import './App.css';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChangePassword from './ChangePassword';
function App() {
  return (
    <div >
      <Router>
        <Routes>
          <Route path="/" exact element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="*" element={<div>Nothing is here</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
