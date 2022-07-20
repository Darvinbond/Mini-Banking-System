import React, { useState } from 'react'
import {connect} from 'react-redux'
import { add_tra, add_data } from '../actions'
import {useSelector, useDispatch} from 'react-redux'
import $ from 'jquery';
import moment from 'moment'
import axios from 'axios'
import { BrowserRouter as Router, Route, Link, useParams } from "react-router-dom";


function Main() {
    const details = useSelector(state => state.detail)["user"]
    const dispatch = useDispatch()
    const [Data, setData] = useState(useSelector(state => state.transaction))
    const transactions = useSelector(state => state.transaction)
    const dat = transactions
    const [open, setopen] = useState(false)
    var expanded = false



    function handleRefresh(){
        axios.get('http://127.0.0.1:8000/api/transactions/')
        .then((resa) => {
            const flt1 = Object.values(resa.data).filter(value => (value.see === 0 || value.see === details.id) && (value.to_acc === details.acc_no))
            if(flt1.length >= 1){
                dispatch(
                    add_tra(
                        flt1
                    )
                )
                var d = [flt1,]
                console.log(d)
                setData(d)
            }
            console.log(Data)
        })
        .then(ee =>{
            axios.get('http://127.0.0.1:8000/api/customers/')
            .then((res) => {
                const flt = Object.values(res.data).filter(value => value.id === details.id)
                if(flt.length == 1){
                    document.querySelector(".lg").classList.remove("hidden")
                    setTimeout(
                        "document.querySelector('.lg').classList.add('hidden')"
                    , 2000);
                }else{
                    document.querySelector(".nolgn").classList.remove("hidden")
                    setTimeout(
                        "document.querySelector('.nolgn').classList.add('hidden')"
                    , 1500);
                }
            })
            .catch(err => console.log(err))
        })
        
    }
    function handleSearch(e){
        // setData(false)
        var pst = []
        if(e.target.value != ""){
            transactions[0].forEach(eac => {
                if(eac.from_acc.toLowerCase().includes(e.target.value) || eac.to_acc.toLowerCase().includes(e.target.value) || eac.from_name.toLowerCase().includes(e.target.value) || eac.to_name.toLowerCase().includes(e.target.value)){
                    pst.push(eac)
                }

                if(pst.length > 0){
                    var l = [pst,]
                    setData(l)
                }else{
                    setData(false)
                }
            });
        }else{
            setData(transactions)
        }
    }
    function handleSearchGrow(){
        if(expanded == false){
            $('.srch').animate({ 
                width: "100px",
            }, 500 );
            document.querySelector(".src").focus()
        }else{
            $('.srch').animate({ 
                width: "0px",
            }, 500 );
        }
        expanded = !expanded

        

    }
    function copy(){
        // var content = document.getElementById('acnb');
    
        // content.select();
        // document.execCommand('copy');

        navigator.clipboard.writeText(details.acc_no)

        alert("Copied!");
    }

    function closee(){
        setopen(false)
    }
    function openn(){
        setopen(true)
    }

    
    function handleDeletePost(e){
        const full1 = window.location.protocol + '//' + window.location.hostname + ":8000/app/delete"
        axios.post(full1, {
            id: e.target.id,
            idd: details.id
        })  
        .then(res => {
            document.querySelector(".lgn").classList.remove("hidden")
            setTimeout(
                "document.querySelector('.lgn').classList.add('hidden')"
            , 1500);
        })
        .then(ee =>{
            handleRefresh()
        })
        .catch(err => {
            console.log(err)
        })
    }

    

    return (
        <>  
            <div className="lg hidden absolute right-3 top-10 overflow-hidden w-64 h-20 flex justify-center items-center border-2 border-green-500 bg-green-200 text-gray-900 rounded-xl">
                <div className="flex-grow flex justify-center items-start">
                <svg className="w-6 h-6 mr-4 text-green-600 font-extrabold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg> Updated
                </div>
            </div>
            <div className="lgf hidden absolute right-3 top-10 overflow-hidden w-64 h-20 flex justify-center items-center border-2 border-green-500 bg-green-200 text-gray-900 rounded-xl">
                <div className="flex-grow flex justify-center items-start">
                <svg className="w-6 h-6 mr-4 text-green-600 font-extrabold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg> Done
                </div>
            </div>
            <div className="nolgn hidden absolute right-3 top-10 overflow-hidden w-64 h-20 flex justify-center items-center border-2 border-red-500 bg-red-200 text-gray-900 rounded-xl">
                <div className="flex-grow flex justify-center items-start">
                <svg className="w-6 h-6 mr-4 text-red-600 font-extrabold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg> Error Somewhere. Try again!
                </div>
            </div>
            <div className="lgn hidden absolute right-3 top-10 overflow-hidden w-64 h-20 flex justify-center items-center border-2 border-red-500 bg-red-200 text-gray-900 rounded-xl">
                <div className="flex-grow flex justify-center items-start">
                <svg className="w-6 h-6 mr-4 text-red-600 font-extrabold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg> Deleted
                </div>
            </div>
            <div className="flex flex-col sm:flex-row h-2/6 sm:h-1/6 bg-gray-100 rounded-xl">
                <div className="sm:w-60 w-full h-24 sm:h-full rounded-xl justify-center items-center bg-green-300 flex flex-col">
                    <div className="flex justify-center items-start"> <div>Your Balance</div>
                        
                    <div className="flex justify-center items-center mr-4 ml-2">
                        {
                            open ? <p className="opn" onClick={closee}><svg className="w-6 font-extrabold text-gray-500 cursor-pointer h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg></p>
                            : 
                            <p className="cls" onClick={openn}><svg className="w-6 font-extrabold text-gray-500 cursor-pointer h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg></p>
                        }
                        </div>
                    </div>
                    <div>
                        <div className="font-extrabold text-zinc-600 text-4xl"><span className="text-green-600">₦ </span>{details.status && open ? details.balance: "****"}</div>
                
                    </div>
                </div>
                <div className="flex-grow justify-center items-center flex flex-col">
                    <div className="text-2xl">Account Number:</div> 
                    <div id="acnb" className="ml-5 font-semibold text-gray-400 flex justify-center items-center">{details.acc_no}
                    <svg onClick={copy} class="w-6 h-6 ml-2 text-gray-300 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                    </div>
                </div>
            </div>
            
            <div className="sm:px-16 h-5/6 pt-2">
                <div className="pt-2 pb-4 tr h-full font-medium w-full flex flex-col justify-center items-center bg-gray-100 text-black rounded-xl sm:px-4 px-2">
                <div className="w-full px-2 h-12 flex justify-end mb-4 sm:mr-10 overflow-hidden">
                    <div className="sm:col-start-1 sm:col-end-3 sm:col-span-2 flex justify-center items-center mt-2 overflow-hidden">

                    {/* Refresh Icon */}
                        <div onClick={handleRefresh} className="transition duration-300 border-2 border-gray-400 hover:bg-gray-100 hover:text-gray-400 bg-gray-400 text-gray-50 cursor-pointer rounded-xl w-14 flex h-full justify-center items-center">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                                </path>
                            </svg>
                        </div> 

                            <div className="srch w-0 transition overflow-hidden ml-4 duration-300 text-gray-800 rounded-md h-full flex justify-center items-center cursor-pointer">
                                {/* <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg> */}
                                <input 
                                onChange={handleSearch} 
                                className="src w-full bg-gray-800 text-gray-100 h-full pl-2 outline-none" />
                            </div>
                    {
                        transactions.length >0 ?
                            <div onClick={handleSearchGrow} className="transition ml-1 duration-300 border-2 border-gray-800 hover:text-gray-800 hover:border-gray-800  hover:bg-gray-100 rounded-xl h-full flex justify-center items-center cursor-pointer w-14 bg-gray-800 text-gray-100">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>
                        :
                        ""
                    }
                        
                    </div>

                    
                </div>
                <div className="rounded-lg grid grid-flow-row auto-rows-max gap-4 pt-4 h-full w-full overflow-y-scroll">
                {Data ? 
                    Data.length > 0 ?
                        Object.values(Data[0]).filter(value => value.see == 0 || value.see == details.id).map((milestone) => {
                            return (
                            <div className="hover:shadow-lg transition duration-300 text-gray-700 hover:bg-gray-300 bg-gray-200 w-full sm:h-16 h-10 rounded-xl overflow-hidden">
                                <div className="h-full flex items-center overflow-hidden">
                                    <div className="sm:ml-8 ml-4 w-2/4 flex h-full sm:pl-2">
                                        <div className="w-10 flex justify-center items-center">
                                        {details.acc_no === milestone.to_acc ?  
                                            <svg class="sm:w-8 w-4 
                                            text-green-400
                                            " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                            </svg>
                                        : 
                                            <svg class="sm:w-8 w-4 
                                            text-red-400
                                            " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                            </svg>
                                        }
                                        </div>
                                        <div className="ml-4 flex w-full items-center truncate">
                                            <p className="max-w-full pl-2 truncate sm:text-md text-sm">
                                                {/* {details.acc_no == JSON.stringify(milestone.to_acc)} */}
                                                {
                                                    details.acc_no == milestone.to_acc ? milestone.from_name : milestone.to_name
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-2/4 flex h-full">
                                        <div className="w-24 h-full flex justify-center items-center flex-col text-sm">
                                            <div className="text-xs">
                                                {
                                                    moment(milestone.date, "YYYY-MM-DD").format("MM/DD/YYYY")
                                                }
                                            </div>
                                            <div className="text-xs">
                                                $ {
                                                    milestone.amount
                                                }
                                            </div>
                                        {/* <p class="truncate  ... ">qdwqdqdqdqdqddqdqdqdqd</p> */}
                                        </div>
                                        <div className="w-full flex justify-center items-center">
                                        {/* <Router> */}
                                                <Link to={`/user/reciept/${milestone.id}`} target="_blank">
                                                    <div className="text-green-500 hover:bg-green-500 hover:text-gray-200 hover: transition duration-300 sm:mr-6 w-6 h-6 sm:w-10 sm:h-10 justify-center items-center flex rounded-full  cursor-pointer">
                                                        <svg class="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                                                        </svg>
                                                    </div>
                                                </Link>
                                        {/* </Router> */} 
                                        <div onClick={handleDeletePost} id={milestone.id} className="text-red-500 mr-6 w-6 h-6 hover:bg-red-500 hover:text-gray-200 transition duration-300 sm:w-10 sm:h-10 justify-center items-center flex rounded-full  cursor-pointer">
                                        <svg id={milestone.id} class="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                            </svg>
                                        </div>
                                            
                                        </div> 
                                    </div>
                                    {/* {JSON.stringify(milestone.id)} */}
                                </div>
                            </div>
                            )
                        })
                        :
                        <div className="w-full h-full flex justify-center items-center text-gray-300 font-extrabold">
                            <p>- No Transaction(s) Made</p>
                        </div>
                    
                    
                : 
                <div className="w-full h-full flex justify-center items-center text-gray-300 font-extrabold">
                    <p>- Could not find Search</p>
                </div>
                }
                </div>
                </div>
            </div>
        </>
    )
}

export default Main