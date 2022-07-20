import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { add_data, update_data, clear_data, add_tra } from '../actions'
import {useSelector, useDispatch, connect} from 'react-redux'

export default function Transfer() {
    const dispatch = useDispatch()
    const details = useSelector(state => state.detail)["user"]
    const [bank, setbank] = useState("")
    const [accNo, setaccNo] = useState("")
    const [errorA, seterrorA] = useState("")
    const [errorB, seterrorB] = useState("")
    const [errorA1, seterrorA1] = useState("")
    const [errorA2, seterrorA2] = useState("")
    const [sendID, setsendID] = useState("")
    const [amount, setamount] = useState(0)
    const [bene, setbene] = useState()
    const [amtErr, setamtErr] = useState("")
    const [amtErr1, setamtErr1] = useState("")
    const [amtErr2, setamtErr2] = useState("")
    const [amtErr3, setamtErr3] = useState("")
    const [amtErr4, setamtErr4] = useState("")
    const [pinErr, setpinErr] = useState("")
    const [pinErr1, setpinErr1] = useState("")
    const [pinE2, setpinE2] = useState("")
    const [pinE3, setpinE3] = useState("")
    const [pin, setpin] = useState("")
    const [next, setnext] = useState(false)
    const [to_name, setto_name] = useState("")

    function handleBene(e){
        setbene(e.target.value)
    }
    
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/customers/')
        .then((res) => {
            const flt = Object.values(res.data).filter(value => value.email === details.email)
            console.log(flt)
            if(flt.length == 1){
                dispatch(
                    add_data(flt[0])
                )
            }else{
                console.log("no such account")
            }
        })
        .catch(err => console.log(err))
    }, []);

    function disp(){
        // console.log("here")

        axios.get('http://127.0.0.1:8000/api/customers/')
        .then((resa) => {
            const flt1 = Object.values(resa.data).filter(value => value.id === details.id)
            if(flt1.length >= 1){
                console.log(flt1)
                dispatch(
                    add_data(flt1[0])
                )
                document.querySelector(".lg").classList.remove("hidden")
                setTimeout(
                    "document.querySelector('.lg').classList.add('hidden')"
                , 1500);
            }
        })
    }

    function handleSubmit2(){
        if(amount === 0){
            setamtErr1("Enter an amount")
        }else(
            setamtErr1("")
        )

        if(amount < 50 ){
            setamtErr("should be greater than $50")
        }else{
            setamtErr("")
        }

        if(amtErr2 !== ""){
            setamtErr3("Insufficient Funds")
        }else{
            setamtErr3("")
        }

        if(pin === ""){
            setpinErr1("Enter your pin")
        }else(
            setpinErr1("")
        )

        if(pin.length !== 4 ){
            setpinErr("Enter \"4\" digits")
        }else{
            setpinErr("")
        }

        if(pinE2 !== ""){
            setpinE3("Wrong Pin")
            // console.log(pinE3)
        }else{
            setpinE3("")
        }

        if(amount > details.restriction){
            setamtErr4("Your limit per transaction is $" + details.restriction + ".")
        }else{
            setamtErr4("")
        }
        // console.log(pinE2)
        if(pinErr === "" && pinErr1 === "" && pinE2 === "" && amtErr === "" && amtErr1 === "" && amtErr2 === "" && amtErr4 === ""){
            axios.post('http://127.0.0.1:8000/api/transactions/', {
                from_acc : details.acc_no,
                from_name : details.lname + " " + details.fname,
                to_acc : accNo,
                to_name: to_name,
                to_bank : "resonate",
                amount : amount,
                beneficiary : bene
              }).then(ress =>{
                axios.get('http://127.0.0.1:8000/api/transactions/')
                    .then((resa) => {
                        console.log(resa.data)
                        const flt1 = Object.values(resa.data).filter(value => value.from_acc === details.acc_no || value.to_acc === details.acc_no)
                        if(flt1.length >= 1){
                            // disp1(flt1)
                            dispatch(
                                add_tra(
                                    flt1
                                )
                            )
                        }
                    })
              })
            .then(res => {
                axios.post('http://127.0.0.1:8000/api/credit', {
                    increment: amount,
                    acc: accNo,
                    from_acc: details.acc_no
                })
                .then((response) => {
                            document.querySelector(".snt").classList.remove("hidden")
                            setTimeout(
                                "document.querySelector('.snt').classList.add('hidden')"
                            , 1500);
                            setTimeout(disp, 1000);
                        })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err))
        }

    }


    function handlePin(e){
        setpin(e.target.value)
        if(e.target.value.length !== 4 ){
            setpinErr("Enter \"4\" digits")
            setpin(e.target.value)
        }else{
            setpinErr("")
            setpin(e.target.value)
        }

        if(e.target.value !== details.pin ){
            setpinE2("Wrong Pin")
            // console.log(pinE2)
        }else{
            setpinE2("")
        }
    }

    function handleAmount(e){
        if(e.target.value < 50 ){
            setamtErr("should be greater than $50")
            setamount(e.target.value)
        }else{
            setamtErr("")
            setamount(e.target.value)
        }
        if(e.target.value > details.balance ){
            setamtErr2("Insufficient Funds")
        }else{
            setamtErr2("")
        }
        if(e.target.value > parseInt(details.restriction)){
            setamtErr4("Your limit per transaction is $" + details.restriction + ".")
        }else{
            setamtErr4("")
        }
        setamount(e.target.value)

    }

    function handleBankChange(e){
        if(e.target.value === "resonate"){
            setbank(e.target.value)
            seterrorB("")
        }
    }

    function handleAccNoChange(e){
        if(isNaN(e.target.value) || e.target.value.length !== 10){
            seterrorA1("Account number should be a \"10\" digit number")
            setaccNo(e.target.value)
        }else{
            seterrorA1("")
            setaccNo(e.target.value)
        }
        axios
        .get('http://127.0.0.1:8000/api/accNos/')
        .then(res => {
            const flt = Object.values(res.data).filter(value => value.acc_no == e.target.value)
            // console.log(flt.length)
            if(flt.length == 1){
                if(flt[0].acc_no !== details.acc_no){
                    setto_name(flt[0].lname + " " + flt[0].fname)
                    document.querySelector(".nam").value = flt[0].lname + " " + flt[0].fname
                    setaccNo(e.target.value)
                    seterrorA2("")
                }else{
                    seterrorA2("You can't use your account number")
                    setaccNo(e.target.value)
                    document.querySelector(".nam").value = ""
                }
            }else{
                seterrorA2("No such Account found")
                setaccNo(e.target.value)
                document.querySelector(".nam").value = ""
            }
        })
    }

    function handleSubmit(){
        if(bank === ""){
            seterrorB("Choose a bank !")
        }else{  
            seterrorB("")
        }
        if(accNo === ""){
            seterrorA("Enter recievers account number")
        }else(
            seterrorA("")
        )
        if(isNaN(accNo) || accNo.length !== 10){
            seterrorA1("Account number should be a \"10\" digit number")
        }else{
            seterrorA1("")
        }

        if(errorA == "" && errorB =="" && errorA1 =="" && errorA2 ==""){
            axios.get('http://127.0.0.1:8000/api/accNos/')
            .then(res => {
                Object.values(res.data).forEach(val => {
                    if (val.acc_no === accNo && val.acc_no !== details.acc_no){
                        setsendID(val.id)
                        document.querySelector(".first").classList.add("hidden")
                        document.querySelector(".second").classList.remove("hidden")
                        setnext(true)
                    }else{
                        seterrorA2("No such Account found")
                    }
                });
            })
        }
    }
    return (
        <>
            
            <div className="flex flex-col h-full rounded justify-center items-center">
            <div className="snt hidden absolute right-3 top-10 overflow-hidden w-64 h-20 flex justify-center items-center border-2 border-green-500 bg-green-200 text-gray-900 rounded-xl">
                <div className="flex-grow flex justify-center items-start">
                <svg className="w-6 h-6 mr-4 text-green-600 font-extrabold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg> Sent
                </div>
            </div>
                <div className="first flex flex-col justify-center items-center">
                    <div className="mb-4 flex-col fkex justify-center items-center w-80">
                        <div className="overflow-hidden rounded-md h-12 w-80 ">
                            <select onChange={handleBankChange} className="h-full w-full px-6 outline-none bg-gray-100 text-gray-400">
                                <option value="" disabled selected>Select a Bank</option>
                                <option value="resonate">Resonate Bank</option>
                            </select>
                        </div>
                        <div className="text-red-600 font-bold w-full flex text-sm items-center justify-center">{errorB}</div>
                    </div>
                    <div className="mb-4 flex-col fkex justify-center items-center w-80">
                        <div className="overflow-hidden rounded-md h-12 w-full">
                            <input onChange={handleAccNoChange} className="bg-gray-100 h-full w-full px-7 outline-none text-gray-400" type="text" placeholder="Account Number"/>
                        </div>
                        <div className="text-red-600 font-bold w-full flex text-sm items-center justify-center">{errorA}</div>
                        <div className="text-red-600 font-bold w-full flex text-sm items-center justify-center">{errorA1}</div>
                        <div className="text-red-600 font-bold w-full flex text-sm items-center justify-center">{errorA2}</div>
                    </div>
                    <div className="overflow-hidden rounded-md h-12 w-80 mb-4 text-gray-400">
                        <input className="nam h-full bg-gray-100 w-full px-7 outline-none" type="text" placeholder="Name" disabled/>
                    </div>
                </div>

                <div className="hidden second">
                    <div className="mb-4 flex-col fkex justify-center items-center w-80">
                        <div className="overflow-hidden rounded-md h-12 w-full">
                            <input onChange={handleAmount} type="number" min="50" max={details.balance} className="bg-gray-100 amt h-full w-full px-7 outline-none" placeholder="Amount"/>
                        </div>
                        <div className="text-red-600 font-bold w-full flex text-sm items-center justify-center">{amtErr}</div>
                         <div className="text-red-600 font-bold w-full flex text-sm items-center justify-center">{amtErr1}</div>
                        <div className="text-red-600 font-bold w-full flex text-sm items-center justify-center">{amtErr3}</div>
                        <div className="text-red-600 font-bold w-full flex text-sm items-center justify-center">{amtErr4}</div>
                    </div>
                    <div className="overflow-hidden rounded-md h-40 w-80 mb-4 text-gray-400">
                        <textarea onChange={handleBene} className="bg-gray-100 resize-none pt-2 nam h-full w-full px-7 outline-none" placeholder="Optional Note" />
                    </div>
                    <div className="mb-4 flex-col fkex justify-center items-center w-80">
                        <div className="overflow-hidden rounded-md h-12 w-full">
                            <input onChange={handlePin} className="bg-gray-100 pin h-full w-full px-7 outline-none" type="password" placeholder="PIN"/>
                        </div>
                        <div className="text-red-600 font-bold w-full flex text-sm items-center justify-center">{pinErr}</div>
                        <div className="text-red-600 font-bold w-full flex text-sm items-center justify-center">{pinErr1}</div>
                        <div className="text-red-600 font-bold w-full flex text-sm items-center justify-center">{pinE3}</div>
                    </div>
                </div>

                {details.status ?
                    <div onClick={next ? handleSubmit2 : handleSubmit} className="transition duration-300 ease-in-out transform hover:bg-green-400 bg-green-300 cursor-pointer text-gray-50 font-bold w-24 h-12 rounded-xl flex justify-center items-center">
                        Next
                    </div>
                    :
                    <div className="transition duration-300 ease-in-out transform  bg-blue-300 text-gray-50 font-bold w-40 h-12 flex justify-center items-center">
                        Account Frozen
                    </div>
                }
                
            </div>

        </>
    )
}