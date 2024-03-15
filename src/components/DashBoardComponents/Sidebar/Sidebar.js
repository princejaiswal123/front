import React, { useState } from 'react'
import styles from "./Sidebar.module.css"
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-toastify'
import { RiLogoutBoxRLine } from "react-icons/ri";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineAnalytics } from "react-icons/md";
import { FaDiceD6 } from "react-icons/fa";
import Cookies from 'js-cookie'
import box from "../../../images/codesandbox.svg"
import Modal from '../../Modal/modal'
import { CircularProgress } from "@mui/material";


const Sidebar = () => {
  const { auth } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate()
  console.log(auth?.data?._id);

  const logoutHandler = async () => {
    console.log("insile logout handler");
    const token = localStorage.getItem('accessToken');
    console.log(token, 'token');
    setIsModalOpen(true)

    try {
      const response = await axios.post(`${process.env.React_APP_BACKEND_URL}/api/v1/users/logout`, { name: "sonal" }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log("from logout hadnler", response);
      localStorage.removeItem("@auth");
      localStorage.removeItem("accessToken");
      Cookies.remove('accessToken')
      Cookies.remove('refreshToken')

      navigate("/")
      setIsModalOpen(false)

      toast.success("Logged out successfully.")
    } catch (error) {
      const err = error?.response?.data?.message
      toast.error(`${err}`)
      setIsModalOpen(false)

    }
  }
  return (
    <div className={styles.outerSidebar}>
      <div className={styles.innderSidebar}>
        <NavLink to={"/#"}>
          <h3
            className={styles.proClass}>
            <div><img src={box} /> </div>

            <h5 className={styles.linkText}>Pro Manage</h5></h3>
        </NavLink>
        <NavLink to={"/dashboard"}>
          <h3
            className={styles.linkClass}
            style={{
              backgroundColor: window.location.pathname === "/dashboard" && "#EEF2F5",
              color: window.location.pathname === "/dashboard" && "black", fontWeight: window.location.pathname === "/dashboard" && "500"
            }}
          >
            <div className={styles.icons}><MdOutlineSpaceDashboard className={styles.text} /></div>
           <h5 className={styles.linkText}>Board</h5></h3>
        </NavLink>
        <NavLink to={"/analytics"}>
          <h3
            className={styles.linkClass}
            style={{
              backgroundColor: window.location.pathname === "/analytics" && "#EEF2F5",
              color: window.location.pathname === "/analytics" && "black", fontWeight: window.location.pathname === "/analytics" && "500"
            }}
          >
            <div className={styles.icons}><MdOutlineAnalytics className={styles.text} /></div>
            <h5 className={styles.linkText}>Analytics</h5></h3>
        </NavLink>
        <NavLink to={"/settings"}>
          <h3
            className={styles.linkClass}
            style={{
              backgroundColor: window.location.pathname === "/settings" && "#EEF2F5",
              color: window.location.pathname === "/settings" && "black", fontWeight: window.location.pathname === "/settings" && "500"
            }}
          >
            <div className={styles.icons}>
              <IoSettingsOutline className={styles.text} />
            </div>
           <h5 className={styles.linkText}> Settings</h5></h3>
        </NavLink>
      </div>
      <div>
        <button
          onClick={async () => await logoutHandler()}
          className={styles.logout}>
          <div className={styles.icons}><RiLogoutBoxRLine className={styles.text} /></div>
          <p className={styles.linkText}>Logout</p></button>
      </div>
      <Modal isOpen={isModalOpen} setOpen={setIsModalOpen}>
        <div className={styles.flexCol}>
          <CircularProgress className={styles.circularProgress}></CircularProgress>
          <p className={styles.processingText}>
            Processing...
          </p>
        </div>
      </Modal>
    </div>
  )
}

export default Sidebar