import React, { useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {new_route} from '../actions'
import axios from 'axios'

export default function AdminTransaction() {
    const trans = useSelector(state => state.atransaction)[0].data
    const [Data, setData] = useState({})
    const [SData, setSData] = useState({})
    const dispatch = useDispatch()

    const [dat, setdat] = useState(true)


    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/transactions/')
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
    }, []);

    const handleSearch = (e)=>{
        var pst = []
        if(e.target.value != ""){
            // console.log(users.data[0])
            SData.forEach(eac => {
                if(eac.from_name.toLowerCase().includes(e.target.value) || eac.to_name.toLowerCase().includes(e.target.value) || eac.to_acc.toLowerCase().includes(e.target.value) || eac.from_acc.toLowerCase().includes(e.target.value)){
                    pst.push(eac)
                }
            })
            
            console.log(pst)
            
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
        <div className="relative w-full pt-10 px-5 h-full flex flex-col justify-center items-center">
            <div className="w-full mb-4 h-10 items-center flex flex-col">
                <div className="border-2 border-gray-400 w-80 h-10 rounded-lg overflow-hidden">
                    <input onChange={handleSearch} type="search" placeholder="Search Transactions" className="bg-gray-200 px-2 w-full h-full outline-none" />
                </div>
            </div>
            <div className="rounded-lg gd mb-3 shadow-lg px-10 pt-4 w-full overflow-auto pb-10">

            {dat ? 
                Object.values(SData).map((milestone) => {
                return (
                <div className="rounded-lg w-full flex mt-4 overflow-hidden h-14 bg-gray-200">

                    <div className="w-1/12 h-full flex text-gray-50 flex-col justify-center items-center px-2 bg-red-400">
                        <div>
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 15.707a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 0zm0-6a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                        </div>
                        <div className="text-sm">From</div>
                    </div>
                    <div className="w-2/12 h-full flex justify-center items-center uppercase text-sm">
                        {milestone.from_name}
                    </div>
                    <div className="w-2/12 h-full flex justify-center items-center text-sm">
                    {milestone.from_acc}
                    </div>
                    <div className="w-1/12 h-full flex text-gray-50 flex-col justify-center items-center px-2 bg-green-400">
                        <div>
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                        </div>
                        <div className="text-sm">To</div>
                    </div>
                    <div className="w-2/12 h-full flex justify-center items-center uppercase text-sm">
                    {milestone.to_name}
                    </div>
                    <div className="w-2/12 h-full flex justify-center items-center text-sm">
                    {milestone.to_acc}
                    </div>
                    <div className="bg-gray-300 h-full w-2/12 flex flex-col justify-center items-center">
                        <div className="font-semibold">Amount:</div>
                        <div>${milestone.amount}</div>
                    </div>

                </div>
                )})
                :
                    "No transactions yet!"
                }

            </div>
        </div>
    )
}
