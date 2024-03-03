import React from "react"
import { ReactComponent as Logo } from "../assets/logo.svg"
import "../App.css"

export default function Header(){
    return (
        <div>
            <Logo className="leftoversLogo"/>
        </div>
    )
}