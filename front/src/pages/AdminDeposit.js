import React, { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {new_route} from '../actions'
import $ from 'jquery'
import axios from 'axios'

export default function AdminDeposit() {
    const [passport, setpassport] = useState("")
    const [fullname, setfullname] = useState("")
    const [amount, setamount] = useState("")
    const [id, setid] = useState("")
    const dispatch = useDispatch()
    const [DepSlide, setDepSlide] = useState(false)
    const [ResSlide, setResSlide] = useState(false)
    const [restriction, setrestriction] = useState("")
    
    const [Data, setData] = useState({})
    const [SData, setSData] = useState({})

    const [dat, setdat] = useState(true)
    const [amtt, setamtt] = useState("")

    function handleRestrict(){
        let form_data = new FormData();
        form_data.append('id', id);
        form_data.append('restriction', amtt);

        const full1 = window.location.protocol + '//' + window.location.hostname + ":8000/app/customer"
        axios.patch(full1, form_data)
        .then((res) => {
            document.querySelector(".np1").value = ""
            document.querySelector(".msg4").classList.remove("hidden")
            setTimeout(
                "document.querySelector('.msg4').classList.add('hidden')"
            , 1500);

            fetch_customer()
        })
    }

    function handleDeposit(){
        if(amount < 500 || amount == ""){
            document.querySelector(".msg2").classList.remove("hidden")
            setTimeout(
                "document.querySelector('.msg2').classList.add('hidden')"
            , 1500);
        }else{
            let form_data = new FormData();
            form_data.append('id', id);
            form_data.append('dep_amt', amount);
            
            const full1 = window.location.protocol + '//' + window.location.hostname + ":8000/app/deposit"
            axios.patch(full1, form_data)
            .then((res) => {
                document.querySelector(".np").value = ""
                document.querySelector(".msg1").classList.remove("hidden")
                setTimeout(
                    "document.querySelector('.msg1').classList.add('hidden')"
                , 1500);

                fetch_customer()
            })
            .catch(err => console.log(err))
        }
    }

    function handleDepositAmt(e){
        if(e.target.value < 500){
            document.querySelector(".ei").classList.remove("hidden")
            document.querySelector(".eii").classList.add("hidden")
        }else{
            document.querySelector(".ei").classList.add("hidden")
        }
        if(e.target.value == ""){
            document.querySelector(".eii").classList.remove("hidden")
            document.querySelector(".ei").classList.add("hidden")
        }else{
            document.querySelector(".eii").classList.add("hidden")
        }
        setamount(e.target.value)
    }

    function handleRestrictionAmt(e){
        if(e.target.value < 1000){
            document.querySelector(".ei1").classList.remove("hidden")
            document.querySelector(".eii1").classList.add("hidden")
        }else{
            document.querySelector(".ei1").classList.add("hidden")
        }
        if(e.target.value == ""){
            document.querySelector(".eii1").classList.remove("hidden")
            document.querySelector(".ei1").classList.add("hidden")
        }else{
            document.querySelector(".eii1").classList.add("hidden")
        }
        setamtt(e.target.value)
    }


    function handleDepCome(e){
        if(DepSlide){
            $('.dep').animate({ 
                width: "0px",
            }, 500 );
            setamount("")
            document.querySelector(".eii").classList.add("hidden")
            document.querySelector(".ei").classList.add("hidden")
            document.querySelector(".np").value = ""
            setDepSlide(false)
        }else{
            var id = e.target.id
            
            Data.forEach(element => {
                if(element.id == id){
                    setpassport(element.passport)
                    setfullname(element.fname + " " + element.lname)
                }
            });
            $('.dep').animate({ 
                width: "900px",
            }, 400 );
            setid(id)
            setamount("")
            document.querySelector(".eii").classList.add("hidden")
            document.querySelector(".ei").classList.add("hidden")
            document.querySelector(".np").value = ""
            setDepSlide(true)
        }
    }

    function handleResCome(e){
        if(ResSlide){
            $('.res').animate({ 
                width: "0px",
            }, 500 );
            setamount("")
            document.querySelector(".eii").classList.add("hidden")
            document.querySelector(".ei").classList.add("hidden")
            document.querySelector(".np").value = ""
            setResSlide(false)
        }else{
            var id = e.target.id
            update_restriction(id)
            $('.res').animate({ 
                width: "600px",
            }, 400 );
            setid(id)
            setamount("")
            document.querySelector(".eii").classList.add("hidden")
            document.querySelector(".ei").classList.add("hidden")
            document.querySelector(".np").value = ""
            setResSlide(true)
        }
    }

    const update_restriction = (id)=>{
        Data.forEach(element => {
            if(element.id == id){
                setpassport(element.passport)
                setfullname(element.fname + " " + element.lname)
                setrestriction(parseInt(element.restriction))
            }
        });
        
    }


    const update_customer_and_restriction = ()=>{
        fetch_customer()
        update_restriction()
    }





    const fetch_customer = ()=>{
        axios.get('http://127.0.0.1:8000/api/customers/')
        .then((res) => {
            var dater = res.data
            console.log(res.data)
            var len = dater.length
            if(len > 0){
                setData(dater)
                setSData(dater)
            }else{
                console.log("nope")
                setData({})
                setSData({})
            }
        })
        .catch(err => console.log(err))
    }


    useEffect(() => {
        dispatch(
            new_route("action")
        )
        fetch_customer();
    }, []);

    const handleSearch = (e)=>{
        var pst = []
        if(e.target.value != ""){
            // console.log(users.data[0])
            SData.forEach(eac => {
                if(eac.fname.toLowerCase().includes(e.target.value) || eac.lname.toLowerCase().includes(e.target.value) || eac.acc_no.toLowerCase().includes(e.target.value)){
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
        <div className="relative w-full pt-10 px-5 h-full justify-center items-center">
        
            <div className="dep rounded-xl shadow-xl absolute overflow-hidden h-full w-0 right-0 flex flex-col justify-center items-center bg-gray-200">

            <div className="msg1 hidden absolute right-3 top-10 overflow-hidden w-64 h-20 flex justify-center items-center border-2 border-green-500 bg-green-200 text-gray-900 rounded-xl">
                <div className="flex-grow flex justify-center items-start">
                <svg className="w-6 h-6 mr-4 text-green-600 font-extrabold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg> Updated
                </div>
            </div>

            
            <div className="msg2 hidden absolute right-3 top-10 overflow-hidden w-64 h-20 flex justify-center items-center border-2 border-yellow-500 bg-yellow-200 text-gray-900 rounded-xl">
                <div className="flex-grow flex justify-center items-start">
                <svg className="w-6 h-6 mr-4 text-yellow-600 font-extrabold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg> Check you input(s)
                </div>
            </div>

                <div className="w-full justify-start items-start ">
                    <div onClick={handleDepCome} className="w-10 h-10 ml-20 font-bold text-lg rounded-full transition duration-300 bg-red-400 hover:bg-red-500 justify-center items-center hover:text-gray-200 flex cursor-pointer">X</div>
                </div>
                <div className="flex flex-col justify-center w-full items-center">
                    <div className="overflow-hidden rounded-full w-36 h-36 flex justify-center items-center">
                        <img src={passport} />
                    </div>
                    <div className="font-semibold overflow-hidden rounded-full w-full h-20 flex justify-center items-center">
                        <div>{fullname}</div>
                    </div>
                    <div className="w-64 h-10 rounded-md overflow-hidden">
                        <input onChange={handleDepositAmt} min="500" className="np w-full h-full px-4 outline-none" type="number" placeholder="Deposit Amount" />
                    </div>
                    <p className="text-sm text-red-500 font-semibold hidden ei">Minimum Deposit is $500</p>
                    <p className="text-sm text-red-500 font-semibold hidden eii">Input Something</p>
                    <div onClick={handleDeposit} className="w-32 bg-green-500 text-gray-50 cursor-pointer hover:bg-green-600 transition duration-300 h-12 mb-24 rounded-lg flex justify-center items-center mt-10">
                        Deposit
                    </div>
                </div>
            </div>



            <div className="res rounded-xl shadow-xl absolute overflow-hidden w-0 h-full right-0 flex flex-col justify-center items-center bg-gray-200">
            <div className="msg4 hidden absolute right-3 top-10 overflow-hidden w-64 h-20 flex justify-center items-center border-2 border-green-500 bg-green-200 text-gray-900 rounded-xl">
                <div className="flex-grow flex justify-center items-start">
                <svg className="w-6 h-6 mr-4 text-green-600 font-extrabold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg> Done
                </div>
            </div>
                <div className="w-full ml-20 justify-start items-start ">
                    <div onClick={handleResCome} className="w-10 h-10 mt-2 font-bold text-lg rounded-full transition duration-300 bg-red-400 hover:bg-red-500 justify-center items-center hover:text-gray-200 flex cursor-pointer">X</div>
                </div>
                <div className="flex flex-col justify-center w-full items-center">
                    <div className="overflow-hidden rounded-full w-36 h-36 flex justify-center items-center">
                        <img src={passport} />
                    </div>
                    <div className="font-semibold overflow-hidden rounded-full w-full h-20 flex justify-center items-center">
                        <div>{fullname}</div>
                    </div>
                    <p className="text-sm font-semibold">Currently:</p>
                    <div className="w-64 mb-6 h-10 rounded-md overflow-hidden">
                        <input value={restriction} className="np  bg-gray-100 w-full h-full px-4 outline-none" type="number" disabled/>
                    </div>

                    <p className="text-sm font-semibold">New Restriction:</p>
                    <div className="w-64 h-10 rounded-md overflow-hidden">
                        <input onChange={handleRestrictionAmt} min="1000" className="np1 w-full h-full px-4 outline-none" type="number" placeholder="Amount" />
                    </div>
                    <p className="text-sm text-red-500 font-semibold hidden ei1">Minimum Restriction is $1000</p>
                    <p className="text-sm text-red-500 font-semibold hidden eii1">Input Something</p>
                    <div onClick={handleRestrict} className="w-32 bg-green-500 text-gray-50 cursor-pointer hover:bg-green-600 transition duration-300 h-12 mb-24 rounded-lg flex justify-center items-center mt-10">
                        Restrict
                    </div>
                </div>
            </div>
            <div className="w-full mb-4 h-10 items-center flex flex-col">
                <div className="border-2 border-gray-400 w-80 h-10 rounded-lg overflow-hidden">
                    <input onChange={handleSearch} type="search" placeholder="Search User" className="bg-gray-200 px-2 w-full h-full outline-none" />
                </div>
            </div>
            <div className="rounded-lg gd mb-3 shadow-lg px-10 pt-4 w-full overflow-auto pb-10">

            {dat ? 
                Object.values(SData).map((milestone) => {
                return (
                <div className="rounded-lg justify-center items-center h-24 w-full flex mt-4">

                    <div className="overflow-hidden rounded-full mr-4 w-1/12 h-20 flex text-gray-50 flex-col justify-center items-center">
                        <img src={milestone.passport} />
                    </div>
                <div className="rounded-lg overflow-hidden w-full flex pl-4 h-14 bg-gray-200">
                    <div className="w-3/12 h-full flex justify-center items-center uppercase text-sm">
                        {milestone.lname} {milestone.fname}
                    </div>
                    <div className="w-2/12 h-full flex flex-col justify-center items-center text-sm">
                        <div className="text-sm font-semibold">Account Number:</div>
                        <div>{milestone.acc_no}</div>
                    
                    </div>
                    <div className="w-3/12 h-full flex  flex-col justify-center items-center text-sm">
                    <div className="text-sm font-semibold">Balance:</div>
                        <div>₦ {milestone.balance}</div>
                    
                    </div>
                    <div className="w-2/12 h-full flex  flex-col justify-center items-center text-sm">
                    <div className="text-sm font-semibold">BVN:</div>
                        <div>{milestone.bvn}</div>
                    
                    </div>
                    <div onClick={handleDepCome} id={milestone.id} className="bg-green-400 text-gray-50 font-semibold transition duration-300 cursor-pointer hover:bg-green-500 h-full w-1/12 flex justify-center items-center">
                        Deposit
                    </div>
                    <div 
                    onClick={handleResCome}
                     id={milestone.id} className="bg-yellow-500 ml-2 text-gray-50 font-semibold transition duration-300 cursor-pointer hover:bg-yellow-600 h-full w-1/12 flex justify-center items-center">
                        Restrict
                    </div>

                </div>
                </div>
                )})
                :
                    "No user!"
                }

            </div>
        </div>
    )
}
