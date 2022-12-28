import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Image from "../Elements/Image";

const dropdownData = [
  {
    _id:1, 
    user: "Sujan Dey", 
    image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.", 
    date: "16 Nov 2022", 
    link: "/",
    isUnread: true
  },
  {
    _id:2, 
    user: "Sujay Mondal", 
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.", 
    date: "16 Nov 2022", 
    link: "/",
    isUnread: true
  },
  {
    _id:3, 
    user: "Subhajit Saha", 
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTN8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.", 
    date: "16 Nov 2022", 
    link: "/",
    isUnread: true
  },
  {
    _id:4, 
    user: "Chinmoy Ghosh", 
    image: "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDF8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.", 
    date: "16 Nov 2022", 
    link: "/",
    isUnread: false
  },
  {
    _id:5, 
    user: "Soumya Ghosh", 
    image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.", 
    date: "16 Nov 2022", 
    link: "/",
    isUnread: false
  },
  {
    _id:6, 
    user: "Madhumita Maity", 
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.", 
    date: "16 Nov 2022", 
    link: "/",
    isUnread: false
  },
  {
    _id:7, 
    user: "Animesh Manna", 
    image: "https://images.unsplash.com/photo-1544168190-79c17527004f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.", 
    date: "16 Nov 2022", 
    link: "/",
    isUnread: false
  },
  {
    _id:8, 
    user: "Sangita Manna", 
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.", 
    date: "16 Nov 2022", 
    link: "/",
    isUnread: false
  },
]

const Notifications = () => {

  return (
    <>
      <div className="notification dropdown">
        <button type="button" className="dropdown-toggle" data-bs-toggle="dropdown">
          <i className="fa-light fa-fw fa-bullhorn fa-rotate-n30"></i>
          <motion.div className="count" whileHover={{ scale: 1.5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>12</motion.div>
        </button>
        <div className="dropdown-menu dropdown-menu-end">
          <div className="dropdown-header">
            <i className="fa-solid fa-fw fa-bullhorn"></i> Notifications
          </div>
          <div className="dropdown-body scrollbar">
            <AnimatePresence>
            {dropdownData.map((item) =>(
              <motion.div
              key={item._id}
              initial={{ opacity: 0,}}
              animate={{ opacity: 1, }}
              exit={{ opacity: 0, }}
              >
                <Link to="/" className="notification-item">
                  <div className="notification-image">
                    <Image src={item.image} alt={item.user} width={'100%'} height={'100%'} effect={'blur'}/>
                  </div>
                  <div className="notification-content">
                    <div className="notification-title">{item.user}</div>
                    <div className="notification-data">{item.text}</div>
                    <div className="notification-time">{item.date}</div>
                  </div>
                </Link>
              </motion.div>
            ))}
            </AnimatePresence>
          </div>
          <div className="dropdown-footer">
            <Link to="/notifications" className="link">See all notifications</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;