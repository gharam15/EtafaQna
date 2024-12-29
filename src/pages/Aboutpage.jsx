import React from 'react'
import About from '../components/About';
import Header from '../components/Home/Header/Header';
import HeaderBottom from '../components/Home/Header/HeaderBottom';
import Footer from '../components/Home/Footer/Footer'
function Aboutpage() {
  return (
    
    <div className='bg-white'>
      <Header />
      <HeaderBottom />
      <About/>
      <Footer/>
      </div>
  )
}

export default Aboutpage