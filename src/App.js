import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Pages/AuthPages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
