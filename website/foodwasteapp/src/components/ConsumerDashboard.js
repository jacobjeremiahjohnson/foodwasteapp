import React from "react"

export default function ConsumerDashboard(props){
    return(
        <div className = "main">
            {props.token}
        </div>
    )
}