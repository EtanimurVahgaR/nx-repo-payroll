import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SidebarContextType {
  lastClickedInOutlet: boolean;
  setLastClickedInOutlet: (value: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [lastClickedInOutlet, setLastClickedInOutlet] = useState(false);

  return (
    <SidebarContext.Provider
      value={{ lastClickedInOutlet, setLastClickedInOutlet }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebarContext must be used within a SidebarProvider');
  }
  return context;
};
