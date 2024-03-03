import React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { apiUrl } from "../App.js"
import "./styles/SupplierDashboard.css"

export default function SupplierDashboard(props){
    const navigate = useNavigate()

    const [producerInfo, setProducerInfo] = useState({})
    const [orderInfo, setOrderInfo] = useState({})

    useEffect(() => {
        if (!props.token){
            navigate("/login")
        }
        fetch(apiUrl + "account/me", {
            method: 'GET',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                "Content-Type": "application/json",
                "session-token": props.token
            }
        })
        .then(response => response.json())
        .then(json => {
            setProducerInfo(json.data)
        })
    }, [])

    useEffect(() => {
        fetch(apiUrl + "order/send-order", {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderInfo)
        })
        .then(response => response.json())
        .then(json => {
            console.log(json)
        })
    }, [orderInfo])

    function createOrder(formData){
        formData.preventDefault()
        const query = {
            minutes_to_expire: formData.target[0].value,
            description: formData.target[1].value,
            image_url: formData.target[2].value,
            pounds: formData.target[3].value
        }
        console.log(query)
        setOrderInfo(query)
    }

    return(
        <div className = "main">
             <div className = "title">{producerInfo.name + " Dashboard"}</div>
             <div className = "formContainer">
                    <form onSubmit={createOrder} className="form">
                        <input name="description" placeholder="Description of order"/>
                        <input name="expiration" placeholder="Minutes to expire (approx.)"/>
                        <input name="weight" placeholder="How much food is able to be donated (lbs.)"/>
                        <button type="submit">Upload!</button>
                    </form>
                </div>
        </div>
    )
}