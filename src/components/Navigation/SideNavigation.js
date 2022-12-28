import React from 'react';
import { NavLink } from "react-router-dom";

const SideNavigation = ({data}) => {
  return (
    <>
      <ul className="navigation-menu">
        {data.map((item) => (
        <li key={item._id}>
          <NavLink to={item.link} className="navigation-items">
            <div className="icon">
              <i className={"fa-light fa-fw " + (item.icon)}></i>
            </div>
            <div className="title">{item.label}</div>
          </NavLink>
        </li>
        ))}
      </ul>
    </>
  );
};

export default SideNavigation;