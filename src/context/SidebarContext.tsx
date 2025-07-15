import React, { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';

interface SidebarContextType {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  effectiveCollapsed: boolean;
  setEffectiveCollapsed: (collapsed: boolean) => void;
  sidebarWidth: number;
  collapsedWidth: number;
  getContentPadding: () => string;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [effectiveCollapsed, setEffectiveCollapsed] = useState(false);
  const sidebarWidth = 280;
  const collapsedWidth = 100;

  const getContentPadding = useCallback(() => {
    return '120px'; // Constant padding for both collapsed and expanded states
  }, []);

  const value = useMemo(() => ({
    collapsed,
    setCollapsed,
    effectiveCollapsed,
    setEffectiveCollapsed,
    sidebarWidth,
    collapsedWidth,
    getContentPadding,
  }), [collapsed, effectiveCollapsed, getContentPadding]);

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}; 