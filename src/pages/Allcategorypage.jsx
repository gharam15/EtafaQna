import React from 'react';
import Categoryfilter from '../components/Category/Allcategory/Categoryfilter.jsx';
import Pricefilter from '../components/Category/Allcategory/Pricefilter.jsx';
import Header from '../components/Home/Header/Header.jsx';
import HeaderBottom from '../components/Home/Header/HeaderBottom.jsx';
import Footer from '../components/Home/Footer/Footer.jsx';
import Headercategory from '../components/Home/Header/Headercategory.jsx'
function AllCategorypage() {
  return (
    <div className='bg-white'>
      <Header/>
      <HeaderBottom/>
      <Headercategory />
      <Categoryfilter/>
      <Pricefilter/>
      <Footer/>
    </div>
  );
};
export default AllCategorypage;