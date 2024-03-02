import React from "react"
import { useState, useEffect } from "react"
import "./styles/Create.css"
import { apiUrl } from "../App"

export default function Login(){

    function createAccount(formData){
        formData.preventDefault()
        const query = {}
        query.name = formData.target[0].value
        query.description = formData.target[0].value
        query.name = formData.target[0].value
        query.name = formData.target[0].value
        query.name = formData.target[0].value

        console.log(formData)
        fetch(apiUrl + '/api/v1/create-account').then(result => {

        })
    }

    return (
        <div className="loginForm">
            <form onSubmit={createAccount} className="form">
                    <input name="name" placeholder="Name"/>
                    <input name="description" placeholder="Description"/>
                    <input name="address" placeholder="Address"/>
                    <input name="username" placeholder="Email"/>
                    <input name="password" placeholder="Password"/>
                    <select name="type">
                        <option value="supplier">Restaurant</option>
                        <option value="consumer">Food Bank</option>
                    </select>
                    <button type="submit">Create Account</button>
            </form>
        </div>
    )
}