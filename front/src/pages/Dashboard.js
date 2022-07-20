import React, { useState } from 'react'
import Main from './Main'
import Transfer from './Transfer'
import Edit from './Edit'
import {connect} from 'react-redux'
import { add_data, update_data, clear_data, clear_tra } from '../actions'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'

export default function Dashboard(props) {
  const details = useSelector(state => state.detail)["user"]
  const dispatch = useDispatch()
  const [transfer, settransfer] = useState(false)
  const [main, setmain] = useState(true)
  const [edit, setedit] = useState(false)
    const data = props.data;
    const [count, setcount] = useState(0)

    function handleLogout(){
        dispatch(
            clear_data()
        )
        dispatch(
            clear_tra()
        )
        // window.location.href = "/"
    }

    function handleGoTransfer(){
        settransfer(true)
        setmain(false)
        setedit(false)
        document.querySelector(".trs").classList.add("bg-gray-400");
        document.querySelector(".hm").classList.remove("bg-gray-400");
        document.querySelector(".ed").classList.remove("bg-gray-400");
    }

    function handleGoEdit(){
        console.log("edit")
        setedit(true)
        settransfer(false)
        setmain(false)

        document.querySelector(".trs").classList.remove("bg-gray-400");
        document.querySelector(".hm").classList.remove("bg-gray-400");
        document.querySelector(".ed").classList.add("bg-gray-400");
    }

    function handleGoHome(){
        settransfer(false)
        setmain(true)
        setedit(false)
        document.querySelector(".trs").classList.remove("bg-gray-400");
        document.querySelector(".hm").classList.add("bg-gray-400");
        document.querySelector(".ed").classList.remove("bg-gray-400");
        // window.location.assign("/transfer")
    }

    return (
        <div className="bg-gray-200 flex h-full w-full">
            <div className="font-bold hidden sm:w-1/6 px-4 py-10 bg-black sm:flex flex-col items-center text-white">
                <div className="mb-16 flex flex-col justify-center items-center">
                    <div className="mb-4 rounded-full overflow-hidden w-36 h-36"><img src={details.passport} alt="avatar"/></div>
                    <div className="font-normal text-green-400">Welcome, {details.fname}</div>
                </div>
                <div onClick={handleGoHome} className="hm transition duration-300 mb-6 hover:bg-green-400 hover:text-black w-full flex justify-center items-center h-10 rounded cursor-pointer">
                    Home
                </div>
                <div onClick={handleGoTransfer} className="trs transition duration-300 mb-6 hover:bg-green-400 hover:text-black w-full flex justify-center items-center h-10 rounded cursor-pointer">
                    Make Transfer
                </div>
                <div onClick={handleGoEdit} className="ed transition duration-300 mb-6 hover:bg-green-400 hover:text-black w-full flex justify-center items-center h-10 rounded cursor-pointer">
                    Change Login
                </div>
                <div onClick={handleLogout} className="transition duration-300  hover:bg-red-500 text-white w-full flex justify-center items-center h-10 rounded cursor-pointer">
                    Logout
                </div>
            </div>
            <div className="sm:w-5/6 w-full sm:px-4 px-2 pt-2 bg-white">
                { main === true ? <Main /> : "" }
                { transfer === true ? <Transfer /> : "" }
                { edit === true ? <Edit /> : "" } 
            </div>
        </div>
    )
}
