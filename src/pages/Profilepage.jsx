import React, { useEffect, useState } from 'react';
import Profile from '../components/Category/Profile/Profile';
import Cookies from 'js-cookie';
import { Oval } from 'react-loader-spinner';
import Header from "../components/Home/Header/Header.jsx";
import HeaderBottom from "../components/Home/Header/HeaderBottom.jsx";
import  Footer from  "../components/Home/Footer/Footer.jsx"

function Profilepage() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = Cookies.get('Bearer');
    setToken(storedToken);
  }, []);

  if (!token) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Oval
          height={80}
          width={80}
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }

  return  <div>
    <Header/>
   <Profile />
   <Footer/>
   </div>;
}

export default Profilepage;
