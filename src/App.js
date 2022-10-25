import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Pages/AuthPages/Register';
import SuccessReg from './Pages/AuthPages/SuccessReg';
import OtpPage from './Pages/AuthPages/OtpPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/otp-entry' element={<OtpPage />} />
        <Route path='/success-registration' element={<SuccessReg />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
