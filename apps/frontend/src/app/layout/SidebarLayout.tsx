import React from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from '../components/shared/Sidebar/Sidebar';
import {
  SidebarProvider,
  useSidebarContext,
} from '../components/shared/Sidebar/SidebarContext';

const SidebarLayout = () => {
  const { lastClickedInOutlet, setLastClickedInOutlet } = useSidebarContext();

  const handleOutletClick = () => {
    setLastClickedInOutlet(true);
  };

  return (
    <div className="flex h-screen w-screen bg-gray-50">
      <Sidebar collapsedExternally={lastClickedInOutlet} />
      <div
        className="flex-1 p-5 overflow-y-auto bg-bg-LIGHTEST"
        onClick={handleOutletClick}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default function SidebarLayoutWithProvider() {
  return (
    <SidebarProvider>
      <SidebarLayout />
    </SidebarProvider>
  );
}
