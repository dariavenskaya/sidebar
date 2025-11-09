import React, { useEffect, useMemo, useState } from "react";

/**
 * A menu item with a label, icon, and sub items.
 * @param label - The label of the menu item.
 * @param icon - The icon of the menu item.
 * @param subItems - The sub items of the menu item.
 */
export type MenuItem = {
  label: string;
  icon: React.ReactNode;
  subItems?: string[];
};

interface MenuProps {
  items: MenuItem[][];
  onClick: (label: string) => void;
  expandElement?: React.ReactNode | string;
  shrinkElement?: React.ReactNode | string;
  active?: string;
  horizontal?: boolean;
  classNames?: {
    element?: string;
    active?: string;
    menu?: string;
    expandedMenu?: string;
    shrankMenu?: string;
    hr?: string;
    expandButton?: string;
    subMenu?: string;
    subItem?: string;
    subItemActive?: string;
  };
}

/**
 * Customizable menu component with horizontal and vertical support. Use your own icons and styles!
 *
 * @param items - The menu items to display (can be nested), required, array of arrays of MenuItem.
 * @param onClick - The function to call when a menu item is clicked, required, function that takes a string and returns void.
 * @param expandElement - The element to display when the menu is expanded, optional, React.ReactNode or string (default: "expand").
 * @param shrinkElement - The element to display when the menu is shrunk, optional, React.ReactNode or string (default: "shrink").
 * @param active - The active menu item, optional, string.
 * @param horizontal - Whether the menu is horizontal, optional, boolean.
 * @param classNames - The class names to apply to the menu, optional, object with the following properties: element, active, menu, expandedMenu, shrankMenu, hr, expandButton, subMenu, subItem, subItemActive.
 */
export const Menu: React.FC<MenuProps> = ({
  items,
  onClick,
  expandElement = "expand",
  shrinkElement = "shrink",
  active = "",
  horizontal = false,
  classNames = {
    element: "",
    active: "",
    menu: "",
    expandedMenu: "",
    shrankMenu: "",
    hr: "",
    expandButton: "",
    subMenu: "",
    subItem: "",
    subItemActive: "",
  },
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [subMenuExpanded, setSubMenuExpanded] = useState<string>();

  const isActive = useMemo(
    () => (label: string) => {
      if (active === label) return true;

      // If the label has subItems, check if any subItem is active
      for (const section of items) {
        const menuItem = section.find((item) => item.label === label);
        if (
          menuItem &&
          menuItem.subItems &&
          menuItem.subItems.includes(active)
        ) {
          return true;
        }
      }
      return false;
    },
    [active, items]
  );

  useEffect(() => {
    if (horizontal) {
      setExpanded(true);
    }
  }, [horizontal]);

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
    if (subMenuExpanded) {
      setSubMenuExpanded(undefined);
    }
  };

  const toggleSubMenu = (label: string) => {
    if (!expanded) {
      setExpanded(true);
    }
    setSubMenuExpanded((prev) => (prev === label ? undefined : label));
  };

  const handleSubItemClick = (label: string) => {
    onClick(label);
    if (horizontal) {
      setSubMenuExpanded(undefined);
    }
  };
  const renderMenuItem = (item: MenuItem) => {
    return (
      <li
        key={item.label}
        className={`list-none ${
          expanded ? classNames.expandedMenu : classNames.shrankMenu
        }
        ${horizontal ? "relative" : ""}`}
      >
        <button
          onClick={() => {
            if (item.subItems) {
              toggleSubMenu(item.label);
            } else {
              onClick(item.label);
            }
          }}
          className={`${classNames.element} ${
            isActive(item.label) ? classNames.active : ""
          } ${horizontal ? "flex-col" : "flex-row items-center"}`}
          aria-checked={isActive(item.label)}
          role="menuitem"
        >
          {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
          {expanded && <span className="flex-1">{item.label}</span>}
        </button>
        {subMenuExpanded === item.label && (
          <ul
            className={`${horizontal ? "absolute bottom-full left-0" : ""} ${
              classNames.subMenu
            }`}
          >
            {item.subItems?.map((subItem) => (
              <li key={subItem}>
                <button
                  onClick={() => handleSubItemClick(subItem)}
                  className={`${
                    classNames.subItem ? classNames.subItem : classNames.element
                  } ${
                    isActive(subItem)
                      ? classNames.subItemActive
                        ? classNames.subItemActive
                        : classNames.active
                      : ""
                  }`}
                >
                  {subItem}
                </button>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <nav
      role="menu"
      className={`flex ${
        horizontal ? "flex-row items-center" : "flex-col"
      } h-full justify-between ${classNames.menu ? classNames.menu : ""}`}
    >
      <ul
        className={`${
          horizontal ? "flex flex-row items-center" : "flex-col"
        } space-y-1 flex-1 ${classNames.menu ? classNames.menu : ""}`}
      >
        {items.map((group, groupIdx) => (
          <React.Fragment key={groupIdx}>
            {group.map((item) => renderMenuItem(item))}
            {groupIdx !== items.length - 1 && (
              <li aria-hidden="true" className="my-2">
                <hr className={classNames.hr} />
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>

      {!horizontal && (
        <button
          className={classNames.expandButton}
          onClick={() => toggleExpand()}
        >
          {expanded ? shrinkElement : expandElement}
        </button>
      )}
    </nav>
  );
};

export default Menu;
