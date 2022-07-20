import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {add_a_users, alogged, new_route} from '../actions'
import $ from 'jquery'

export default function AdminHome(props) {
    const {handleTra} = props;
    const dispatch = useDispatch()
    const trans = useSelector(state => state.atransaction)[0]
    const [Data, setData] = useState({})
    const [SData, setSData] = useState({})
    const [DepData, setDepData] = useState({})
    const [DepTrn, setDepTrn] = useState({})

    const [dat, setdat] = useState(true)
    const [refresh, setrefresh] = useState(true)
    const [DepSlide, setDepSlide] = useState(false)
    
    var td 

    const freeze = (e)=>{
        var id = e.target.id
        const full1 = window.location.protocol + '//' + window.location.hostname + ":8000/app/freeze"
        axios.post(full1, {
            id: e.target.id,
        })
        .then(res =>{
            document.querySelector(".lgo").classList.remove("hidden")
            setTimeout(
                "document.querySelector('.lgo').classList.add('hidden')"
            , 1500);
        })
        .then(ww =>{
            handleRefresh()
        })
    }

    const handleRefresh = () =>{
        // axios.get('http://127.0.0.1:8000/api/customers/')
        // .then((res) => {
        //     dispatch(
        //         add_a_users(res)
        //     )
        // })
        // .then(ss => {
        //     dispatch(
        //         alogged()
        //     )
        //     document.querySelector(".lg").classList.remove("hidden")
        //     setTimeout(
        //         "document.querySelector('.lg').classList.add('hidden')"
        //     , 2000);
        // })
        setrefresh(!refresh)
        document.querySelector(".lg").classList.remove("hidden")
        setTimeout(
            "document.querySelector('.lg').classList.add('hidden')"
        , 2000);
    }

    function handleDepCome(e){
        if(DepSlide){
            $('.dep').animate({ 
                width: "0px",
            }, 500 );
            setDepData("")
            setDepTrn("")
            
        }else{
            // var id = e.target.id
            var pst = []
            Data.forEach(eac => {
                if(eac.id == e.target.id){
                    pst.push(eac)
                }
            })

            // console.log(pst)

            if(pst.length == 1){
                // console.log(pst)
                var ss = {
                    fullname: pst[0].fname + " " + pst[0].lname,
                    balance: pst[0].balance,
                    account_no: pst[0].acc_no,
                    bvn: pst[0].bvn,
                    pass: pst[0].passport,
                }

                setDepData(ss)

                var trn = []
                trans.data.forEach(esh => {
                    if(esh.from_acc == pst[0].acc_no || esh.to_acc == pst[0].acc_no){
                        trn.push(esh)
                        console.log(esh)
                    }
                })
                // console.log(trans.data)
                console.log(trn)
                if(pst.length == 1){
                    setDepTrn(trn)
                }

            }else{
                var dt = [pst,]
                setdat(false)
                setSData([pst,])
            }
            
            
            $('.dep').animate({ 
                width: "900px",
            }, 400 );
        }
        setDepSlide(!DepSlide)
    }

    useEffect(() => {   
        axios.get('http://127.0.0.1:8000/api/customers/')
        .then((res) => {
            var dater = res.data
            
            var len = dater.length
            if(len > 0){
                setData(dater)
                setSData(dater)
            }else{
                setData({})
                setSData({})
            }
        })
        .catch(err => console.log(err))
    }, [refresh]);



    const handleSearch = (e)=>{
        var pst = []
        if(e.target.value != ""){
            // console.log(users.data[0])
            SData.forEach(eac => {
                if(eac.fname.toLowerCase().includes(e.target.value) || eac.lname.toLowerCase().includes(e.target.value)){
                    pst.push(eac)
                }
            })
            
            if(pst.length > 0){
                setdat(true)
                var dt = [pst,]
                setSData(dt[0])
                console.log(dt[0])
            }else{
                var dt = [pst,]
                setdat(false)
                setSData([pst,])
            }
        }else{
            setdat(true)
            setSData(Data)
        }
    }

    return (
        
        <div className="w-full relative px-5 h-full flex justify-center items-center ">
            <div className="lg hidden absolute right-3 top-2 overflow-hidden w-64 h-20 flex justify-center items-center border-2 border-green-500 bg-green-200 text-gray-900 rounded-xl">
                <div className="flex-grow flex justify-center items-start">
                <svg className="w-6 h-6 mr-4 text-green-600 font-extrabold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg> Updated
                </div>
            </div>
            <div className="lgo hidden absolute right-3 top-2 overflow-hidden w-64 h-20 flex justify-center items-center border-2 border-blue-500 bg-blue-200 text-gray-900 rounded-xl">
                <div className="flex-grow flex justify-center items-start">
                <svg className="w-6 h-6 mr-4 text-blue-600 font-extrabold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg> Done
                </div>
            </div>
            <div className="lgn hidden absolute right-3 top-10 overflow-hidden w-64 h-20 flex justify-center items-center border-2 border-red-500 bg-red-200 text-gray-900 rounded-xl">
                <div className="flex-grow flex justify-center items-start">
                <svg className="w-6 h-6 mr-4 text-red-600 font-extrabold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg> Deleted
                </div>
            </div>
            <div className="w-1/2 flex-col h-full flex items-center pt-20">
                <div className="hover:shadow-lg cursor-pointer shadow-lg shadow-green-300 bg-green-400 px-5 py-5 w-3/5 h-40 rounded-2xl flex">
                    <div className="w-4/5 flex text-gray-50 flex-col">
                        <div>
                            <svg class="w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://   www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                        </div>
                        <div className="text-xl font-thin">Customers</div>
                    </div>
                    <div className="w-1/5 flex justify-end items-end text-gray-50 text-3xl font-semibold">{Data.length}</div>
                </div>
                <div 
                onClick={handleTra} 
                className="hover:shadow-lg cursor-pointer shadow-lg shadow-red-300 bg-red-400 px-5 mt-20 py-5 w-3/5 h-40 rounded-2xl flex">
                    <div className="w-4/5 flex text-gray-50 flex-col">
                        <div>
                            <svg class="w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
                        </div>
                        <div className="text-xl font-thin">Transactions</div>
                    </div>
                    <div className="w-1/5 flex justify-end items-end text-gray-50 text-3xl font-semibold">{trans.data.length}</div>
                </div>
            </div>
            <div className="w-1/2 flex-col h-full flex items-center pt-2">
                <div className="shadow-lg  h-full flex flex-col items-center rounded-lg gd mt-2 pt-2 w-full px-3">
                    
                    <div className="flex px-2 h-14 overflow-hidden justify-center items-center">
                        <div className="border-2 mr-4 border-gray-400 w-80 h-10 rounded-lg overflow-hidden">
                            <input onChange={handleSearch} type="search" placeholder="Search Users" className="bg-gray-200 px-2 w-full h-full outline-none" />
                        </div>
                        <div onClick={handleRefresh} className="transition duration-300 border-2 border-gray-400 hover:bg-gray-100 hover:text-gray-400 bg-gray-400 text-gray-50 cursor-pointer rounded-xl w-14 flex h-10 justify-center items-center">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                                </path>
                            </svg>
                        </div> 
                    </div>
                    
                    <div className="flex flex-col h-full px-5 w-full pt-10 overflow-y-scroll">
                    {dat ? 
                        Object.values(SData).map ((milestone) => {
                            return(
                                <div className="flex justify-evenly overflow-hidden items-center mb-4 w-full bg-gray-200 h-10 rounded-md">
                                    <div className="w-3/6 font-semibold mx-3 ">{milestone.lname} {milestone.fname}</div>
                                    {/* <div className="w-2/6 text-green-600">${milestone.balance}</div> */}
                                    <div id={milestone.id} onClick={freeze} className={milestone.status ? "w-2/6 transition duration-300 flex justify-center items-center text-gray-800 cursor-pointer bg-gray-400 rounded-md h-4/5" 
                                    : 
                                    "w-2/6 transition duration-300 flex justify-center items-center text-gray-200 cursor-pointer bg-blue-400 rounded-md h-4/5 hover:bg-blue-500" }>
                                        {milestone.status ? "Freeze" : "Frozen" }
                                    </div>
                                    <div onClick={handleDepCome} id={milestone.id} className="w-1/6 mx-3 cursor-pointer transition duration-300 flex justify-center items-center h-4/5 text-gray-900 font-semibold hover:bg-green-400 bg-green-300 rounded-md ">
                                        View
                                    </div>
                                </div>
                            )
                        })
                        :
                        "Nothing to see here FOLK!"
                    }
                    </div>
                    <div className="dep overflow-hidden flex flex-col absolute top-0 right-0 h-full w-0 rounded-l-xl shadow-xl bg-gray-300">
                        <div className="w-full px-10 justify-start items-start ">
                            <div onClick={handleDepCome} className="w-10 h-10 mt-2 font-bold text-lg rounded-full transition duration-300 bg-red-400 hover:bg-red-500 justify-center items-center hover:text-gray-200 flex cursor-pointer">X</div>
                        </div>
                        <div className="py-2 flex justify-center w-full items-center">
                            <div className="overflow-hidden mr-10 rounded-full w-36 h-36 flex justify-center items-center">
                                <img src={DepData.pass} />
                            </div>
                            <div className="font-semibold flex flex-col justify-start items-start">
                                <div className="flex mb-3">
                                    <div className="flex w-40 justify-start items-start underline">Fullname:</div>
                                    <div>{DepData.fullname}</div>
                                </div>
                                <div className="flex mb-3">
                                    <div className="flex w-40 justify-start items-start underline">BVN:</div>
                                    <div>{DepData.bvn}</div>
                                </div>
                                <div className="flex mb-3">
                                    <div className="flex w-40 justify-start items-start underline">Account No:</div>
                                    <div>{DepData.account_no}</div>
                                </div>
                                <div className="flex">
                                    <div className="flex w-40 justify-start items-start underline">Balance:</div>
                                    <div>₦ {DepData.balance}</div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full text-center italic px-10 overflow-y-scroll">
                        {DepTrn.length > 0 ?
                                Object.values(DepTrn).map((milestone) => {
                                return (
                                <div className="rounded-lg w-full flex mt-4 overflow-hidden h-10 bg-gray-200">

                                    <div className="w-1/12 h-full flex text-gray-50 flex-col justify-center items-center px-2 bg-red-400">
                                        <div>
                                            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 15.707a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 0zm0-6a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                        </div>
                                        <div className="text-sm">From</div>
                                    </div>
                                    <div className="w-4/12 h-full flex font-semibold justify-center items-center text-sm">
                                        {milestone.from_name}
                                    </div>
                                    <div className="w-1/12 h-full flex text-gray-50 flex-col justify-center items-center px-2 bg-green-400">
                                        <div>
                                            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                        </div>
                                        <div className="text-sm">To</div>
                                    </div>
                                    <div className="w-4/12 h-full flex justify-center items-center font-semibold text-sm">
                                    {milestone.to_name}
                                    </div>
                                    <div className="bg-gray-400 h-full w-2/12 flex flex-col justify-center items-center">
                                        <div className="text-sm font-bold">${milestone.amount}</div>
                                    </div>

                                </div>
                                )})
                            :
                                "No transactions yet!"
                        }
                        </div>
                    </div>
                
            </div>
        </div>
    </div>
    )
}
