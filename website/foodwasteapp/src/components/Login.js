import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { apiUrl } from "../App.js"
import "./styles/Login.css"

export default function Login(props){
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState({})
    const [response, setResponse] = useState({})

    useEffect(() => {
        if (Object.keys(userInfo).length === 0){
            return
        }

        fetch(apiUrl + 'auth/login', {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userInfo)
        })
        .then(response => response.json())
        .then(json =>{
            setResponse(json)}
        )
    }, [userInfo])

    useEffect(() => {
        if (Object.keys(response).length === 0){
            return
        }
        console.log(response.data.session_token)
        props.setToken(response.data.session_token)
        if(response.data.type === "producer"){
            navigate("/dashboard")
        } else if (response.data.type === "consumer"){
            navigate("/live")
        }
    }, [response])

    function login(formData){
        formData.preventDefault()
        let query = {}
        query.email = formData.target[0].value
        query.password = formData.target[1].value
        setUserInfo(query)
    }

    return (
        <div className = "main">
        <div className = "loginForm">
            <div className="title">
                Log In
            </div>
            <form onSubmit={login} className="form">
                <input name="username" placeholder="Email"/>
                <input name="password" placeholder="Password"/>
                <button type="submit">Log In</button>
            </form>
        </div>
        </div>
    )
}