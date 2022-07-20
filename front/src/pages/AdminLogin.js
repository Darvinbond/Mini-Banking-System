import React, { useState } from 'react'
import axios from 'axios'
import {add_a_tra, add_a_users, alogged, new_route} from '../actions'
import {useDispatch} from 'react-redux'

export default function AdminLogin() {
    const dispatch = useDispatch()
    const [User, setUser] = useState("")
    const [Pass, setPass] = useState("")

    function handleUserChange(e){
        setUser(e.target.value)
    }

    function handlePasswordChange(e){
        setPass(e.target.value)
    }

    function handleSubmit(){
        if(User == "" || Pass == ""){
            document.querySelector(".lgn").classList.remove("hidden")
            setTimeout(
                "document.querySelector('.lgn').classList.add('hidden')"
            , 1500);
        }else{
            if(User == "admin" && Pass == "admin"){
                axios.get('http://127.0.0.1:8000/api/transactions/')
                .then((resa) => {
                    dispatch(
                        add_a_tra(resa)
                    )
                })
                .then((re) => {
                    axios.get('http://127.0.0.1:8000/api/customers/')
                    // .then((res) => {
                    //     dispatch(
                    //         add_a_users(res)
                    //     )
                    // })
                    .then(ss => {
                        document.querySelector(".lg").classList.remove("hidden")
                        setTimeout(
                            "document.querySelector('.lg').classList.add('hidden')"
                        , 1500);
                    })
                    .then(sss => {
                        dispatch(
                            new_route("home")
                        )
                        dispatch(
                            alogged()
                        )
                        window.location.href = "http://localhost:3000/admin/home";
                    })
                    .catch(err => {
                        console.log(err)
                    })
                })
                .catch(er => {
                    console.log(er)
                })
            }else{
                document.querySelector(".lgn").classList.remove("hidden")
                setTimeout(
                    "document.querySelector('.lgn').classList.add('hidden')"
                , 1500);
            }
        }
    }
    return (
        <div className="flex h-full w-full flex-col pt-40 items-center">
            <div className="lgn hidden absolute right-3 top-10 overflow-hidden w-64 h-20 flex justify-center items-center border-2 border-yellow-500 bg-yellow-200 text-gray-900 rounded-xl">
                <div className="flex-grow flex justify-center items-start">
                    Check Your inputs
                </div>
            </div>
            <div className="lg hidden absolute right-3 top-10 overflow-hidden w-64 h-20 flex justify-center items-center border-2 border-green-500 bg-green-200 text-gray-900 rounded-xl">
                <div className="flex-grow flex justify-center items-start">
                <svg className="w-6 h-6 mr-4 text-green-600 font-extrabold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg> Successful
                </div>
            </div>
            <div className="text-6xl font-black mb-16 flex flex-col justify-center items-center">Admin <span className="text-3xl">Login</span></div>
            <div className="w-80 bg-gray-400 flex justify-center mb-5 h-10 border-2 border-gray-600 rounded-lg overflow-hidden  "><input onChange={handleUserChange} type="text" className="w-full outline-none h-full px-2" placeholder="Username"/></div>
            <div className="w-80 bg-gray-400 flex justify-center h-10 border-2 border-gray-600 rounded-lg overflow-hidden  "><input onChange={handlePasswordChange} type="password" className="w-full outline-none h-full px-2" placeholder="Password"/></div>
            <div onClick={handleSubmit} className="w-24 cursor-pointer h-10 hover:bg-green-600 bg-green-500 rounded-xl flex justify-center items-center text-gray-100 mt-10">Login</div>
        </div>
    )
}
