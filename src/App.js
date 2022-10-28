import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Pages/AuthPages/Register';
import SuccessReg from './Pages/AuthPages/SuccessReg';
import OtpPage from './Pages/AuthPages/OtpPage';
import SignIn from './Pages/AuthPages/SignIn';
import ForgotPassword from './Pages/AuthPages/ForgotPassword';
import SetNewPassword from './Pages/AuthPages/SetNewPassword';

import Dashboard from './Pages/UserPages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/set-new-password' element={<SetNewPassword />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/otp-entry' element={<OtpPage />} />
        <Route path='/success-registration' element={<SuccessReg />} />
        <Route path="/" exact element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
