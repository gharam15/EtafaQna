
import Header from "../components/Home/Header/Header.jsx";
import HeaderBottom from "../components/Home/Header/HeaderBottom.jsx";
import Slider from "../components/Home/Slider/Slider.jsx";
import Headercategory from"../components/Home/Header/Headercategory.jsx"
import Featcher from "../components/Home/Feather/Featcher.jsx";
import SpecialCase from "../components/Home/specialcase/Spacialcase.jsx";
import ShuffleHero from "../components/Gallery/ShuffleHero.jsx";
import Footer from "../components/Home/Footer/Footer"
import Prodcutcard from '../components/Productcard.jsx';
import Slidermarks from '../components/Slidermarks.jsx'
import Donatesection from "../components/Donatesection.jsx";
import Medialproduct from'../components/Medialproduct.jsx';
function HomePage() {
  return (
    <div className="bg-white ">
        <Header/>
        <HeaderBottom/>
        <Headercategory/>
        <Slider/>
        <SpecialCase/>
        <Prodcutcard />
        <Donatesection />
        <ShuffleHero/>
        <Medialproduct/>
        <Slidermarks/>
        <Featcher/>
        <Footer />
       
        
     
        
    
    </div>
  )
}

export default HomePage;