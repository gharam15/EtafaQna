import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../Assests/logo.png';
import styles from "../../styles/Styles";

const Forgetpassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); 

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(
        'https://etafqna-api.onrender.com/api/v1/auth/forgotPassword',
        { email }
      );

      if (response.status === 200) {
        toast.success('Reset code sent to your email!');
        setTimeout(() => {
          navigate('/recovered'); 
        }, 1000); 
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 404) {
          toast.error('No user found with the provided email address.');
        } else if (status === 500) {
          toast.error('Error sending email. Try again later.');
        } else {
          toast.error('An unexpected error occurred.');
        }
      } else {
        toast.error('An error occurred. Please check your network connection.');
      }
    }
  };

  return (
    <div className='w-full h-screen flex items-start'>
      <div className="relative w-1/2 h-full flex flex-col bg-gray-200">
        <div className="my-[130px] align-baseline text-center flex flex-col">
          <img className='logo-image flex p-0 my-3' src={logo} alt='logo' />
          <motion.p
            className="p-0 text-center text-2xl font-bold text-gray-900 my-3"
          >
            Your Best Gate To <br /> Buy, Sell, Donate & Exchange <br /> Whatever You Need
          </motion.p>
        </div>
      </div>

      <div className='w-1/2 h-full flex flex-col'>
        <div className='flex flex-col sm:px-20'>
          <h5 className="p-0 my-[50px] text-center text-3xl font-bold text-gray-900">
            <span>Forgot Password</span>
          </h5>
          <h5 className="p-0 my-[50px] text-left text-3xl text-gray-600">
            We'll send a verification code to this email address if it matches an existing account.
          </h5>
          
          <form className='space-y-7 flex flex-col w-full h-full' onSubmit={handleForgotPassword}>
            <div>
              <label htmlFor='email' className="block text-sm font-medium text-gray-700">
                Enter your Email address
              </label>
              <div className='mt'>
                <input
                  type="email"
                  name='email'
                  autoComplete='email'
                  placeholder="Enter Your Email Address..."
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm'
                />
              </div>
            </div>

            <div className={`${styles.noramlFlex} justify-between`}>
              <div className={`${styles.noramlFlex}`}>
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-4 w-4 text-orange-600 focus:ring-orange border-gray-400 rounded-full"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  I accept the Terms and Conditions
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700"
                disabled={!email}
              >
                {email ? 'Send Reset Code' : 'Enter Email'}
              </button>
              <p className="my-3 block text-center text-gray-400">
                By clicking 'Send Reset Code', you agree to ETFA2NA'S terms of service and privacy policy.
              </p>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Forgetpassword;
