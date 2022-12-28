import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link, NavLink } from "react-router-dom";

const TopNavigation = ({data}) => {
  const location = useLocation();
  return ( 
    <>
      <ul className="tabbed-navigation">
        {data.map((item) => (
        <li key={item._id}>
          <Link to={item.link+item.search} className={"navigation-items " + ((location.search === item.search)?'active':'')}>{item.label}</Link>
        </li>
        ))}
      </ul>
    </>
  );
};

export default TopNavigation;