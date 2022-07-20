import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import {add_data} from '../actions'

export default function Edit() {
    const details = useSelector(state => state.detail)["user"]
    const dispatch = useDispatch()
    const [Email, setEmail] = useState("")
    const [Pass, setPass] = useState("")
    const [Pass1, setPass1] = useState("")
    var Errors = 0

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

    function handleEmail(e){
        if(e.target.value == ""){
            document.querySelector(".em").classList.remove("hidden")
            Errors += 1
        }else{
            document.querySelector(".em").classList.add("hidden")
            Errors -= 1
        }
        if(e.target.value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            document.querySelector(".em1").classList.add("hidden")
            Errors -= 1
        }else{
            document.querySelector(".em1").classList.remove("hidden")
            Errors += 1
        }
        setEmail(e.target.value)
    }

    function handlePass(e){
        if(e.target.value == ""){
            document.querySelector(".p1").classList.remove("hidden")
            Errors += 1
        }else{
            document.querySelector(".p1").classList.add("hidden")
            Errors -= 1
        }
        setPass(e.target.value)
    }

    function handlePass1(e){
      if(e.target.value == ""){
          document.querySelector(".p2").classList.remove("hidden")
          Errors += 1
      }else{
          document.querySelector(".p2").classList.add("hidden")
          Errors -= 1
      }
      setPass1(e.target.value)
    }

    function handleUpd(){
        if(Pass != Pass1){
            document.querySelector(".p22").classList.remove("hidden")
            Errors += 1
        }else{
            document.querySelector(".p22").classList.add("hidden")
            var pass = Pass
        }
        console.log(Errors)
        if(Errors <= 0){
            let form_data = new FormData();
            form_data.append('id', details.id);
            form_data.append('email', Email);
            form_data.append('password', pass);

            const full1 = window.location.protocol + '//' + window.location.hostname + ":8000/app/customer"
            axios.patch(full1, form_data)
            .then(res => {
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
            })
        }else{
            document.querySelector(".lgn").classList.remove("hidden")
            setTimeout(
                "document.querySelector('.lgn').classList.add('hidden')"
            , 1500);
        }
    }

    return (
        <div className="flex justify-center items-center h-full">
            <div className="lg hidden absolute right-3 top-10 overflow-hidden w-64 h-20 flex justify-center items-center border-2 border-green-500 bg-green-200 text-gray-900 rounded-xl">
                <div className="flex-grow flex justify-center items-start">
                <svg className="w-6 h-6 mr-4 text-green-600 font-extrabold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg> Updated
                </div>
            </div>
            <div className="lgn hidden absolute right-3 top-10 overflow-hidden w-64 h-20 flex justify-center items-center border-2 border-yellow-500 bg-yellow-200 text-gray-900 rounded-xl">
                <div className="flex-grow flex justify-center items-start">
                <svg className="w-6 h-6 mr-4 text-yellow-600 font-extrabold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg> Check you input(s)
                </div>
            </div>
            <div className="flex justify-center items-center flex-col px-10">
                <div className="text-4xl font-bold mb-10">Change Login Details</div>
                <div className="overflow-hidden rounded-md h-12 w-full">
                    <input onChange={handleEmail} type="text" className="bg-gray-100 amt h-full w-full px-7 outline-none" placeholder="Email"/>
                </div>
                <div className="mb-5 flex flex-col items-center ">
                    <p className="em hidden text-sm text-red-600 font-bold">Empty Input</p>
                    <p className="em1 hidden text-sm text-red-600 font-bold">Wrong Email Format</p>
                </div>

                <div className="overflow-hidden rounded-md h-12 w-full">
                    <input onChange={handlePass} type="password" className="bg-gray-100 amt h-full w-full px-7 outline-none" placeholder="New Password"/>
                </div>
                <div className="mb-5 flex flex-col items-center ">
                    <p className="p1 hidden text-red-700 font-extrabold">Empty Input</p>
                </div>

                <div className="overflow-hidden rounded-md h-12 w-full mb-5">
                    <input onChange={handlePass1} type="password" className="bg-gray-100 amt h-full w-full px-7 outline-none" placeholder="Re-Type New Password"/>
                </div>
                <div className="mb-5 flex flex-col items-center ">
                    <p className="p2 hidden text-red-700 font-extrabold">Empty Input</p>
                    <p className="p22 hidden text-red-700 font-extrabold">Passwords don't match</p>
                </div>

                {details.status ?
                    <div onClick={handleUpd} className="transition duration-300 ease-in-out transform hover:bg-green-400 bg-green-300 cursor-pointer text-gray-50 font-bold w-24 h-12 rounded-xl flex justify-center items-center">
                        Update
                    </div>
                    :
                    <div className="transition duration-300 ease-in-out transform  bg-blue-300 text-gray-50 font-bold w-40 h-12 flex justify-center items-center">
                        Account Frozen
                    </div>
                }
                
            </div>
        </div>
    )
}
