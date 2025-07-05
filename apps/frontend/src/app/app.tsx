import { Route, Routes, Outlet, useNavigate } from 'react-router-dom';
import Login from './features/auth/Login';
import Signup from './features/auth/Signup';
import Dashboard from './features/dashboard/Dashboard';
import SidebarLayout from './layout/SidebarLayout';
import Employee from './features/employees/Employee';
import AddEmployeeForm from './features/employees/Forms/AddEmployeeForm';
import { removeToken, isAuthenticated } from './utils/authUtils';
import Attendance from './features/attendance/Attendance';

export function App() {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate('/auth/login');
  };

  return (
    <div>
      {isAuthenticated() && (
        <button
          onClick={handleLogout}
          style={{ position: 'absolute', top: 10, right: 10 }}
        >
          Logout
        </button>
      )}
      <Routes>
        <Route path="/auth" element={<Outlet />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route element={<SidebarLayout />}>
          <Route path="/" element={<Dashboard />} index />
          <Route path="/employees" element={<Employee />} />
          <Route path="/employees/add-new" element={<AddEmployeeForm />} />
          <Route path="/attendance" element={<Attendance />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
