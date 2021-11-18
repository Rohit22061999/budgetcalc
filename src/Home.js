import React from 'react'
import Budget from './Budget'
import Navi from './Navi'
import {Navigate} from 'react-router-dom'
export default function Home() {
    return (
        <>
        {localStorage.getItem("user") != undefined ?

        <div>
            <Navi/>
            <Budget/>

        </div>:<Navigate to ="/"/>}
        </>
    )
}
