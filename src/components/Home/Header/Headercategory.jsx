import React from 'react'
import { Link } from 'react-router-dom'
import { BsLaptop } from "react-icons/bs";
import { LuBedDouble } from "react-icons/lu";
import { FaDog } from "react-icons/fa";
import { GiLipstick } from "react-icons/gi";
import { FiSlack } from "react-icons/fi";
import { IoGameController } from "react-icons/io5";
function Headerslice() {
  return (
    <div className='flex'> 
 <ul className=' flex gap-[150px] text-1/2xl  text-black font mt-[12px] ml-[140px] '>
 <Link to ='/Productfilterpage'><BsLaptop className=' ml-[-30px] text-orange-500' /> <li className='hover:text-orange-500 mt-[-20px]'>Electronics</li></Link> 
 <Link to ='/Productfilterpage'><LuBedDouble className=' ml-[-30px] text-orange-500'  /><li className='hover:text-orange-500  mt-[-20px]'>Furniture</li></Link>
 <Link to ='/Productfilterpage'><FaDog className=' ml-[-28px] text-orange-500'/><li className='hover:text-orange-500 mt-[-20px]'>Pets</li></Link>
 <Link to ='/Productfilterpage'><GiLipstick className=' ml-[-30px] text-orange-500'/><li className='hover:text-orange-500 mt-[-20px]'>Fashoins&beautey</li></Link>
 <Link to ='/Productfilterpage'>< IoGameController className=' ml-[-30px] text-orange-500' /><li className='hover:text-orange-500 mt-[-20px]'>Games</li></Link>
 <Link to ='/Productfilterpage'>< FiSlack className=' ml-[-30px] text-orange-500' /><li className='hover:text-orange-500 mt-[-20px]'>more category</li></Link>
 
 
 </ul>
     
</div> 
  )
}
export default Headerslice;