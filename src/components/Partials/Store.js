import React, { useState } from "react";
import Switch from "../Form/Switch";

const Store = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <>
      <div className="store">
        <div className="store-switch">
          <Switch isOn={isOn} setIsOn={setIsOn}/>
        </div>
        <div className="store-info">
          <h2 className="store-title">Dabbawala</h2>
          <div className="store-text">Akshya Naga 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016</div>
        </div>
      </div>
    </>
  );
};

export default Store;