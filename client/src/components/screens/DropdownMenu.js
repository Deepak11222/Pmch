// components/DropdownMenu.js
import React from 'react';

const DropdownMenu = ({ menuItems }) => {
  return (
    <ul className="dropdown-menu">
      {menuItems.map(menuItem => (
        <li key={menuItem._id}>
          <a href="#">{menuItem.menu_name}</a>
        </li>
      ))}
    </ul>
  );
};

export default DropdownMenu;
