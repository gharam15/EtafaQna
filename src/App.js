import { React } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage, Resetpage, SignPage, HomePage, Recoverpage, Allcategorypage, Forgetpasswordpage,Aboutpage,Profilepage,Sellpage, Choosecategorypage,CategoryListpage, Contactpage,Accountpage, Settingspage,ChangePasswordpage,Editprofilepage, Airjordpage,Productfilterpage,Dashboardpage} from './Routes.js';
function App() {
  return (
    <div>  
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/Login' element={<LoginPage />}></Route>
          <Route path='/Sign' element={<SignPage />} />
          <Route path='/fogetpassword' element={<Forgetpasswordpage />} />
          <Route path='/reset' element={<Resetpage />} />
          <Route path='/recovered' element={<Recoverpage />} />
          <Route path='/Allcategorypage' element={<Allcategorypage/>}></Route>
          <Route path='/Aboutpage' element={<Aboutpage/>}></Route>
          <Route path='/Profilepage'element={<Profilepage/>}></Route>
          <Route path='/post-ad/:categoryId/:subcategoryId'element={<Sellpage/>}></Route>
          <Route path='/category/:categoryId'element={< Choosecategorypage/>}></Route>
          <Route path='/CategoryListpage' element={<CategoryListpage/>}></Route>
          <Route path='/Settingspage' element={<Settingspage/>}></Route>
          <Route path='/Accountpage' element={<Accountpage/>}></Route>
          <Route path='/ChangePasswordpage' element={<ChangePasswordpage/>}></Route>
          <Route path='/Editprofilepage' element={<Editprofilepage/>}></Route>
          <Route path='/Contactpage' element={<Contactpage/>}></Route>
          <Route path='/product/:id' element={<Airjordpage/>}></Route>
          <Route path='/Productfilterpage' element={<Productfilterpage/>}></Route>
          <Route path='/Dashboardpage' element={<Dashboardpage/>}></Route>
          
          
         
        </Routes>
      </BrowserRouter>
     
    </div>
  )
}
export default App;