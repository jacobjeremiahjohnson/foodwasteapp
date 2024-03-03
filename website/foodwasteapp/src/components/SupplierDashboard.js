import React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { apiUrl } from "../App.js"
import "./styles/SupplierDashboard.css"
import picker from "../assets/picker.png"
import { OrderCardList } from "./OrderCardList.js"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from "react-chartjs-2"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

async function imageToImageUrl(file) {
    console.log(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_img_bb_api_key}`)
    const body = new FormData()
    body.append("image", file)
    try {
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_img_bb_api_key}`, {
            method: "POST",
            body: body
        })
        const json = await res.json()
        return json.data.image.url
    } catch(ex) {
        console.error(ex)
        alert("error uploading image")
    }
}

export default function SupplierDashboard(props){
    const navigate = useNavigate()

    const [producerInfo, setProducerInfo] = useState({})
    const [orderInfo, setOrderInfo] = useState({})
    const [imageUrl, setImageUrl] = useState(picker)

    const [myOrderList, setMyOrderList] = useState({})

    useEffect(() => {
        if (!props.token){
            navigate("/login")
        }

        fetch(apiUrl + "order/my-orders", {
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
            setMyOrderList(json.data)
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
            setProducerInfo(json.data)
        })
    }, [navigate, props.token])

    useEffect(() => {
        if (Object.keys(orderInfo).length === 0){
            return
        }
        fetch(apiUrl + "order/send-order", {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                "Content-Type": "application/json",
                "session-token": props.token
            },
            body: JSON.stringify(orderInfo)
        })
        .then(response => response.json())
        .then(json => {
            console.log(json)
        })
    }, [orderInfo, props.token])

    function handleClick(props, data){
        setMyOrderList(data)
    }

    function onImageChange(e) {
        setImageUrl(URL.createObjectURL(e.target.files[0]))
    }

    async function createOrder(formData){
        formData.preventDefault()

        if(formData.target[3].files.length !== 1) return console.log("invalid number of files selected")

        const imageUrl = await imageToImageUrl(formData.target[3].files[0])
        const query = {
            minutes_to_expire: formData.target[1].value,
            description: formData.target[0].value,
            image_url: imageUrl,
            pounds: formData.target[2].value
        }
        console.log(query)
        setOrderInfo(query)
    }

    return(
        <div className = "main">
             <div className = "dashboardTitle">{producerInfo.name + " Dashboard"}</div>
             <div className = "dashboardContainer">
                <div className = "formContainer">
                    <form onSubmit={createOrder} className="dashboardForm">
                        <h2 className="formTitle">Create listing</h2>
                        <div>
                            <label for="supplyDescription">Describe your donation</label>
                            <input id="supplyDescription" name="description" placeholder="Description"/>
                        </div>
                        <div>
                            <label for="supplyExpiration">How many minutes until this listing expires?</label>
                            <input id="supplyExpiration" name="expiration" placeholder="Minutes"/>
                        </div>
                        <div>
                            <label for="supplyWeight">How many pounds of food is this donation?</label>
                            <input id="supplyWeight" name="weight" placeholder="Weight"/>
                        </div>
                        <div id="uploadImageDiv">
                            <label for="supplyImage">Upload an image of your donation</label>
                            <img className="uploadedImg" src={imageUrl} alt="Your custom upload"/>
                            <input id="supplyImage" name="image-url" type="file" onChange={onImageChange}/>
                        </div>
                        <button type="submit">Upload!</button>
                    </form>
                </div>
                <div className = "widgetContainer">
                    <h2>You've donated <b>85</b> pounds of food this week</h2>
                    <Bar
                        className="barChart"
                        data={{
                            labels: ["2/26", "2/27", "2/28", "2/29", "3/1", "3/2", "3/3"],
                            datasets: [
                                {
                                    label: "Pounds",
                                    data: [8, 7, 7, 8, 3, 6, 6],
                                    backgroundColor: "blue",
                                }
                            ]
                        }}
                        options={{
                            maintainAspectRatio: true,
                            responsive: true,
                            plugins: {
                                legend: {
                                    display: false
                                },
                                title: {
                                    display: true,
                                    text: "Pounds of food donated"
                                }
                            }
                        }}
                    />
                    <OrderCardList displayOrder={true} orderObject={myOrderList} handleClick={handleClick}/>
                </div>
            </div>
        </div>
    )
}