import React, { useState } from 'react'
import Header from '../parts/Header'
import axios from 'axios'
import BANK from '../BANK.avif'
import {add_data, add_tra} from '../actions'
import {useDispatch, useSelector} from 'react-redux'


export default function Login(props) {
    const details = useSelector(state => state.detail)["user"]
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const dispatch = useDispatch()

    function handleEmailChange(e){
        var value = e.target.value
        var re = /\S+@\S+\.\S+/;
        if(re.test(value)){
            setemail(value)
        }else{
            setemail("")
        }
    }

    function handlePasswordChange(e){
        var value = e.target.value
        setpassword(value)
    }


    function disp1(val){
        // console.log(val)
        dispatch(
            add_tra(
                val
            )
        )
    }

    function handleSubmit(e){
        var err_no = 0;

        var re = /\S+@\S+\.\S+/;
        if(!(re.test(email))){
            err_no += 1
            alert("Wrong Email inputed")
        }

        if(password === ""){
            err_no += 1
            alert("No password")
        }
        

        if(err_no === 0){
            // Loading Data

            axios.get('http://127.0.0.1:8000/api/customers/')
            .then((res) => {
                const flt = Object.values(res.data).filter(value => value.email === email && value.password === password)
                if(flt.length == 1){
                    document.querySelector(".lgn").classList.remove("hidden")
                    setTimeout(
                        "document.querySelector('.lgn').classList.add('hidden')"
                    , 1500);


                    axios.get('http://127.0.0.1:8000/api/transactions/')
                    .then((resa) => {
                        const flt1 = Object.values(resa.data).filter(value => value.from_acc === flt[0].acc_no || value.to_acc === flt[0].acc_no)
                        if(flt1.length >= 1){
                            disp1(flt1)
                        }
                    })
                    .catch(err => console.log(err))

                    console.log(flt[0].id)
                    setTimeout(
                        ()=>{
                            dispatch(
                                add_data(flt[0])
                            )
                        }
                        , 1000)
                }else{
                    document.querySelector(".nolgn").classList.remove("hidden")
                    setTimeout(
                        "document.querySelector('.nolgn').classList.add('hidden')"
                    , 1500);
                }
            })
            .catch(err => console.log(err))

            // Loading Transactions

           
        }
            
    }

    return (
        <>
        <div className="lgn hidden absolute right-3 top-20 overflow-hidden w-64 h-20 flex justify-center items-center bg-green-500 text-white rounded-xl">
            <div className="flex-grow flex justify-center items-start">
                <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg> Successful Login</div>
            </div>
            <div className="nolgn hidden absolute right-3 top-20 overflow-hidden w-64 h-20 flex justify-center items-center bg-red-500 text-white rounded-xl">
            <div className="flex-grow flex justify-center items-start">
                <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg> Invalid Login</div>
            </div>
        <Header />
        <div className="w-screen h-screen flex flex-row">
            <div className="h-full bg-black w-full">
                <img className="w-full h-full" src={BANK} alt=""/>
            </div>
            <div className="absolute flex flex-col justify-center bg-opacity-60 items-center bg-zinc-900 py-10 px-10 h-full w-1/3">
                <div className="mb-10 text-gray-100 text-5xl font-extrabold ">Log<sppan className="text-green-400">i</sppan>n</div>
                <div className="w-full flex flex-col justify-center items-center">
                    <div className="w-full h-12 mb-8 overflow-hidden rounded-md">
                        <input onChange={handleEmailChange} className="placeholder-black w-full px-2 text-gray-900 bg-gray-200 font-bold outline-none h-full italic " placeholder="Email" type="email"/>
                    </div>
                    <div className="w-full h-12 mb-8 overflow-hidden rounded-md">
                        <input onChange={handlePasswordChange} className="placeholder-black w-full rounded-md px-2 text-gray-900 bg-gray-200 font-bold outline-none h-full " placeholder="Password" type="password"/>
                    </div>
                    <div onClick={handleSubmit} className="transition  duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:bg-black hover:text-green-400 bg-green-400 cursor-pointer text-black font-bold w-24 h-12 rounded-md flex justify-center items-center">
                        Submit
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
