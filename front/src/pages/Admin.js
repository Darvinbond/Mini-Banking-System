import React, { useState, useEffect } from 'react'
import AdminHome from './AdminHome'
import AdminTransaction from './AdminTransaction'
import AdminDeposit from './AdminDeposit'
import {useDispatch, useSelector} from 'react-redux'
import {aunlogged, clear_a_tra, clear_a_users, new_route, clear_route} from '../actions'

export default function Admin() {
    const [home, sethome] = useState(true)
    const [tra, settra] = useState(false)
    const [dep, setdep] = useState(false)
    const dispatch = useDispatch()
    const state = useSelector(state => state.aroute)

    function handleTra(){
        dispatch(
            new_route("transaction")
        )
    }
    function handleHome(){
        dispatch(
            new_route("home")
        )
    }
    function handleDep(){
        dispatch(
            new_route("action")
        )
    }
    function handleLogout(){
        dispatch(
            clear_a_users()
        )
        dispatch(
            clear_a_tra()
        )
        dispatch(
            aunlogged()
        )
        dispatch(
            clear_route("home")
        )
    }
    return (
        <div className="flex h-screen text-gray-900 bg-gray-100 flex-col">
            <div className="py-3 shadow-lg h-16 flex justify-center items-center text-3xl font-bold">Admin Panel</div>
            <div className="flex w-full h-full overflow-y-hidden">
                <div className="w-2/12 pt-2 shadow-xl h-full flex flex-col items-center">
                    <div className="w-full flex justify-center items-center h-12 text-green-500 text-4xl font-black">Resonate</div>
                    <div className="text-2xl font-bold mb-10">Bank</div>
                    {
                        state === "home"?
                        <div onClick={handleHome} className="w-full cursor-pointer font-bold text-gray-100  flex justify-center items-center h-12 mb-5 bg-green-400 transition duration-300 border-r-4 border-gray-100">Home</div>
                        :
                        <div onClick={handleHome} className="w-full cursor-pointer font-bold hover:text-gray-100  flex justify-center items-center h-12 mb-5 hover:bg-green-400 text-gray-700 transition duration-300 border-r-4 border-gray-100">Home</div>
                    }
                    {
                        state === "transaction"?
                        <div onClick={handleTra} className="w-full cursor-pointer font-bold text-gray-100  flex justify-center items-center h-12 mb-5 bg-green-400 transition duration-300 border-r-4 border-gray-100">Transactions</div>
                        :
                        <div onClick={handleTra} className="w-full cursor-pointer font-bold hover:text-gray-100  flex justify-center items-center h-12 mb-5 hover:bg-green-400 text-gray-700 transition duration-300 border-r-4 border-gray-100">Transactions</div>
                    }
                    {
                        state === "action"?
                        <div onClick={handleDep} className="w-full cursor-pointer font-bold text-gray-100  flex justify-center items-center h-12 mb-5 bg-green-400 transition duration-300 border-r-4 border-gray-100">Actions</div>
                        :
                        <div onClick={handleDep} className="w-full cursor-pointer font-bold hover:text-gray-100  flex justify-center items-center h-12 mb-5 hover:bg-green-400 text-gray-700 transition duration-300 border-r-4 border-gray-100">Actions</div>
                    }
                    <div onClick={handleLogout} className="w-full cursor-pointer font-bold flex justify-center items-center h-12 border-gray-100 ease-in-out border-b-4 hover:text-red-500 hover:border-red-500 text-gray-700 transition duration-300">Logout</div>
                </div>
                <div className="w-10/12 h-full">
                    {state === 'home' ? <AdminHome handleTra={handleTra} /> : ""}
                    {state === 'transaction' ? <AdminTransaction /> : ""}
                    {state === 'action' ? <AdminDeposit /> : ""}
                    
                </div>
            </div>
        </div>
    )
}
