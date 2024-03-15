import React from 'react'
import styles from"./MainDashBoard.module.css"
import Sidebar from './Sidebar/Sidebar'

const MainDashBoard = ({ children }) => {
  return (
    <div className={styles.outercontainermaindashboard}>
        <div className={styles.innercontdashboard}>
        <Sidebar/>
        </div>
       <div className={styles.dashboard}>
        {children}
        </div>
    </div>
  )
}

export default MainDashBoard