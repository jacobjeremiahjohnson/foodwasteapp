import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { apiUrl } from "../App.js"
import "./styles/Dashboard.css"

export default function ConsumerDashboard(props){
    const navigate = useNavigate()
    const [consumerInfo, setConsumerInfo] = useState({})
    const [orderObject, setOrders] = useState({})
    const [displayOrder, setDisplayOrder] = useState(false)

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
    }, [])

    useEffect(() => {
        if(Object.keys(orderObject) === 0){
            return
        }
        setDisplayOrder(true)
        console.log(orderObject)
    }, [orderObject])

    function OrderCard(props){
        console.log(props)

        return(
            <div>
            <div className="orderContainer">
                <div className="imageContainer">
                    {props.data.image_url}
                </div>
                <div className="orderTextContainer">
                    <div className="restaurantTitle">
                        {props.data.name}
                    </div>
                    <div className="address">
                        {props.data.address}
                    </div>
                    <div className="description">
                        {props.data.description}
                    </div>
                </div>
                <div className="expirationNotifier">
                    {props.data.status}
                </div>
            </div>
            </div>
        )
    }

    function OrderCardList(){
        if (displayOrder){
            console.log(orderObject.orders)
            const arr = orderObject.orders
            return(
                <ul>
                    {arr.map(function(order){
                        return (
                        <li key={order.id}>
                            <OrderCard data={order}/>
                        </li>
                        )
                    }
                    )}
                </ul>
            )
        } else {
            console.log("not displaying orders")
            return(
            <div>
                
            </div>)
        }
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
            <div className = "title">{consumerInfo.name + " Dashboard"}</div>
            <div className = "orderList">
                <OrderCardList />
            </div>
        </div>
    )
}