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
    const [claimedOrder, setClaimedOrder] = useState({})
    const [orderIsClaimed, setOrderIsClaimed] = useState(false)

    useEffect(() => {
        if(Object.keys(claimedOrder).length === 0){
            return
        }

        console.log(claimedOrder.data.id)
        const query = {
            id: claimedOrder.data.id
        }
        console.log(query)
        console.log(props.token)

        fetch(apiUrl + "order/claim-order", {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                "Content-Type": "application/json",
                "Session-Token": props.token
            },
            body: JSON.stringify(query)
        })
        .then(response => response.json())
        .then(json =>{
            console.log(json)}
        )

    }, [claimedOrder])

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
    }, [navigate, props.token, claimedOrder])

    useEffect(() => {
        if(Object.keys(orderObject) === 0){
            return
        }
        setDisplayOrder(true)
    }, [orderObject])

    function handleClick(props, data){
        setOrderDetails(data)
    }

    function claim(e, args){
        console.log(args.data.id)
        setClaimedOrder(args)
    }

    function OrderDetails(props) {
        if(Object.keys(props.data).length === 0) {
            return(<div></div>)
        }
            return(
                <div className="focusDetails">
                    <div className="focusedOrderTitle">
                        {props.data.name}
                    </div>
                    <div className="focusedAddress">
                        {props.data.location.address}
                    </div>
                    <div className="focusedImageContainer">
                        <img className="focusedImage" src={props.data.image_url}/>
                    </div>
                    <div className="focusedOrderDescription">
                        {props.data.description}
                    </div>
                    <button className="claimButton" onClick={(e) => {
                        claim(e, props)
                    }}>
                        Claim!
                    </button>
                </div>
            )
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
                <OrderDetails data={orderDetails}/>
            </div>
        </div>
    )
}