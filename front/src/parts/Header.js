import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../img/3.png';
// import {
//     BrowserRouter,
//     Route,
//     Routes,
//     Switch,
//     Navigate  ,
//     Link
// } from "react-router-dom";

export default function Header() {
    return (
        <div className="text-green-400 flex justify-between absolute w-full z-20 font-bold h-14 bg-transparent px-10">
            <div class="flex justify-center items-center">
                <a href='http://127.0.0.1:3000/'>
                <div className="pt-1 justify-center items-center flex w-full h-full">
                <svg className="w-12 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path></svg>
                <p className="font-light text-md text-gray-50 italic">Resonate Bank</p>
                </div>
                </a>
            </div>
            <div class="flex w-20 justify-center items-center">
                {/* <Link to='/signup' /> */}
                <a href='http://127.0.0.1:3000/signup' target='_blank'>
                <div className="transition duration-300 hover:bg-opacity-0 hover:text-gray-50 text-green-400 h-full flex justify-center items-center cursor-pointer ">Sign Up</div></a>
            </div>
        </div>
    )
}
