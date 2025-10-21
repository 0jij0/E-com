// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* We'll add more routes here later, e.g., /products, /cart */}
        </Routes>
      </main>
    </>
  );
}

export default App;