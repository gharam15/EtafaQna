import React from 'react'
import Productfilter from '../components/Productfilter';
import Header from '../components/Home/Header/Header.jsx';
import Footer from "../components/Home/Footer/Footer"
function Productfilterpage() {
  return (
    <div className='bg-white'>
         <Header/>
        <Productfilter />
        <Footer />
        </div>
  )
}

export default Productfilterpage