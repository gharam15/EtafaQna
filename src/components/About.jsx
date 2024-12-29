import React from 'react'
import anwar from '../Assests/anwar.png'
import fady from '../Assests/fady.png'
import samer from '../Assests/samer.jpg'
import ghram from '../Assests/ghram.png'
import fatma from '../Assests/fatma.png'
import basant from '../Assests/basant.png'
import rowida from '../Assests/rowida.png'
import samar from '../Assests/samar (2).png'
import { FaLinkedin } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
function About() {
  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="lg:text-center">
        <h2 className="mb-2 text-2xl sm:text-4xl font-BG whitespace-pre-line text-center tracking-tighte text-orange-500">About EtafaQna</h2>
        <p className="mt-3 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
          Your Trusted Online Marketplace
        </p>
        <p className="mb-2 text-1xl sm:text-[17px] font-BG whitespace-pre-line text-center tracking-tighte mt-4">
          EtafaQna is committed to providing high-quality products and exceptional service to our customers. We strive to
          create a seamless shopping   <br />  Your Best Gate To <br /> Buy, Sell, Donate & Exchange <br /> Whatever You Need
        </p>
      </div>
      <svg
          className="h-[150px] sm:h-[150px] w-full lg:h- text-orange-400 mt-5"
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1440 0V19.4559C1357.94 9.24227 1262.67 2 1158.67 2C1041.33 2 907.338 21.2895 788.666 21.2895C684.002 21.2895 586.67 2 482.667 2C379.281 2 278.517 23.1659 170.041 19.4559C66.9267 16.0383 0 19.4559 0 19.4559V0H1440Z"
            fill="currentColor"
          />
          
        </svg>
        <div className='ml-[850px] mt-[45px] absolute'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"> <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /> </svg>
        </div>
       
     
      <h2 className='mb-2 text-7xl sm:text-5xl font-BG whitespace-pre-line text-center tracking-tighte'>"Team members</h2>
      <ul className='flex rounded-lg  gap-5 mt-[80px] ml-[350px]'>
        <li className='h-[150px] w-[150px]'><img src={anwar} alt="" className='rounded-full'/>
        <div className='flex text-[15px] gap-3 ml-[32px] mt-[38px]'>
        <FaLinkedin />
        <FaFacebookSquare/>
        <FaGithubSquare/>
        </div>
        <div>
        <p className='text-sm mt-[-50px] ml-[35px] '>Anwar Rizk</p>
        </div>
        </li>
        <li className='h-[150px] w-[150px]'><img src={fady } alt=""className='rounded-full'/>
        <div className='flex text-[15px] gap-3 ml-[38px] mt-[38px] '>
        <FaLinkedin />
        <FaFacebookSquare/>
        <FaGithubSquare/>
        </div>
        <div>
        <p className='text-sm mt-[-50px] ml-[35px] '>Fady kamal</p>
        </div>
        </li>
        <li className='h-[120px] w-[150px]'><img src={samer } alt="" className='rounded-full'/>
        <div className='flex text-[15px] gap-3 ml-[38px] mt-[38px]'>
        <FaLinkedin />
        <FaFacebookSquare/>
        <FaGithubSquare/>
        </div>
        <div>
        <p className='text-sm mt-[-50px] ml-[30px] '>Samir magdy</p>
        </div>
        </li>
      </ul>
      <ul className='flex gap-5 mt-[100px]  ml-[200px]'>
      <li className='h-[80px] w-[140px]'><img src={samar} alt="" className='rounded-full'/>
        <div className='flex text-[15px] gap-3 ml-[25px] mt-[38px]'>
        <FaLinkedin />
        <FaFacebookSquare/>
        <FaGithubSquare/>
        </div>
        <div>
        <p className='text-sm mt-[-50px] ml-[10px] w-[250px]'>Samar mostafa</p>
        </div>
        </li>
        <li className='h-[150px] w-[150px]'><img src={ghram} alt="" className='rounded-full'/>
        <div className='flex text-[15px] gap-3 ml-[35px] mt-[47px]'>
        <FaLinkedin />
        <FaFacebookSquare/>
        <FaGithubSquare/>
        </div>
        <div>
        <p className='text-sm mt-[-50px] ml-[22px] '>Ghram mokhtar</p>
        </div>
        </li>
        <li className='h-[150px] w-[150px]'><img src={rowida } alt="" className='rounded-full'/>
        <div className='flex text-[15px] gap-3  ml-[35px] mt-[47px]'>
        <FaLinkedin />
        <FaFacebookSquare/>
        <FaGithubSquare/>
        </div>
        <div>
        <p className='text-sm mt-[-50px] ml-[35px] w-[250px] '>Rowida attia </p>
        </div>
        </li>
        <li className='h-[150px] w-[150px]'><img src={basant} alt="" className='rounded-full'/>
        <div className='flex text-[15px] gap-3  ml-[35px] mt-[47px]'>
        <FaLinkedin />
        <FaFacebookSquare/>
        <FaGithubSquare/>
        </div>
        <div>
        <p className='text-sm mt-[-50px] ml-[30px] w-[250px]'>Basant zeton</p>
        </div>
        </li>
        <li className='h-[150px] w-[150px]'><img src={fatma} alt="" className='rounded-full'/>
        <div className='flex text-[15px] gap-3 ml-[35px] mt-[47px]'>
        <FaLinkedin />
        <FaFacebookSquare/>
        <FaGithubSquare/>
        </div>
        <div>
        <p className='text-sm mt-[-50px] ml-[12px] w-[250px] '>Fatma abd elfatah</p>
        </div>
        </li>
      </ul>
    </div>
    <p className='h-[150px]'></p>
  </div>
  )
}

export default About