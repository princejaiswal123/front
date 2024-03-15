"use client";
import React, { useEffect,FC } from "react";
// import OutsideClickHandler from "../../utils/OutsideClickHandler";
import OutsideClickHandler from "../../utils/OutsideClickHandler";
import styles from "./Modal.module.css"


// interface Props{
//     isOpen:any,
//     children:any,
//     setOpen:any
// }
const Modal = ({ isOpen, children, setOpen }) => {
  if (!isOpen) {
    return <></>;
  }

 

  return (
    <div className={styles.overlay}>
      <OutsideClickHandler
        onClick={() => {
          setOpen(false);
          document.body.classList.remove('no-scroll')
        }}
      >
        {children}
      </OutsideClickHandler>
    </div>
  );
};

export default Modal;
