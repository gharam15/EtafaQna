import React from 'react'
import { FaShippingFast } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { AiOutlineReload } from "react-icons/ai";
import { FaCreditCard } from "react-icons/fa";
function Featcher() {
    return (
        <div className='flex'>
            {/* <h2 className='flex my-[0px] ml-[500px] h-[100px] mt-[70px] text-4xl '>
                <div class="container flex items-center justify-center">
                    <div class="card_box w-[30px] h-[100px] rounded-lg bg-gradient-to-br relative  cursor-pointer transition-transform duration-300 hover:scale-90">
                        <span className=' flex ml-[110px] mt-[45px] font-bold -m-5  w-[250px]'>Our feather</span>
                        <span class="absolute overflow-hidden w-40 h-40 top-0 left-0 flex items-center justify-center">
                            <span class="absolute w-[280px] h-10 bg-gradient-to-r from-orange-600 via-yellow-500 to-orange-500 transform -rotate-45 translate-y-[-50px] flex items-center justify-center text-slate-950 font-semibold uppercase tracking-wider shadow-2xl rounded-sm"></span>
                            <span class="absolute w-[0px] h-[40px] bottom-0 left-0 z-[-1] bg-gradient-to-r from-red-500 via-yellow-500 to-red-500"> </span>
                        </span>
                    </div>
                </div>
            </h2> */}
            <div className='w-[1220px] ml-[90px] flex mt-[-180px]'>
                <div className='hover:-translate-y-2 group bg-transparent duration-500 w-[420px] text-1xl h-[150px] my-[40px] ml-[10px] mt-[280px]  flex text-neutral-900 flex-col justify-center items-center relative rounded-xl overflow-hidden shadow-md'>
                    <FaShippingFast className=' flex text-3xl text-[#EF7215]  ml-[-220px] my-[-30px] mt-[30px]' />
                    <h4 className='text-xl ml-[-40px] '>Free shipping <br /></h4>
                    <h6 className=' text-xs text-slate-500'>When you spend 80LE or more <br /></h6>
                </div>
                <div className='hover:-translate-y-2 group bg-transparent duration-500 w-[420px] text-1xl h-[150px] my-[20px] ml-[60px]  mt-[280px] flex text-neutral-900 flex-col justify-center items-center relative rounded-xl overflow-hidden shadow-md'>
                    <IoChatbubbleEllipsesSharp className='text-3xl text-[#EF7215] mt-[20px] ml-[-237px] my-[-30px]' />
                    <h4 className='text-xl ml-[24px]'>We are available 24/7</h4>
                    <h6 className=' text-xs text-slate-500 '>Need help? contact us anytime <br /></h6>

                </div>
                <div className='hover:-translate-y-2 group bg-transparent duration-500 w-[420px] text-1xl h-[150px] my-[20px] ml-[50px]   mt-[280px] flex text-neutral-900 flex-col justify-center items-center relative rounded-xl overflow-hidden shadow-md'>
                    <AiOutlineReload className='text-3xl text-[#EF7215] mt-[20px] ml-[-200px] my-[-30px]' />
                    <h4 className='text-xl ml-[23px] '>Satisfied or return<br /></h4>
                    <h6 className=' text-xs text-slate-500'>Easy 30-day return policy <br /></h6>
                </div>
                <div className='hover:-translate-y-2 group bg-transparent duration-500 w-[450px]  mt-[280px] text-1xl h-[150px] my-[20px] ml-[60px] flex text-neutral-900 flex-col justify-center items-center relative rounded-xl overflow-hidden shadow-md'>
                    <FaCreditCard className='text-3xl text-[#EF7215] mt-[20px] ml-[-270px] my-[-30px]' />
                    <h4 className='text-xl '>100% secure payments<br /></h4>
                    <h6 className=' text-xs text-slate-500 '>Visa, Mastercard,vodafoncash, PayPal <br /></h6>
                </div>
                
            </div>
        </div>

    )
}


export default Featcher