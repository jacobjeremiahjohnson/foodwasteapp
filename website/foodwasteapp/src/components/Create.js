import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./styles/Create.css"
import { apiUrl } from "../App"

export default function Login(){
    const navigate = useNavigate()

    const [userInfo, setUserInfo] = useState({})
    const [response, setResponse] = useState({})

    useEffect(() => {
        console.log(response)
        if (Object.keys(response).length === 0){
            return
        }
        if (response.message === "Account successfully created"){
            if (userInfo.type === "supplier"){
                navigate("/dashboard")
            } else if (userInfo.type === "consumer"){
                navigate("/live")
            }
        }        
    }, [response])

    useEffect(() => {
        if (Object.keys(userInfo).length === 0){
            return
        }
        fetch(apiUrl + 'auth/create-account/', {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userInfo)
        })
        .then(response => response.json())
        .then(json => setResponse(json))
    }, [userInfo])

    function createAccount(formData){
        console.log("button pressed")
        formData.preventDefault()
        const query = {}
        query.name = formData.target[0].value
        query.description = formData.target[1].value
        query.location = {
            address: formData.target[2].value,
            longitude: 39.677047,
            latititude: -75.760772
        }
        query.email = formData.target[3].value
        query.password = formData.target[4].value
        query.type = formData.target[5].value

        const practice = {
            name: "Restaurant",
            description: "We make food",
            location: {
                address: "880 Powder Mill Road",
                longitude: 0,
                latitude: 0
            },
            email: "restaurant@restaurant.com",
            password: 12345678,
            type: formData.target[5].value
        }   

        setUserInfo(practice)
    }

    return (
        <div className="loginForm main">
            <form onSubmit={createAccount} className="form">
                    <input name="name" placeholder="Name"/>
                    <input name="description" placeholder="Description"/>
                    <input name="address" placeholder="Address"/>
                    <input name="username" placeholder="Email"/>
                    <input name="password" placeholder="Password"/>
                    <select name="type">
                        <option value="producer">Restaurant</option>
                        <option value="consumer">Food Bank</option>
                    </select>
                    <button type="submit">Create Account</button>
            </form>
        </div>
    )
}