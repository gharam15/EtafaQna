import React, { useEffect, useState } from 'react';
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
                        setProducts(filteredProducts.slice(3, 12));  // Limit to 6 products
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

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center my-8 mt-[50px]">Most popular Products</h2>
            <div className='flex flex-wrap justify-center gap-4 mt-[20px]'>
                {products.map((product) => (
                    <div key={product.id} className="max-w-[350px] h-[500px] gap-2 rounded mt-[50px] overflow-hidden border p-2 bg-white">
                        <div className="px-6 py-4 relative">
                            {product.imageCover && product.imageCover.url ? (
                                <img
                                    className="max-w-screen-2xl h-[250px] object-cover mt-[-32px] ml-[-40px]"
                                    src={product.imageCover.url}
                                    alt={product.name}
                                />
                            ) : (
                                <div className="w-full h-60 flex items-center justify-center">
                                    <span>No image available</span>
                                </div>
                            )}
                            <div className="absolute top-0 right-0 bg-orange-400 text-white px-2 py-1 ">Sale</div>
                            <div className="font-semibold text-xl mb-2 mt-[1px]">{product.name}</div>
                            <MdFavoriteBorder className='text-orange-500 text-2xl flex mt-[-15px] bottom-[-5px] left-0 ml-[260px]' />
                            <p className="text-gray-700 text-base">posted by {product.owner.name}</p>
                            
                       
                            <p className="text-orange-500 text-xl absolute mt-[10px] ">{product.price} L.E</p>
                            <FaLocationDot className='text-orange-500 absolute text-[14px] mt-[45px] ml-[-20px]' />
                            <p className="text-gray-500 text-sm  mt-[42px]">{product.location?.address}</p>
                            <button
                                onClick={() => handleDetailsClick(product.id)}
                                className='text-gray-600 text-xs underline mt-[-50px] ml-[150px]'
                            >
                                Product details
                            </button>
                        </div>
                        <div className="px-4 pt-4 pb-2 flex justify-between items-center mt-[-20px]">
                            <button onClick={() => handleChatClick(product)} className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-1 px-4 rounded-full flex items-center">
                                <FaWhatsapp className="mr-2" /> Chat
                            </button>
                            <button onClick={() => handleCallClick(product)} className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-1 px-4 rounded-full flex items-center">
                                <IoCallOutline className="mr-2" /> Call
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductCard;
