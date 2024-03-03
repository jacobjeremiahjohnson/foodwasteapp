import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { apiUrl } from "../App.js"
import { OrderCardList } from "./OrderCardList.js"
import "./styles/Dashboard.css"

export default function ConsumerDashboard(props){
    const navigate = useNavigate()
    const [consumerInfo, setConsumerInfo] = useState({})
    const [orderObject, setOrders] = useState({})
    const [displayOrder, setDisplayOrder] = useState(false)
    const [orderDetails, setOrderDetails] = useState({})

    console.log(orderDetails)

    useEffect(() => {
        if (!props.token){
            navigate("/login")
        }
        fetch(apiUrl + "order/nearby-orders", {
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
            console.log(json.data)
            setOrders(json.data)
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
    }, [navigate, props.token])

    useEffect(() => {
        if(Object.keys(orderObject) === 0){
            return
        }
        setDisplayOrder(true)
        console.log(orderObject)
    }, [orderObject])

    function handleClick(props, data){
        setOrderDetails(data)
    }

    function OrderDetails() {
        
    }

    if(Object.keys(orderObject).length === 0) {
        return (
            <div>
                No data
            </div>
        )
    }

    return(
        <div className = "main">
            <div className = "pageTitle">{consumerInfo.name + " Dashboard"}</div>
            <div className = "horizontalContainer">
            <div className = "orderList">
                <OrderCardList displayOrder={displayOrder} orderObject={orderObject} handleClick={handleClick}/>
            </div>
            <div className = "focusDetails">
                <OrderDetails/>
            </div>
            </div>
        </div>
    )
}