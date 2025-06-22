import React, { memo } from 'react';
import { RightArrow, DownArrow } from './SidebarIcons';
import { isInOpenChain, getLighterSidebarColor } from './sidebarUtils';

export type SidebarItemProps = {
  item: any;
  depth?: number;
  openItems: Record<string, boolean>;
  toggleItem: (key: string, hasChildren: boolean) => void;
  parentKey?: string;
  collapsed?: boolean;
  expandAndOpenItem?: (key: string, hasChildren: boolean) => void;
  activeLeafKey?: string | null;
};

const SidebarItem: React.FC<SidebarItemProps> = memo(
  ({
    item,
    depth = 0,
    openItems,
    toggleItem,
    parentKey = '',
    collapsed = false,
    expandAndOpenItem,
    activeLeafKey,
  }) => {
    const hasChildren = item.children?.length > 0;
    const key = parentKey ? `${parentKey}/${item.label}` : item.label;
    const isOpen = openItems[key];
    const isActiveChain = isInOpenChain(parentKey, openItems) || isOpen;
    const isActiveLeaf = !hasChildren && activeLeafKey === key;
    // A chosen option is either a leaf that matches activeLeafKey, or a group whose any descendant is chosen
    const isChosen =
      isActiveLeaf ||
      (hasChildren &&
        item.children.some((child: any) => {
          const childKey = key + '/' + child.label;
          if (child.children?.length) {
            // Recursively check for chosen in children
            return (
              childKey === activeLeafKey ||
              isDescendantChosen(child, childKey, activeLeafKey ?? null)
            );
          }
          return childKey === activeLeafKey;
        }));
    const bgColor =
      isActiveChain || isActiveLeaf ? getLighterSidebarColor(depth) : undefined;

    // Helper to check if any descendant is chosen
    function isDescendantChosen(
      node: any,
      nodeKey: string,
      activeKey: string | null
    ): boolean {
      if (!node.children) return false;
      return node.children.some((child: any) => {
        const childKey = nodeKey + '/' + child.label;
        if (childKey === activeKey) return true;
        if (child.children?.length)
          return isDescendantChosen(child, childKey, activeKey ?? null);
        return false;
      });
    }

    if (collapsed)
      return (
        <div
          className="flex items-center justify-center cursor-pointer border rounded-full w-[50px] h-[50px] mb-2 relative"
          title={item.label}
          style={{ background: getLighterSidebarColor(depth + 2) }}
          onClick={() =>
            expandAndOpenItem && expandAndOpenItem(key, hasChildren)
          }
        >
          {isChosen && (
            <span className="absolute left-0 top-0 w-4 h-4 bg-white rounded-full" />
            // <></>
          )}
          {item.icon && <span>{item.icon}</span>}
        </div>
      );

    return (
      <div className="relative">
        <div
          className="flex items-center h-9 m-2 rounded-2xl cursor-pointer"
          style={{
            marginLeft: 16 + depth * 16,
            paddingLeft: 10,
            background: bgColor,
          }}
          onClick={() => toggleItem(key, hasChildren)}
        >
          {isChosen && <span className="mr-2 w-2 h-2 bg-white rounded-full" />}
          {item.icon && <span className="mr-2 text-[18px]">{item.icon}</span>}
          <span className="flex-1">{item.label}</span>
          {hasChildren && (
            <span className="ml-2 pr-3">
              {isOpen ? <DownArrow /> : <RightArrow />}
            </span>
          )}
        </div>
        {hasChildren &&
          isOpen &&
          item.children.map((child: any) => (
            <SidebarItem
              key={child.label}
              item={child}
              depth={depth + 1}
              openItems={openItems}
              toggleItem={toggleItem}
              parentKey={key}
              collapsed={collapsed}
              expandAndOpenItem={expandAndOpenItem}
              activeLeafKey={activeLeafKey}
            />
          ))}
      </div>
    );
  }
);
SidebarItem.displayName = 'SidebarItem';

export default SidebarItem;
