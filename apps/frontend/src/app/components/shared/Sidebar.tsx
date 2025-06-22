import React, { useState } from 'react';

const menuData = [
  {
    label: 'Cryptocurrency',
    icon: '💳',
    children: [],
  },
  {
    label: 'Devices',
    icon: '💻',
    children: [],
  },
  {
    label: 'Magazines',
    icon: '🎬',
    children: [],
  },
  {
    label: 'Store',
    icon: '🏬',
    children: [
      {
        label: 'Clothes',
        children: [
          {
            label: "Women's Clothing",
            children: [],
          },
          {
            label: "Men's Clothing",
            children: [],
          },
        ],
      },
      { label: 'Jewelry', children: [] },
      { label: 'Music', children: [] },
      { label: 'Grocery', children: [] },
    ],
  },
  {
    label: 'Collections',
    icon: '📦',
    children: [],
  },
  {
    label: 'Credits',
    icon: '💳',
    children: [],
  },
];

const SidebarItem = ({
  item,
  depth = 0,
  openItems,
  toggleItem,
  parentKey = '',
  collapsed = false,
}: any) => {
  const hasChildren = item.children && item.children.length > 0;
  const key = parentKey ? `${parentKey}/${item.label}` : item.label;
  const isOpen = openItems[key];

  if (collapsed) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 48,
          cursor: 'pointer',
        }}
        title={item.label}
      >
        {item.icon && <span style={{ fontSize: 22 }}>{item.icon}</span>}
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 16 + depth * 16,
          height: 36,
          cursor: hasChildren ? 'pointer' : 'default',
          background: isOpen ? '#2563eb22' : 'transparent',
        }}
        onClick={() => hasChildren && toggleItem(key)}
      >
        {item.icon && (
          <span style={{ marginRight: 8, fontSize: 18 }}>{item.icon}</span>
        )}
        <span style={{ flex: 1 }}>{item.label}</span>
        {hasChildren && (
          <span style={{ marginLeft: 8 }}>{isOpen ? '▾' : '▸'}</span>
        )}
      </div>
      {hasChildren && isOpen && (
        <div>
          {item.children.map((child: any) => (
            <SidebarItem
              key={child.label}
              item={child}
              depth={depth + 1}
              openItems={openItems}
              toggleItem={toggleItem}
              parentKey={key}
              collapsed={collapsed}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = () => {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({
    Store: false,
    'Store/Clothes': false,
    "Store/Clothes/Women's Clothing": false,
    "Store/Clothes/Men's Clothing": false,
  });
  const [collapsed, setCollapsed] = useState(false);

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div
      style={{
        width: collapsed ? 64 : 270,
        background: '#2563eb',
        color: '#fff',
        height: '100vh',
        fontFamily: 'sans-serif',
        fontSize: 15,
        overflowY: 'auto',
        boxShadow: '2px 0 8px #0002',
        transition: 'width 0.2s',
      }}
    >
      <div
        style={{
          padding: collapsed ? '16px 0' : '16px 20px',
          borderBottom: '1px solid #ffffff22',
          fontWeight: 600,
          fontSize: 17,
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          opacity: 0.7,
          minHeight: 56,
        }}
      >
        {collapsed ? (
          <button
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: 22,
              cursor: 'pointer',
              padding: 0,
            }}
            aria-label="Expand sidebar"
            onClick={() => setCollapsed(false)}
          >
            ≡
          </button>
        ) : (
          <>
            All Collections
            <span
              style={{
                cursor: 'pointer',
                fontWeight: 400,
                fontSize: 20,
                marginLeft: 8,
              }}
              onClick={() => setCollapsed(true)}
              aria-label="Collapse sidebar"
            >
              ×
            </span>
          </>
        )}
      </div>
      <div>
        {menuData.map((item) => (
          <SidebarItem
            key={item.label}
            item={item}
            openItems={openItems}
            toggleItem={toggleItem}
            collapsed={collapsed}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
