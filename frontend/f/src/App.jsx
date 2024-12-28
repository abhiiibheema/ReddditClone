import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Explore from './pages/Explore';
import './App.css';
import HomePage from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Welcome to the Organization Explorer</h1>} />
        <Route path="/explore" element={<Explore />} />
        <Route path='/home' element={<HomePage />}/>
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
