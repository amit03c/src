import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Image from "../Elements/Image";

const UserMenu = () => {

  const logout = () => {
    
  }

  const dropdownData = [
    {_id:1, label: 'Profile', icon:'fa-circle-user', hasLink:true, link:'/profile', function:'', standout:false},
    {_id:2, label: 'Settings', icon:'fa-gear', hasLink:true, link:'/settings', function:'', standout:false},
    {_id:3, label: 'Logout', icon:'fa-arrow-right-from-arc', hasLink:false, link:'/logout', function:logout(), standout:true},
  ]

  

  return (
    <>
      <div className="usermenu dropdown">
        <button type="button" className="dropdown-toggle" data-bs-toggle="dropdown">
          <div className="usermenu-image">
            <Image src={'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'} alt={'Administrator'} width={'100%'} height={'100%'} effect={'blur'}/>
          </div>
          <div className="usermenu-title">Administrator</div>
        </button>
        <div className="dropdown-menu dropdown-menu-end">
          <AnimatePresence>
          {dropdownData.map((item) =>(
            <motion.div
            key={item._id}
            initial={{ opacity: 0,}}
            animate={{ opacity: 1, }}
            exit={{ opacity: 0, }}
            >
              {item.hasLink?
              (
                <Link to={item.link} className={"usermenu-item" + (item.standout?' standOut':'')} onClick={() => item.function}>
                  <div className="icon">
                    <i className={"fa-regular fa-fw " + (item.icon)}></i>
                  </div>
                  <div className="title">{item.label}</div>
                </Link>
              ):(
                <button type="button" className={"usermenu-item" + (item.standout?' standOut':'')} onClick={() => item.function}>
                  <div className="icon">
                    <i className={"fa-regular fa-fw " + (item.icon)}></i>
                  </div>
                  <div className="title">{item.label}</div>
                </button>
              )
              }
              
            </motion.div>
          ))}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default UserMenu;