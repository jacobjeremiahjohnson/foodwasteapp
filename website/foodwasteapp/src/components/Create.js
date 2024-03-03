import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./styles/Create.css"
import { apiUrl } from "../App"
import Header from "./Header"

export default function Login(props){
    const navigate = useNavigate()

    const [userInfo, setUserInfo] = useState({})
    const [response, setResponse] = useState({})

    useEffect(() => {
        if (Object.keys(response).length === 0){
            return
        }
        console.log(response)
        if (response.message === "Account successfully created"){
            fetch(apiUrl + 'auth/login', {
                method: 'POST',
                mode: 'cors',
                credentials: 'same-origin',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email: userInfo.email, password: userInfo.password})
            })
            .then(response => response.json())
            .then(json => {
                props.setToken(json.data.session_token)
                console.log(userInfo.type)
                if (userInfo.type === "producer"){
                    navigate("/dashboard")
                } else if (userInfo.type === "consumer"){
                    navigate("/live")
                }
            })
        }        
    }, [response, navigate, props, userInfo.email, userInfo.password, userInfo.type])

    useEffect(() => {
        if (Object.keys(userInfo).length === 0){
            return
        }
        console.log(userInfo)
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
        .then(json => {
            setResponse(json)
        })
    }, [userInfo])

    function createAccount(formData){
        formData.preventDefault()

        navigator.geolocation.getCurrentPosition(location => {
            /*
            const practice = {
                name: "Restaurant",
                description: "We make food",
                location: {
                    address: "880 Powder Mill Road",
                    longitude: 0,
                    latitude: 0
                },
                email: "soup@restaurant.com",
                password: 12345678,
                type: "producer"
            }
            */

            const newAccountQuery = {
                name: formData.target[0].value,
                description: formData.target[1].value,
                location: {
                    address: formData.target[2].value,
                    longitude: location.coords.longitude,
                    latitude: location.coords.latitude
                },
                email: formData.target[3].value,
                password: formData.target[4].value,
                type: formData.target[5].value
            }

            setUserInfo(newAccountQuery);
        })
    }

    // function getAddresses(query){
    //     const formattedQuery = encodeURI(query)
    //     fetch("https://nominatim.openstreetmap.org/search?q=" + formattedQuery + "&format=json")
    //     .then()
    // }

    return (
        <div>
            <Header/>
            <div className="main">
            <div className="createForm">
            <div className="title">
                Create your account
            </div>
            <div className="disclaimer">
            Please note that only business addresses
are accepted. Residences and other addresses
are not accepted at this time.
            </div>
            <form onSubmit={createAccount} className="form">
                    <input name="name" placeholder="Name of business"/>
                    <input name="description" placeholder="Describe your business (optional)"/>
                    <input name="address" placeholder="Business address"/>
                    <input name="username" placeholder="Email"/>
                    <input name="password" placeholder="Password"/>
                    <select name="type">
                        <option value="producer">Restaurant</option>
                        <option value="consumer">Food Bank</option>
                    </select>
                    <button type="submit">Create Account</button>
                    <div className="loginLink" onClick={()=>{navigate("/login")}}>
                        Already have an account?
                    </div>
            </form>
            </div>
        </div>
        </div>
    )
}