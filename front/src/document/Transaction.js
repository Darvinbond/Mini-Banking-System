import React, { useState } from 'react'
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import {useSelector} from 'react-redux'

const Transaction = () => {
    const printRef = React.useRef();
    const transactions = useSelector(state => state.transaction)

    var loc = window.location.pathname
    if(loc.lastIndexOf('/') == loc.length-1){
        loc = loc.slice(0, -1)
        loc = loc.split("/")
        var id  = parseInt(loc[loc.length-1]);
    }else{
        loc = loc.split("/");
        var id  = parseInt(loc[loc.length-1]);
    }
    
    var Data = {}
    transactions[0].forEach(element => {
        if(element.id == id){
            Data = element
        }
    }); 

    const handleDownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight =
      (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('print.pdf');
  };

  return (
    <div>
      <div onClick={handleDownloadPdf} className="transition duration-300 cursor-pointer lg absolute right-10 top-10 overflow-hidden w-20 h-20 flex justify-center items-center border-2 hover:text-green-200 hover:bg-green-500 border-green-500 text-green-500 bg-green-200 hover:border-green-600 rounded-full">
        <div className="flex-grow w-full  flex justify-center items-start">
            <svg class="w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
        </div>
    </div>
      <div className="h-full w-full px-36 py-4" ref={printRef}>
        <div className="flex text-gray-900 text-6xl font-black items-center justify-start mb-28"><span className="text-green-500 mr-2">Resonate</span> Bank</div>
        <div className="flex text-gray-900 text-4xl font-black items-center justify-center mb-5">Transaction Details</div>
        <div className="flex text-gray-500 font-thin text-sm items-center justify-center">Generated on 12/12/2021</div>
        <div className="px-20 mt-10">
            <div className="w-full flex border-b-2 border-gray-300 pb-2">
                <div className="w-2/5 font-bold pl-2 text-lg">Transaction Amount</div>
                <div className="w-3/5">${Data.amount}</div>
            </div>
            <div className="w-full mt-8 flex border-b-2 border-gray-300 pb-2">
                <div className="w-2/5 font-bold pl-2 text-lg">Transaction Type</div>
                <div className="w-3/5">INTRA-BANK</div>
            </div>
            <div className="w-full mt-8 flex border-b-2 border-gray-300 pb-2">
                <div className="w-2/5 font-bold pl-2 text-lg">Transaction Date</div>
                <div className="w-3/5">{Data.date}</div>
            </div>
            <div className="w-full mt-8 flex border-b-2 border-gray-300 pb-2">
                <div className="w-2/5 font-bold pl-2 text-lg">Sender</div>
                <div className="w-3/5 uppercase">{Data.from_name}</div>
            </div>
            <div className="w-full mt-8 flex border-b-2 border-gray-300 pb-2">
                <div className="w-2/5 font-bold pl-2 text-lg flex items-center">Beneficiary</div>
                <div className="w-3/5 flex flex-col">
                    <div className="mb-2 uppercase">{Data.to_name}</div>
                    <div className="mb-2">{Data.to_acc}</div>
                    <div>Resonate Bank</div>
                </div>
            </div>
            <div className="w-full mt-8 flex border-b-2 border-gray-300 pb-2">
                <div className="w-2/5 font-bold pl-2 text-lg">Remark</div>
                <div className="w-3/5">{Data.beneficiary == "" ? "---------" : Data.beneficiary}</div>
            </div>
            <div className="w-full mt-8 flex border-b-2 border-gray-300 pb-2">
                <div className="w-2/5 font-bold pl-2 text-lg">Transaction Status</div>
                <div className="w-3/5">Successful</div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction