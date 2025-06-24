import { Route, Routes, Outlet } from 'react-router-dom';
import Login from './features/auth/Login';
import Signup from './features/auth/Signup';
import Dashboard from './features/dashboard/Dashboard';
import SidebarLayout from './layout/SidebarLayout';
import Employee from './features/employees/Employee';
import AddEmployeeForm from './features/employees/Forms/AddEmployeeForm';

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/auth" element={<Outlet />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route element={<SidebarLayout />}>
          <Route path="/" element={<Dashboard />} index />
          <Route path="/employees" element={<Employee />} />
          <Route path="/employees/add-new" element={<AddEmployeeForm />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
