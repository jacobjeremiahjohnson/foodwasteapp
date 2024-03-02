import React from "react"
import { useNavigate } from "react-router-dom"
import "../App.css"

export default function Header(){
    const navigate = useNavigate()

    return (
    <div>
        <div className="header">
            <button className="loginButton" onClick={() => {
                navigate("/login")
            }}>Log In</button>
        </div>
    </div>
    )
}