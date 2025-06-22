import Sidebar from '../components/shared/Sidebar/Sidebar';

import { Outlet } from 'react-router-dom';

const SidebarLayout = () => {
  return (
    <div className="flex h-screen w-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default SidebarLayout;
