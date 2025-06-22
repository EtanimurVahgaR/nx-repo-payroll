import React, { useState, useCallback } from 'react';
import SidebarItem from './SidebarItem';

// --- Menu Data ---
const menuData = [
  { label: 'Cryptocurrency', icon: '💳', children: [] },
  { label: 'Devices', icon: '💻', children: [] },
  { label: 'Magazines', icon: '🎬', children: [] },
  {
    label: 'Store',
    icon: '🏬',
    children: [
      {
        label: 'Clothes',
        children: [
          { label: "Women's Clothing", children: [] },
          { label: "Men's Clothing", children: [] },
        ],
      },
      { label: 'Jewelry', children: [] },
      { label: 'Music', children: [] },
      { label: 'Grocery', children: [] },
    ],
  },
  { label: 'Collections', icon: '📦', children: [] },
  { label: 'Credits', icon: '💳', children: [] },
];

const Sidebar: React.FC = () => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    Store: false,
    'Store/Clothes': false,
    "Store/Clothes/Women's Clothing": false,
    "Store/Clothes/Men's Clothing": false,
  });
  const [collapsed, setCollapsed] = useState(false);
  const [activeLeafKey, setActiveLeafKey] = useState<string | null>(null);

  // Get sibling keys for toggling
  const getSiblingKeys = useCallback((key: string) => {
    const parts = key.split('/');
    if (parts.length === 1) return [];
    parts.pop();
    const parentKey = parts.join('/');
    // Recursively find parent item
    function findParent(items: any[], key: string): any {
      if (!key) return { children: items };
      const [first, ...rest] = key.split('/');
      const found = items.find((item) => item.label === first);
      if (!found) return null;
      if (rest.length === 0) return found;
      return findParent(found.children || [], rest.join('/'));
    }
    const parentItem = findParent(menuData, parentKey);
    return (
      parentItem?.children?.map((child: any) =>
        parentKey ? `${parentKey}/${child.label}` : child.label
      ) || []
    );
  }, []);

  // Toggle open/close for group or set active for leaf
  const toggleItem = useCallback(
    (key: string, hasChildren: boolean) => {
      const siblingKeys = getSiblingKeys(key);
      if (hasChildren) {
        setOpenItems((prev) => {
          const isOpening = !prev[key];
          const newState = { ...prev };
          siblingKeys.forEach((sib: string) => {
            newState[sib] = false;
          });
          newState[key] = isOpening;
          return newState;
        });
        setActiveLeafKey(null);
      } else {
        // Open all parent toggles for the chosen leaf
        const parentKeys: string[] = [];
        let parent = key.split('/');
        while (parent.length > 1) {
          parent.pop();
          parentKeys.push(parent.join('/'));
        }
        setOpenItems((prev) => {
          const newState = { ...prev };
          Object.keys(newState).forEach((k) => {
            if (newState[k]) newState[k] = false;
          });
          parentKeys.forEach((k) => {
            if (k) newState[k] = true;
          });
          return newState;
        });
        setActiveLeafKey(key);
      }
    },
    [getSiblingKeys]
  );

  // Expand sidebar and open group or set active for leaf
  const expandAndOpenItem = useCallback(
    (key: string, hasChildren: boolean) => {
      setCollapsed(false);
      const siblingKeys = getSiblingKeys(key);
      if (hasChildren) {
        setOpenItems((prev) => {
          const newState = { ...prev };
          siblingKeys.forEach((sib: string) => {
            newState[sib] = false;
          });
          newState[key] = true;
          return newState;
        });
        setActiveLeafKey(null);
      } else {
        // Open all parent toggles for the chosen leaf
        const parentKeys: string[] = [];
        let parent = key.split('/');
        while (parent.length > 1) {
          parent.pop();
          parentKeys.push(parent.join('/'));
        }
        setOpenItems((prev) => {
          const newState = { ...prev };
          Object.keys(newState).forEach((k) => {
            if (newState[k]) newState[k] = false;
          });
          parentKeys.forEach((k) => {
            if (k) newState[k] = true;
          });
          return newState;
        });
        setActiveLeafKey(key);
      }
    },
    [getSiblingKeys]
  );

  return (
    <div
      className="bg-sidebar text-white h-screen font-sans text-[15px] overflow-y-auto shadow-[2px_0_8px_rgba(0,0,0,0.13)] transition-all duration-200 rounded-2xl rounded-tl-none rounded-bl-none"
      style={{ width: collapsed ? 64 : 270 }}
    >
      <div
        className={`border-b border-white/15 font-semibold text-[17px] flex items-center min-h-[56px] opacity-70 ${
          collapsed ? 'justify-center py-4 px-0' : 'justify-between py-4 px-5'
        }`}
      >
        {collapsed ? (
          <button
            className="bg-none border-none text-white text-[22px] cursor-pointer p-0"
            aria-label="Expand sidebar"
            onClick={() => setCollapsed(false)}
          >
            ≡
          </button>
        ) : (
          <>
            All Collections
            <span
              className="cursor-pointer font-normal text-[20px]"
              onClick={() => setCollapsed(true)}
              aria-label="Collapse sidebar"
            >
              ×
            </span>
          </>
        )}
      </div>
      <div
        className={collapsed ? 'flex items-center justify-center flex-col' : ''}
      >
        {menuData.map((item) => (
          <SidebarItem
            key={item.label}
            item={item}
            openItems={openItems}
            toggleItem={toggleItem}
            collapsed={collapsed}
            expandAndOpenItem={expandAndOpenItem}
            activeLeafKey={activeLeafKey}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
