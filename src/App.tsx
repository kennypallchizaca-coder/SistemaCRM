import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import InteresadosPage from './pages/InteresadosPage';
import { ScrollToTopButton } from './components/layout';

function App() {
  return (
    <Router>
      <ScrollToTopButton />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/interesados" element={<InteresadosPage />} />
      </Routes>
    </Router>
  );
}

export default App;
