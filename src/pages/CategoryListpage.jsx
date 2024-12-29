import React from 'react'
import CategoryList from '../components/CategoryList/CategoryList'
import Header from "../components/Home/Header/Header.jsx";
import Footer from "../components/Home/Footer/Footer"
function CategoryListpage() {
  return (
    <div>
      <Header/>
      <CategoryList/>
      <Footer/>
      </div>
  )
}

export default CategoryListpage