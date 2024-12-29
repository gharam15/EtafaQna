import React, { useState, useEffect } from 'react';
import Categoryfilter from '../components/Category/Allcategory/Categoryfilter';
import Pricefilter from '../components/Category/Allcategory/Pricefilter';
import { FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import { IoCallOutline } from 'react-icons/io5';
import { MdFavorite } from 'react-icons/md';
import { IoMdShare } from 'react-icons/io';
function MainPage() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 100000]);

    useEffect(() => {
        if (selectedSubcategory) {
            fetchProductsBySubcategory(selectedSubcategory, priceRange);
        } else if (selectedCategory) {
            fetchProductsByCategory(selectedCategory, priceRange);
        } else {
            fetchProductsByPriceRange(priceRange);
        }
    }, [selectedCategory, selectedSubcategory, priceRange]);

    const fetchProductsByCategory = async (categoryId, priceRange) => {
        try {
            const response = await fetch(`https://etafqna-api.onrender.com/api/v1/categories/${categoryId}/products`);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const { data } = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchProductsBySubcategory = async (subcategoryId, priceRange) => {
        try {
            const response = await fetch(`https://etafqna-api.onrender.com/api/v1/subcategories/${subcategoryId}/products`);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const { data } = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchProductsByPriceRange = async (priceRange) => {
        try {
            const response = await fetch(`https://etafqna-api.onrender.com/api/v1/products?price[gte]=${priceRange[0]}&price[lte]=${priceRange[1]}`);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const { data } = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    return (
        <div className="flex flex-col h-[1500px] w-3/4  bg-white">
            <div className="flex flex-row">
                <div className="w-1/4">
                    <Categoryfilter onCategorySelect={setSelectedCategory} onSubcategorySelect={setSelectedSubcategory} />
                    <Pricefilter onPriceChange={setPriceRange} />
                </div>
                <div className="w-[25000px]  scroll-smooth ml-[83px]">
                    {products.length > 0 ? (
                        products.map(product => (
                            <div key={product._id} className=" scroll-smooth focus:scroll-auto flex flex-col  md:flex-row md:space-x-8 space-y-3 w-[40000px] md:space-y-0 rounded-xl p-3  md:max-w-[1100px] mx-auto border-2 bg-white my-4">
                                <div className=" ml-8  bg-white grid place-items-center">
                                    <img src={product.imageCover?.url} alt={product.name} className="rounded-xl w-[360px] h-[260px] ml-[-50px] object-cover" />
                                </div>
                                <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
                                    <div className="flex justify-between items-center">
                                        <p className="text-gray-500 font-medium hidden md:block"> category name:{product.category?.name}</p>
                                        <div className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <p className="text-gray-600 font-bold text-sm ml-1">
                                                {product.ratingsAverage}
                                                <span className="text-gray-500 font-normal">({product.ratingsQuantity} reviews)</span>
                                            </p>
                                        </div>
                                        <div className="">
                                            <MdFavorite className="mr-2 text-orange-400 text-[25px] ml-[250px] mt-[-10px]" />
                                            <IoMdShare className="mr-2 text-orange-400 text-[25px] absolute mt-[-25px] ml-[290px]" />
                                        </div>
                                        <div className=" px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">
                                            {product.isSuperhost && 'Superhost'}
                                        </div>
                                    </div>
                                    <h3 className="font-black text-gray-800 md:text-3xl text-xl">{product.name}</h3>
                                    <p className="md:text-lg text-gray-500 text-base">{product.description}</p>
                                    <p className="text-gray-700 text-base">posted by {product.owner.name}</p>
                                    <p className="text-[17px] font-black text-gray-800 ml-2">
                                        {product.price} L.E
                                        <span className="text-orange-500 mr-1">
                                        <FaMapMarkerAlt className="mt-[3px] ml-[-3px] text-[15px]" />
                                    </span>
                                    <p className=" text-gray-500 mt-[-43px] ml-[15px] text-[15px] font-normal ">{product.location?.address}</p>
                                        <div className="flex justify-between mt-4">
                                            <button

                                                className="bg-orange-400 w-[120px] ml-[370px] mt-[-80px] absolute hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-full flex items-center"
                                            >
                                                <FaWhatsapp className="mr-2" /> Chat
                                            </button>
                                            <button

                                                className="bg-orange-400 w-[120px] hover:bg-orange-500 ml-[520px] mt-[-80px]  absolute text-white font-bold py-2 px-4 rounded-full flex items-center"
                                            >
                                                <IoCallOutline className="mr-2" /> Call
                                            </button>
                                        </div>
                                        
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No products found</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MainPage;
