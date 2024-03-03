import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { apiUrl } from "../App.js"
import "./styles/Dashboard.css"

export default function ConsumerDashboard(props){
    const navigate = useNavigate()
    const [consumerInfo, setConsumerInfo] = useState({})
    const [orders, setOrders] = useState({})

    useEffect(() => {
        if (!props.token){
            navigate("/login")
        }
        console.log(props.token)
        fetch(apiUrl + "orders/my-orders", {
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
            setOrders(json)
        })

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
            setConsumerInfo(json.data)
        })
    }, [])

    function orderCard(){
        const orderItems = orders.orders.map((order) => 
            <li key={order.id}>
                <div className = "imageContainer">
                    Image
                </div>
                <div className = "textContent">
                    {order.description}
                </div>
                <div className = "claimButton">
                    button
                </div>
            </li>
        )
        return(
        <div className = "orderCard">
            <ul>
                {orderItems}
            </ul>
        </div>
        )
    }

    return(
        <div className = "main">
            <div className = "title">{consumerInfo.name + " Dashboard"}</div>
            <div className = "orderList">
                {orderCard}
            </div>
        </div>
    )
}