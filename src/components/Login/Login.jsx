
import React from 'react'
import styles from "./Login.module.css"
import { useState } from 'react'
import axios from 'axios'
import teddyImg from "../../images/Art.svg"
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { MdLockOpen } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import Loader from "../../components/loader/Loader"

const Login = () => {
    const navigate = useNavigate();
    const [isView, setIsView] = useState(false)
    const [loading, setLoading] = useState(false);
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })
    // console.log("hii");
    // console.log(process.env.React_APP_BACKEND_URL);

    const loginHandler = async () => {
        const obj = {
            email: loginData.email,
            password: loginData.password
        }
        setLoading(true)
        try {
            const response = await axios.post(`${process.env.React_APP_BACKEND_URL}/api/v1/users/login`, obj);
            const userId = response?.data?.data?.user?._id
            const accessToken = response?.data?.data?.accessToken
            const refreshToken = response?.data?.data?.refreshToken
            // console.log(response, "res");
            Cookies.set('name', 'value')
            Cookies.set("accessToken", accessToken)
            Cookies.set("refreshToken", refreshToken)
            navigate("/dashboard")
            localStorage.setItem("@auth", userId);
            localStorage.setItem("accessToken", accessToken);
            setLoading(false)
            toast.success("Logged in successfully.")
        } catch (error) {
            console.error(error, "error");
            console.error(error?.response?.data?.message, "error.response.data");
            setLoading(false)
            const err = error?.response?.data?.message
            toast.error(`${err}`)
        }
    }
    return (
        <div className={styles.parentContainer}>
            <div className={styles.leftContainer}>
                <img src={teddyImg} alt='' />
            </div>
            <div className={styles.innerContainer}>
                <div className={styles.mainContainer}>
                    <div>
                        <div className='outer-form-conatiner '>
                            <h1 className={styles.textRegister}>Login</h1>
                            <div className={styles.formConatiner}>

                                <div className={styles.inputConainer}>
                                    <div><MdOutlineMailOutline className={styles.icon} /></div>
                                    <input type="text" placeholder='Email'  className={styles.input} value={loginData.email} onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))} />
                                </div>
                                <div className={styles.inputConainer}>
                                    <div><MdLockOpen className={styles.icon} /></div>
                                    <input type={isView ? "text" : "password"} className={styles.input} placeholder=' Password' value={loginData.password} onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))} />
                                    <div onClick={() => setIsView((prev) => !prev)}><MdOutlineRemoveRedEye className='icon' /></div>
                                </div>
                            </div>
                            <div className={styles.signbtnContainer}>
                                <button onClick={() => loginHandler()} className={styles.subitBtn}>
                                    {loading && (
                                        <div className={styles.loaderContainer}>
                                            <Loader />
                                        </div>
                                    )}
                                    {!loading && "Log In"}
                                </button>
                                <p className={styles.haveAnAccount}>
                                    Have an account ?
                                </p>
                                <button onClick={() => navigate("/register")} className={styles.goToLogin}>
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login