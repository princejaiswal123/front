import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Protected = ({ children }) => {
    const navigate=useNavigate()
    useEffect(() => {
        if (!!!localStorage.getItem("@auth")) {
            navigate("/")
        }
    }, [])
    return (
        <div>
            {
                localStorage.getItem("@auth") ?
                    children
                    :
                    null
            }
        </div>
    )
}

export default Protected