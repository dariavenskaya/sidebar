import React, { useState } from "react";
import Menu, { type MenuItem } from "../../../external/Menu";
import { Lineicons } from "@lineiconshq/react-lineicons";
import {
  Home2Outlined,
  Gear1Outlined,
  DashboardSquare1Outlined,
  ShiftLeftOutlined,
  ShiftRightOutlined,
  Message2Outlined,
  BoxArchive1Outlined,
} from "@lineiconshq/free-icons";
import { useNavigate } from "react-router-dom";

export const AppMenu: React.FC = () => {
  const [activeItem, setActiveItem] = useState("");

  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const navigate = useNavigate();

  const handleClick = (label: string) => {
    setActiveItem(label);
    navigate(label.toLowerCase());
  };

  const items: MenuItem[][] = [
    [
      {
        label: "Home",
        icon: <Lineicons icon={Home2Outlined} />,
      },
      {
        label: "Dashboard",
        icon: <Lineicons icon={DashboardSquare1Outlined} />,
      },
      {
        label: "Messages",
        icon: <Lineicons icon={Message2Outlined} />,
      },
      {
        label: "Inventory",
        icon: <Lineicons icon={BoxArchive1Outlined} />,
        subItems: ["Supplies", "Products"],
      },
    ],
    [
      {
        label: "Settings",
        icon: <Lineicons icon={Gear1Outlined} />,
      },
    ],
  ];

  const wrapperClassName = `fixed left-0 bg-gray-100 dark:bg-gray-900 ${
    isMobile ? "w-full flex-row bottom-0 p-2" : "flex-col top-0 h-full p-5"
  }`;
  return (
    <div className={wrapperClassName}>
      <Menu
        items={items}
        expandElement={<Lineicons icon={ShiftRightOutlined} />}
        shrinkElement={<Lineicons icon={ShiftLeftOutlined} />}
        active={activeItem}
        onClick={handleClick}
        horizontal={isMobile}
        classNames={{
          element: `flex row items-center gap-2 w-full text-left px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
            isMobile ? "flex-col text-xs" : "flex-row items-center"
          }`,
          active: "bg-blue-50 dark:bg-blue-900/20",
          expandedMenu: "flex-1",
          shrankMenu: "flex-1",
          hr: "border-t border-gray-200 dark:border-gray-700",
          expandButton: "mt-6 justify-end",
          subMenu: `flex flex-col gap-2 ${
            isMobile ? "bg-gray-100 dark:bg-gray-900 w-full py-2" : "m-2"
          }`,
          subItem: `px-2 py-1.5 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors list-disc list-inside ${
            isMobile
              ? "text-xs"
              : "before:content-['•_'] before:text-gray-400 text-sm"
          }`,
          subItemActive: "bg-blue-50 dark:bg-blue-900/20",
        }}
      />
    </div>
  );
};

export default AppMenu;
