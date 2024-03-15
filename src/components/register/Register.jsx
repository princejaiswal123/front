import React from 'react'
import "./Register.css"
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
import Loader from "../../components/loader/Loader"

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isViewPassword, setIsViewPassword] = useState(false)
    const [isViewConfirmPassword, setIsViewConfirmPassword] = useState(false)
    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const signupHandler = async () => {
        setLoading(true)
        const formData = new FormData();
        formData.append('fullName', signupData.name);
        formData.append('email', signupData.email);
        formData.append('password', signupData.password);
        formData.append('confirmPassword', signupData.confirmPassword);
        console.log("formData", formData);
        try {
            const response = await axios.post(`${process.env.React_APP_BACKEND_URL}/api/v1/users/register`, formData);
            console.log(response);
            toast.success("Registered successfully")
            setLoading(false)
            navigate("/")
        } catch (error) {
            const err = error?.response?.data?.message
            // console.error(error);
            setLoading(false)
            toast.error(`${err}`)
        }
    }

    return (
        <div className="parent-container">
            <div className="left-container">
                <img src={teddyImg} alt='' className='teddy-container' />
            </div>
            <div className="inner-container">
                <div className="main-container">
                    <div>
                        <div className='outer-form-conatiner '>
                            <h1 className='text-register'>Register</h1>
                            <div className='form-conatiner'>
                                <div className='input-conainer'>
                                    <div><FaRegUser className='icon' /></div>
                                    <input value={signupData.name} onChange={(e) => setSignupData((prev) => ({ ...prev, name: e.target.value }))}
                                        type="text"
                                        placeholder='Name'
                                        className="input" />
                                </div>
                                <div className='input-conainer'>
                                    <div><MdOutlineMailOutline className='icon' /></div>
                                    <input type="text" placeholder='Email' className="input" value={signupData.email} onChange={(e) => setSignupData((prev) => ({ ...prev, email: e.target.value }))} />
                                </div>
                                <div className='input-conainer'>
                                    <div><MdLockOpen className='icon' /></div>
                                    <input type={isViewPassword ? "text" : "password"} className="input" placeholder=' Password' value={signupData.password} onChange={(e) => setSignupData((prev) => ({ ...prev, password: e.target.value }))} />
                                    <div onClick={() => setIsViewPassword((prev) => !prev)}><MdOutlineRemoveRedEye className='icon' /></div>
                                </div>
                                <div className='input-conainer'>
                                    <div><MdLockOpen className='icon' /></div>
                                    <input type={isViewConfirmPassword ? "text" : "password"} className="input" placeholder='Confirm Password' value={signupData.confirmPassword} onChange={(e) => setSignupData((prev) => ({ ...prev, confirmPassword: e.target.value }))} />
                                    <div onClick={() => setIsViewConfirmPassword((prev) => !prev)}><MdOutlineRemoveRedEye className='icon' /></div>
                                </div>
                            </div>
                            <div className='signbtn-container'>
                                <button onClick={async () => await signupHandler()} className="subit-btn">

                                    {loading && (
                                        <div className={`loaderContainer`}>
                                            <Loader />
                                        </div>
                                    )}
                                    {!loading && "Register"}
                                </button>
                                <p onClick={() => signupHandler()} className="have-an-account">
                                    Don't Have an account ?
                                </p>
                                <button onClick={() => navigate("/")} className="go-to-login">
                                    Log in
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register