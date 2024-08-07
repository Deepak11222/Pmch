// components/MenuItem.js
import React from 'react';
import DropdownMenu from './DropdownMenu';

const MenuItem = ({ menuItem }) => {
  const { _id, menu_name, children } = menuItem;

  return (
    <li className={children ? 'dropdown' : ''}>
      <a href="#">{menu_name}</a>
      {children && <DropdownMenu menuItems={children} />}
    </li>
  );
};

export default MenuItem;
