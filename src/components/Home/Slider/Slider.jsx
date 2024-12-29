import React, { useState } from 'react'
import { Carousel} from 'react-bootstrap'
import img2 from '../../../Assests/hfgfxg.jpg'
import img3 from '../../../Assests/Untitled design (3).png'
import img1 from '../../../../src/Assests/images/banner/img3.jpg'
const Silder = () => {
    const [index, setIndex] = useState(0)
    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex)
    }
    return (
        <div className='mt-[50px]'>
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item className="slider-background mt-[0px]" interval={2000}>
                <div className="d-flex flex-row justify-content-center align-items-center">
                    <img
                        style={{ height: "320px", width: "1343.53px" }}
                        className=""
                        src={img2}
                        alt="  "
                    />
                    <div className="">
                        
                    </div>
                </div>
            </Carousel.Item>
            <Carousel.Item className="slider-background2" interval={2000}>
                <div className="d-flex flex-row justify-content-center align-items-center">
                    <img
                        style={{ height: "320px", width: "1343.53px" }}
                        className=""
                        src={img3}
                        alt="  "
                    />
                    <div className="">
                       
                    </div>
                </div>
            </Carousel.Item>

            <Carousel.Item className="slider-background3" interval={2000}>
                <div className="d-flex flex-row justify-content-center align-items-center">
                    <img
                        style={{ height: "320px", width: "1343.53px" }}
                        className=""
                        src={img1}
                        alt="  "  />
                    
                        <p className="slider-title absolute ml-[-400px] text-[1000px] h-20 w-46 text-black"> </p>
                        
                </div>
            </Carousel.Item>

          
           
        </Carousel>
      
        </div>
    )
}

export default Silder