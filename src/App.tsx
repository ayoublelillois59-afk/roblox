import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import AdhkarPage from './pages/Adhkar';
import DhikrPage from './pages/Dhikr';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/adhkar" element={<AdhkarPage />} />
        <Route path="/dhikr" element={<DhikrPage />} />
      </Routes>
    </Router>
  );
}

export default App;
