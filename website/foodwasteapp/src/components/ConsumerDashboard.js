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
    const [orderDetails, setOrderDetails] = useState({})

    // async function imageToImageUrl(file) {
    //     const body = new FormData()
    //     body.append("image", file)
    //     console.log(body)
    //     try {
    //         const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_img_bb_api_key}`, {
    //             method: "POST",
    //             body: body
    //         })
    //         const json = await res.json()
    //         return json.data.image.url
    //     } catch(ex) {
    //         console.error(ex)
    //         alert("error uploading image")
    //     }
    // }

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

    function handleClick(props, data){
        setOrderDetails(data)
    }

    function OrderDetails(props) {
        console.log(props)
            return(
                <div>
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
                </div>
            )
    }

    function OrderCard(props){
        console.log(props)

        return(
            <div>
            <div className="orderContainer">
                <div className="imageContainer">
                    <img className="image" src={props.data.image_url} />
                </div>
                <div className="orderTextContainer">
                    <div className="restaurantTitle">
                        {props.data.name}
                    </div>
                    <div className="address">
                        {props.data.location.address}
                    </div>
                    <div className="description">
                        {props.data.description}
                    </div>
                </div>
                {props.data.status === "expired" && 
                    <div className="expirationNotifier" style = {{ backgroundColor: "#BD0008" }}>
                        <div className="emojiContainer">
                            🗑️
                        </div>
                        <div className="expiration">
                            {props.data.status}
                        </div>
                    </div>
                    }
                    {
                        props.data.status === "closed" &&
                        <div className="expirationNotifier" style = {{ backgroundColor: "grey" }}>
                            <div className="emojiContainer">
                            ✔️
                            </div>
                                <div className="expiration">
                            {props.data.status}
                            </div>
                        </div>
                    }
                    {
                        props.data.status === "open" &&
                        <button className="expirationNotifier" style = {{ backgroundColor: "#90C418" }} onClick={(e) => {
                            handleClick(e, props.data)
                        }}>
                            <div className="emojiContainer">
                            🕒
                            </div>
                            <div className="expiration" >
                            {props.data.status}
                            </div>
                        </button>
                    }
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
            <div className = "pageTitle">{consumerInfo.name + " Dashboard"}</div>
            <div className = "horizontalContainer">
            <div className = "orderList">
                <OrderCardList />
            </div>
            <div className = "focusDetails">
                <OrderDetails data={orderDetails}/>
            </div>
            </div>
        </div>
    )
}