import React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { apiUrl } from "../App.js"
import "./styles/SupplierDashboard.css"

import picker from "../assets/picker.png"

async function imageToImageUrl(file) {
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
    }, [orderInfo])

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
                        <div className="formTitle">
                            Create listing
                        </div>
                        <input name="description" placeholder="Description of order"/>
                        <input name="expiration" placeholder="Minutes until offer closes"/>
                        <div className="weightLabel">
                            How much food is able to be donated?
                        </div>
                        <input name="weight" placeholder="How much food is able to be donated (lbs.)"/>
                        <input name="image-url" type="file" onChange={onImageChange}></input>
                        <img className="uploadedImg" src={imageUrl} alt="Your custom upload"/>
                        <button type="submit">Upload!</button>
                    </form>
                </div>
                <div className = "widgetContainer">

                </div>
            </div>
        </div>
    )
}