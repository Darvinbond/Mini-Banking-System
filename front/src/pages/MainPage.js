import React, { useState } from 'react'
import BU from '../BU.jpg'
import SIDE from '../SIDE.png'
import ABT from '../ABT.jpg'
import { BrowserRouter as Router, Route, Link, useParams } from "react-router-dom";


function MainPage() {

    return (
        <div className='h-full upp '>
            <div className='upmn h-screen flex flex-col'>
                <div className='flex mt-8 h-10 justify-between px-24'>
                    <div className='flex'>
                    <img className='h-full' src={BU} /></div>
                    <div className='flex justify-around w-2/5 items-center bg-gray-700 text-gray-50 rounded-md'>
                        <a className='hover:bg-green-400 hover:font-bold h-full flex justify-center cursor-pointer transition duration-300 items-center px-4 hover:rounded-md'><div>Home</div></a>
                        <a href='#abt' className='hover:bg-green-400 hover:font-bold h-full flex justify-center cursor-pointer transition duration-300 items-center px-4 hover:rounded-md'><div>About</div></a>
                        <a href='http://127.0.0.1:3000/login' target='_blank' className='hover:bg-green-400 hover:font-bold h-full flex justify-center cursor-pointer transition duration-300 items-center px-4 hover:rounded-md'><div>Login</div></a>
                        <a href='http://127.0.0.1:3000/signup' target='_blank' className='hover:bg-green-400 hover:font-bold h-full flex justify-center cursor-pointer transition duration-300 items-center px-4 hover:rounded-md'><div>SignUp</div></a>
                    </div>
                </div>
                <div className='flex h-full flex-row w-full px-20'>
                    <div className='w-6/12 flex justify-center flex flex-col'>
                        <div className='text-green-400 text-4xl mb-4 font-bold csv'>Welcome 
                        to <br /><span className='text-6xl'>Resonate Bank</span>
                        </div>
                        <div className='trr text-gray-800 font-bold w-10/12'>At Resonate, we believe that the beauty of life lies in the little things that give us a better expression of ourselves. To gain control, To stay connected and to be flexible and Pace yourselves in reachiing your goals. <br />As your bank, we are here to support. Let's go on this journey together.</div>
                    </div>
                    <div className='w-6/12 overflow-hidden flex justify-center items-center'>
                        <img className='w-full rounded-md' src={SIDE} />
                    </div>
                </div>
            </div>





            <div id='abt' className='h-screen bg-gray-200 flex flex-col overflow-hidden'>
                <div className='w-full h-full flex flex-col abtt bg-opacity-10'>
                    <div className='flex h-full flex-row w-full px-20 pt-20'>
                        <div className='w-5/12 overflow-hidden flex justify-center items-center'>
                            <img className='w-full' src={ABT} />
                        </div>
                        <div className='trr w-7/12 flex justify-center items-end flex flex-col'>
                            <div className='text-green-400 text-4xl mb-4 font-bold'>About Us</div>
                            <div className='text-gray-800 font-bold w-9/12 flex justify-end items-end'>Stay one step ahead of your finances with Resonant Bank, our app and banking services are designed with you in mind. Need an Account? Open an account for your personal expense. Get up to  #10,000 on completion of your registration.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage