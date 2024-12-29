import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { AiFillGoogleCircle } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import payment from '../../../Assests/payment.png'
import logo from '../../../Assests/logoo.png'
const Footer = () => {
  return (
    <footer className="relative  bg-[#f3f0f0] text-white m-[-10px] mt-[-10px]">
        <h2 className='text-3xl flex mt-[180px] ml-[20px]  text-slate-800'>EtafaQna</h2>
      {/* Wave background */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          className="h-16 sm:h-20 lg:h-24 w-full"
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1440 0V19.4559C1357.94 9.24227 1262.67 2 1158.67 2C1041.33 2 907.338 21.2895 788.666 21.2895C684.002 21.2895 586.67 2 482.667 2C379.281 2 278.517 23.1659 170.041 19.4559C66.9267 16.0383 0 19.4559 0 19.4559V0H1440Z"
            fill="currentColor"
          />
        </svg>
      </div>
      {/* Footer content */}
      <div className="container mx-auto text-slate-800 flex flex-wrap justify-between mt-[20px]">
        {/* Links to important pages */}
        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 px-3 mb-4 mt-[30px]">
          <h2 className="text-1xl font mb-4">ABOUT US</h2>
          <ul>
            <li className="block hover:text-orange-600">About EtafaQna Group</li>
            <li className="block hover:text-orange-600">Careers</li>
            <li className="block hover:text-orange-600">Contact Us</li>
            <li className="block hover:text-orange-600">EtafaQna for Businesses</li>
            </ul>
        </div>
        {/* Social media icons */}
        <div className=" sm:w-1/2 w-[20px] lg:w-1/5 px-4 mb- h-[200px] mt-[30px]">
          <h2 className="text-1xl font mb-4  text-slate-800">EtafaQna</h2>
          <ul>
          <li className="block hover:text-orange-600 mt-[30px]">Blog</li>
            <li className="block hover:text-orange-600">Help</li>
            <li className="block hover:text-orange-600">Sitemap</li>
            <li className="block hover:text-orange-600">Terms of use</li>
            <li className="block hover:text-orange-600">Privacy Policy</li>
          </ul>
        </div>
        <div className="w-full sm:w-1/5 px-4 mb-4 mt-[30px]">
          <h2 className="text-1xl font mb-4">Help</h2>
          <ul>
          <li className="block hover:text-orange-600">Buy product or service</li>
            <li className="block hover:text-orange-600">Sell product or service</li>
            <li className="block hover:text-orange-600">Exchange product or service</li>
            <li className="block hover:text-orange-600">Donate product or service</li>
        
          </ul>
        </div>
        <div className="w-full sm:w-1/5 px-4 mb-4 mt-[30px]">
          <h2 className="text-1xl font mb-4">Shop</h2>
          <ul>
          <li className="block hover:text-orange-600">New Arrivals</li>
            <li className="block hover:text-orange-600">Best Sellers</li>
            <li className="block hover:text-orange-600">Sale</li>
            <li className="block hover:text-orange-600">Gift Cards</li>
        
          </ul>
        </div>
        <img className=" flex p-0 my ml-[1100px] w-[300px]" src={payment} alt="payment" />
        {/* Newsletter subscription form */}
        <div className="w-full  px-4 mb-2 ml-[350px]">
          <h2 className="text-xl font-bold mb-4 ml-[150px]">Subscribe to Our Newsletter</h2>
          <form>
            <input type="email" placeholder="Enter your email" className="bg-white border-2 border-gray-300 p-2 rounded-md mb-2 ml-[-10px] w-[600px]" />
            <button type="submit" className="bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-orange-400  ml-[10px] ">Subscribe</button>
          </form>
        </div>
      </div>
 <ul className='flex gap-3 ml-[50px] mt-[-80px]  text-slate-800'>
  <li><FaFacebook  className='text-orange  mt-[-80px]' size={28}/></li>
  <li><AiFillGoogleCircle  className='text-orange  mt-[-80px]' size={28}/></li>
  <li>< FaGithub  className='text-orange  mt-[-80px]' size={28}/></li>
  <li><FaXTwitter  className='text-orange  mt-[-80px]' size={28}/></li>
 </ul>
      {/* Bottom border */}
      <hr className="w-4/5  mx-auto border-white  mt-[165px] " />

      {/* Bottom text */}
      <div className="text-center  text-slate-800 mt-[-18px]">
        <p>Classifieds in Egypt &copy; 2024</p>
      </div>
  
    </footer>
  );
};

export default Footer;
