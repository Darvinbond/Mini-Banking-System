import React, { useState } from 'react'
import axios from 'axios'

export default function Signup(props) {
    
    const [Fname, setFname] = useState("")
    const [Lname, setLname] = useState("")
    const [Oname, setOname] = useState("")
    const [Email, setEmail] = useState("")
    const [Phone, setPhone] = useState("")
    const [Ophone, setOphone] = useState("")
    const [Age, setAge] = useState("")
    const [Gender, setGender] = useState("")
    const [Address, setAddress] = useState("")
    const [Pass, setPass] = useState("")
    const [Pass1, setPass1] = useState("")
    const [Pin, setPin] = useState("")
    const [Image, setImage] = useState("")

    const handleFname = (e)=>{
        if(e.target.value.length == 0){
            setFname("")
            document.querySelector(".e1").classList.remove("hidden")
        }else{
            setFname(e.target.value)
            document.querySelector(".e1").classList.add("hidden")
        }
    }

    const handleLname = (e)=>{
        if(e.target.value.length == 0){
            setLname("")
            document.querySelector(".e2").classList.remove("hidden")
        }else{
            setLname(e.target.value)
            document.querySelector(".e2").classList.add("hidden")
        }
    }

    const handleOname = (e)=>{
        if(e.target.value.length == 0){
            setOname("")
            document.querySelector(".e3").classList.remove("hidden")
        }else{
            setOname(e.target.value)
            document.querySelector(".e3").classList.add("hidden")
        }
    }

    const handleEmail = (e)=>{
        if(e.target.value.length == 0){
            setEmail("")
            document.querySelector(".e4").classList.remove("hidden")
            document.querySelector(".e5").classList.add("hidden")
        }else{
            document.querySelector(".e4").classList.add("hidden")

            var re = /\S+@\S+\.\S+/;
            if(!(re.test(e.target.value))){
                document.querySelector(".e5").classList.remove("hidden")
            }else{
                setEmail(e.target.value)
                document.querySelector(".e5").classList.add("hidden")
            }
        }
    }

    const handlePhone = (e)=>{
        if(e.target.value.length == 0){
            setPhone("")
            document.querySelector(".e6").classList.remove("hidden")
        }else{
            setPhone(e.target.value)
            document.querySelector(".e6").classList.add("hidden")
        }
    }

    const handleOphone = (e)=>{
        if(e.target.value.length == 0){
            setOphone("")
            document.querySelector(".e7").classList.remove("hidden")
        }else{
            setOphone(e.target.value)
            document.querySelector(".e7").classList.add("hidden")
        }
    }

    const handleAge = (e)=>{
        if(e.target.value.length == 0){
            setAge("")
            document.querySelector(".e8").classList.remove("hidden")
        }else{
            setAge(e.target.value)
            document.querySelector(".e8").classList.add("hidden")
        }
    }

    const handleGender = (e)=>{
        if(e.target.value == ""){
            setGender("")
            document.querySelector(".e9").classList.remove("hidden")
        }else{
            setGender(e.target.value)
            document.querySelector(".e9").classList.add("hidden")
        }
    }

    const handleAddress = (e)=>{
        if(e.target.value == ""){
            setAddress("")
            document.querySelector(".e10").classList.remove("hidden")
        }else{
            setAddress(e.target.value)
            document.querySelector(".e10").classList.add("hidden")
        }
    }

    const handlePass1 = (e)=>{
        if(e.target.value == ""){
            setPass("")
            document.querySelector(".e11").classList.remove("hidden")
        }else{
            setPass(e.target.value)
            document.querySelector(".e11").classList.add("hidden")
        }
    }

    const handlePass2 = (e)=>{
        if(e.target.value == ""){
            setPass1("")
            document.querySelector(".e12").classList.remove("hidden")
        }else{
            setPass1(e.target.value)
            document.querySelector(".e12").classList.add("hidden")
        }
    }

    const handlePin = (e)=>{
        if(e.target.value == ""){
            setPin("")
            document.querySelector(".e14").classList.remove("hidden")
        }else{
            setPin(e.target.value)
            document.querySelector(".e14").classList.add("hidden")
        }
    }

    const handlePassport = (e)=>{
        let name = document.querySelector(".imgg").files[0].name

        if(name == ""){
            setImage("")
            document.querySelector(".e16").classList.remove("hidden")
        }else{
            document.querySelector(".e16").classList.add("hidden")

            
            let s = name.split(".")
            let d = s[s.length -1].toLowerCase()
            // console.log(d)
            if(d == "jpg" || d == "jpeg"){
                setImage(e.target.files[0]);
                document.querySelector(".e15").classList.add("hidden")
                document.querySelector(".dvimg").classList.add("hidden")
            }else{
                document.querySelector(".e15").classList.remove("hidden")
            }
        }
    }

    const handleSubmit = (e)=>{
        if(Pass !== Pass1){
            document.querySelector(".e13").classList.remove("hidden")
        }else{
            document.querySelector(".e13").classList.add("hidden")

            if(Fname == "" || Lname == "" || Oname == "" || Email == "" || Phone == "" || Ophone == "" || Age == "" || Gender == "" || Address == "" || Pass == "" || Pass1 == "" || Pin == "" || Image == "" || !(Pin <= 9999 && Pin >= 1000)){
                document.querySelector(".nolgn").classList.remove("hidden")
                setTimeout(
                    "document.querySelector('.nolgn').classList.add('hidden')"
                , 1500);
            }else{
                let form_data = new FormData()
                form_data.append('fname', Fname)
                form_data.append('lname', Lname)
                form_data.append('email', Email)
                form_data.append('oname', Oname)
                form_data.append('phone', Ophone)
                form_data.append('gender', Gender)
                form_data.append('age', Age)
                form_data.append('address', Address)
                form_data.append('password', Pass)
                form_data.append('pin', Pin)
                form_data.append('age', Age)
                form_data.append('passport', Image)

                let url = 'http://127.0.0.1:8000/app/customer/';

                const full1 = window.location.protocol + '//' + window.location.hostname + ":8000/app/customer"

                axios.post(full1, form_data)
                .then((res) => {
                    document.querySelector(".subg").classList.remove("hidden")
                    setTimeout(
                        "document.querySelector('.nolgn').classList.add('hidden')"
                    , 1500);
                })
                .catch(err => console.log(err))
            }
        }
    }

    return (
        <div className="subg overflow-hidden flex justify-center items-center h-full w-full">
            <div className="nolgn hidden absolute right-3 top-20 overflow-hidden w-64 h-20 flex justify-center items-center bg-yellow-500 text-white rounded-xl">
            <div className="flex-grow flex justify-center items-start">
                Correct your mistakes</div>
            </div>


            <div className="lgn hidden absolute right-3 top-20 overflow-hidden w-64 h-20 flex justify-center items-center bg-green-500 text-white rounded-xl">
            <div className="flex-grow flex justify-center items-start">
                <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg> Successful Login</div>
            </div>


            <div className='bx  my-10 bg-opacity-80 bg-zinc-800 p-8 w-1/2 flex flex-col shadow-lg rounded-md'>
                <div className='flex w-full items-center justify-center mb-8'>
                    <div className='text-4xl font-bold text-green-400'>S<span className='text-gray-50'>i</span>gnup</div>
                </div>

                <div className='flex w-full justify-between mb-4'>
                    <div className='w-full overflow-hidden'><input onChange={handleFname} type='text' className='h-10 px-4 w-full rounded-md bg-gray-50 outline-none' placeholder='Firstname' />
                    <p className='pl-2 e1 hidden text-red-500 font-medium text-sm'>! Empty</p></div>

                    <div className='w-full overflow-hidden mx-2'><input onChange={handleLname} type='text' className='h-10 px-4 w-full rounded-md bg-gray-50 outline-none' placeholder='Lastname' />
                    <p className='pl-2 e2 hidden text-red-500 font-medium text-sm'>! Empty</p></div>

                    <div className='w-full overflow-hidden'><input onChange={handleOname} type='text' className='h-10 px-4 w-full rounded-md bg-gray-50 outline-none' placeholder='Othername' />
                    <p className='pl-2 e3 hidden text-red-500 font-medium text-sm'>! Empty</p></div>
                </div>

                <div className='flex w-full justify-between mb-4'>
                    <div className='w-3/5 overflow-hidden mr-2'><input onChange={handleEmail} type='email' className='h-10 px-4 w-full rounded-md bg-gray-50 outline-none' placeholder='Email Address' />
                    <p className='pl-2 hidden e4 text-red-500 font-medium text-sm'>! Empty</p>
                    <p className='pl-2 hidden e5 text-red-500 font-medium text-sm'>! Wrong email format</p></div>

                    <div className='w-2/5 overflow-hidden'><input onChange={handlePhone} type='phone' className='h-10 px-4 w-full rounded-md bg-gray-50 outline-none' placeholder='Phone' />
                    <p className='pl-2 hidden e6 text-red-500 font-medium text-sm'>! Empty</p></div>
                </div>

                <div className='flex w-full justify-between mb-4'>
                    <div className='w-1/3 overflow-hidden'><input onChange={handleOphone} type='phone' className='h-10 px-4 w-full rounded-md bg-gray-50 outline-none' placeholder='Other Phone' />
                    <p className='pl-2 hidden e7 text-red-500 font-medium text-sm'>! Empty</p></div>

                    <div className='w-1/3 overflow-hidden mx-2'><input onChange={handleAge} type='number' className='h-10 px-4 w-full rounded-md bg-gray-50 outline-none' placeholder='Age' />
                    <p className='pl-2 hidden e8 text-red-500 font-medium text-sm'>! Empty</p></div>

                    <div className='w-1/3 overflow-hidden'>
                    <select onChange={handleGender} className='w-full h-10 rounded-md text-gray-400 bg-gray-50 outline-none'>
                        <option value=''>Select Gender</option>
                        <option value='M'>Male</option>
                        <option value='F'>Female</option>
                        <option value='X'>Prefare not to say</option>
                    </select>
                    <p className='pl-2 e9 hidden text-red-500 font-medium text-sm'>! Empty</p>
                    </div>
                </div>

                <div className='flex flex-col mb-4 overflow-hidden'>
                <div className='flex w-full h-20 justify-between'>
                    <textarea onChange={handleAddress} className='w-full h-full rounded-md px-4 py-2 resize-none bg-gray-50 outline-none' placeholder='Home Address' />
                </div>
                <p className='pl-2 e10 hidden text-red-500 font-medium text-sm'>! Empty</p>
                </div>

                <div className='flex w-full justify-between mb-4'>
                    <div className='w-1/2 flex flex-col overflow-hidden mr-2'><input onChange={handlePass1} type='password' className='h-10 px-4 w-full rounded-md bg-gray-50 outline-none' placeholder='Password' />
                    <p className='pl-2 e11 hidden text-red-500 font-medium text-sm'>! Empty</p>
                    
                    </div>
                    <div className='w-1/2 overflow-hidden'><input onChange={handlePass2} type='password' className='h-10 px-4 w-full rounded-md bg-gray-50 outline-none' placeholder='Password' />
                    <p className='pl-2 e12 hidden text-red-500 font-medium text-sm'>! Empty</p>
                    <p className='pl-2 e13 hidden text-red-500 font-medium text-sm'>! Passwords don't match</p>
                    </div>
                </div>

                {/* <div className='flex w-full h-10 justify-between mb-4'>
                    <input type='password' className='w-1/2 mr-2 px-4 rounded-md bg-gray-50 outline-none' placeholder='New Password' />
                    <input type='password' className='w-1/2 px-4 rounded-md bg-gray-50 outline-none' placeholder='Retype Password' />
                </div> */}

                

                <div className='flex w-full justify-between mb-4'>
                    <div className='flex flex-col w-full justify-end mb-4'>
                        <input onChange={handlePin} type='number' className='w-1/5 px-4 h-10 rounded-md bg-gray-50 outline-none' min='1000' max='9999' placeholder='Pin' />
                        <p className='pl-2 e14 hidden text-red-500 font-medium text-sm'>! Empty</p>
                    </div>

                    <div className='w-1/2 overflow-hidden'>
                        <label for="passp"><div className='dvimg bg-gray-50 h-10 w-full rounded-md flex justify-center items-center cursor-pointer text-gray-400'>Upload Passport</div></label>
                        <input id='passp' name='passp' hidden onChange={handlePassport} type='file' className='imgg h-10 px-4 w-full rounded-md bg-gray-50 outline-none' placeholder='Password' accept='image/*' />
                    <p className='pl-2 e15 hidden text-red-500 font-medium text-sm'>Unsupported</p>
                    <p className='pl-2 e16 hidden text-red-500 font-medium text-sm'>Upload an Image</p>
                    </div>
                </div>

                <div onClick={handleSubmit} className='w-full flex justify-center items-center'>
                    <div className='flex w-24 justify-center items-center p-2 rounded-md bg-green-400 text-gray-100 hover:bg-green-500 cursor-pointer transition duration-500'>Signup</div>
                </div>
            </div>
        </div>
    )
}
