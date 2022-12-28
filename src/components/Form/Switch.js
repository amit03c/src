import React from "react";
import { motion } from "framer-motion";

const Switch = ({isOn,setIsOn}) => {
  const toggleSwitch = () => setIsOn(!isOn);

  return (
    <>
      <div className="switch" dataison={isOn.toString()} onClick={toggleSwitch}>
        <motion.div className="handle" layout transition={spring} />
      </div>
    </>
  );
};

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30
};

export default Switch;