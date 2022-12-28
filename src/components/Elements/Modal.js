import React, { useEffect, useState } from 'react';

const Modal = ({title, isOpen, size, modalClose = () => {}, children}) => {

  useEffect(() => {
    if(isOpen === true){
      const body = document.getElementsByTagName("BODY")[0];
      body.style.overflow = 'hidden';
    }else{
      const body = document.getElementsByTagName("BODY")[0];
      body.style.overflow = '';
    }
  },[isOpen])

  return (
    <>
      <div className={"dialog-box" + (isOpen?' active':'')}>
        <div className="dialog-box-backdrop"></div>
        <div className="dialog-box-inner">
          <div className={"dialog-box-content" + (" " + size)}>
            <button type="button" className="dialog-box-close" onClick={modalClose}>
              <i className="fa-light fa-fw fa-xmark"></i>
            </button>
            <div className="dialog-box-header">
              <div className="dialog-box-title">{title}</div>
            </div>
            <div className="dialog-box-body scrollbar">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;