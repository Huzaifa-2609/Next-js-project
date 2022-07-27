import React from "react";
import { useState } from 'react';
import CoinbaseLogo from '../assets/cb-logo.png';
import Image from 'next/image';

import { navItems } from '../static/navItems';

const Sidebar = () => {
  const [activeIcon, setActiveIcon] = useState(navItems[0].title);
  return (
    <div className="WrapperSideBar">
      <div className="LogoContainerSide">
        <div className="LogoSide">
          CRYFTS
        </div>
      </div>
      <div className="NavItemsContainerSide">
        {navItems.map((item) => (
          <div className="NavItemSide" key={item.title} onClick={() => setActiveIcon(item.title)}>
            <div className="NavIconSide" style={{ marginTop:"5px", color: item.title === activeIcon && "#8d1212" }}>
              {item.icon}
            </div>
            <div>{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
