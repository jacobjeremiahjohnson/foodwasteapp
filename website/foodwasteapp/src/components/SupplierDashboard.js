import React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { apiUrl } from "../App.js"

export default function SupplierDashboard(props){
    const navigate = useNavigate()

    const [producerInfo, setProducerInfo] = useState({})

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
    return(
        <div className = "main">
            {props.token}
        </div>
    )
}