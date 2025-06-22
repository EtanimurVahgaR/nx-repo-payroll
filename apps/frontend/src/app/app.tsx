import { Route, Routes, Outlet } from 'react-router-dom';
import Login from './features/auth/Login';
import Signup from './features/auth/Signup';
import Dashboard from './features/dashboard/Dashboard';
import SidebarLayout from './layout/SidebarLayout';

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SidebarLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/auth" element={<Outlet />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
