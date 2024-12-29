import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import { MdFavoriteBorder } from "react-icons/md";
import { FaWhatsapp, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductCard = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [sliderRef, setSliderRef] = useState(null);
    const navigate = useNavigate(); // useNavigate hook for navigation

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://etafqna-api.onrender.com/api/v1/products');
                const textResponse = await response.text();
                console.log('Raw response:', textResponse);

                try {
                    const result = JSON.parse(textResponse);

                    if (result.message === "success" && Array.isArray(result.data)) {
                        const userPromises = result.data.map(async (product) => {
                            try {
                                const userResponse = await fetch(`https://etafqna-api.onrender.com/api/v1/users/${product.owner}`);
                                console.log(userResponse);
                                const userData = await userResponse.json();
                                return { ...product, user: userData.name };
                            } catch (error) {
                                console.error('Error fetching user data:', error);
                                return { ...product, user: 'Unknown User' };
                            }
                        });

                        const productsWithUsers = await Promise.all(userPromises);
                        // Filter out products with price equal to 0
                        const filteredProducts = productsWithUsers.filter(product => product.price !== 0);
                        setProducts(filteredProducts.slice(0, 6));  // Limit to 6 products
                    } else {
                        console.error('Fetched data is not in the expected format:', result);
                        setProducts([]);
                    }
                } catch (jsonError) {
                    console.error('Error parsing JSON response:', jsonError);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setProducts([]);
            }
        };

        fetchProducts();
    }, []);

    const handleChatClick = (product) => {
        setSelectedProduct(product);
        console.log(`Chatting about ${product.name}`);
    };

    const handleCallClick = (product) => {
        setSelectedProduct(product);
        console.log(`Calling seller of ${product.name}`);
    };

    const handleDetailsClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center my-8 mt-[50px]">New Arrivals Products</h2>
            <div className='relative'>
                <button
                    onClick={() => sliderRef?.slickPrev()}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-200 p-2 rounded-lg"
                >
                    <FaChevronLeft />
                </button>
                <Slider ref={setSliderRef} {...sliderSettings} className=''>

                    {products.map((product) => (
                        <div key={product.id} className="max-w-[350px] h-[500px] gap-2 rounded overflow-hidden border p-2 bg-white  mx-2">
                            <div className="px-6 py-4 ">

                                {product.imageCover && product.imageCover.url ? (
                                    <img
                                        className="max-w-screen-xl h-[250px] mt-[-32px] ml-[-40px] object-cover"
                                        src={product.imageCover.url}
                                        alt={product.name}
                                    />


                                ) : (

                                    <div className="w-full h-60 flex items-center justify-center">
                                        <span>No image available</span>
                                    </div>
                                )}
                                <div className="font- text-[16px] mb-2 mt-[20px]">{product.name}</div>
                                <MdFavoriteBorder className='text-orange-500 text-2xl ml-[260px] mt-[-15px]' />
                                <p className="text-gray-700 text-base">posted by {product.owner.name}</p>
                                <button
                                    onClick={() => handleDetailsClick(product.id)}
                                    className='text-gray-600 text-xs underline ml-[160px] mt-[80px]'
                                >
                                    product details
                                </button>
                                <p className='text-orange-500 text-[14px] ml-[180px] mt-[-81px] absolute border-lg'>Exchange</p>
                                <p className="text-orange-500 text-xl mt-[-87px]">{product.price} L.E</p>
                                <FaLocationDot className='text-orange-500 text-[14px] ml-[-20px] mt-[15px]' />
                                <p className="text-gray-500 text-sm mt-[-17px] ml-[5px]">{product.location?.address}</p>
                            </div>
                            <div className="px-4 pt-4 pb-2 ml-[5px] flex justify-between items-center">
                                <button onClick={() => handleChatClick(product)} className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-1 px-4 rounded-full flex items-center">
                                    <FaWhatsapp className="mr-2" /> Chat
                                </button>
                                <button onClick={() => handleCallClick(product)} className="bg-orange-400 ml-[-14px] hover:bg-orange-500 text-white font-bold py-1 px-4 rounded-full flex items-center">
                                    <IoCallOutline className="mr-2" /> Call
                                </button>
                            </div>
                        </div>
                    ))}
                </Slider>
                <button
                    onClick={() => sliderRef?.slickNext()}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-200 p-2 rounded-lg"
                >
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
