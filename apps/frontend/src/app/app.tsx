import { Route, Routes, Outlet } from 'react-router-dom';
import Login from './features/auth/Login';
import Signup from './features/auth/Signup';
import Dashboard from './features/dashboard/Dashboard';
import SidebarLayout from './layout/SidebarLayout';

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/auth" element={<Outlet />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
      <Routes>
        <Route element={<SidebarLayout />}>
          <Route path="/" element={<Dashboard />} index />
          <Route path="/2" element={<>2</>} />
          <Route path="/3" element={<>3</>} />
          <Route path="/4" element={<>4</>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
