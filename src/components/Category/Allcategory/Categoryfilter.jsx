import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

function Categoryfilter({ onCategorySelect, onSubcategorySelect }) {
    const [categories, setCategories] = useState([]);
    const [expandedCategory, setExpandedCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('https://etafqna-api.onrender.com/api/v1/categories/');
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const { data } = await response.json();

            const categoriesWithSubcategories = await Promise.all(data.map(async (category) => {
                const subcategoriesResponse = await fetch(`https://etafqna-api.onrender.com/api/v1/categories/${category._id}/subcategories`);
                if (!subcategoriesResponse.ok) {
                    throw new Error(`Failed to fetch subcategories for category ${category._id}`);
                }
                const { data: subcategories } = await subcategoriesResponse.json();
                category.subcategories = subcategories;
                return category;
            }));

            setCategories(categoriesWithSubcategories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleCategoryClick = (categoryId) => {
        setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
        onCategorySelect(categoryId);
    };

    return (
        <div className="w-[300px]">
             <span className="text-[22px] mt-[15px] ml-[-5px] absolute text-xl sm:text-4xl font-Poppins whitespace-pre-line text-center tracking-wide  border-orange-400 w-[180px]">Filter By</span>
            <div className=" -slate-700 rounded-br-lg mt-2 p-2">
           
                <span className="text-[22px] mt-[70px] ml-[30px] flex text-7xl sm:text-[25px] font-Poppins whitespace-pre-line text-center tracking-wide ">Categories</span>
            </div>
            {categories.map(category => (
                <div key={category._id} className="my-[20px] ml-[30px] pr-5  ">
                    <div
                        className="flex items-center p- hover:bg-gray-200 rounded cursor-pointer mt-[10px] "
                        onClick={() => handleCategoryClick(category._id)}
                    >
                        {category.image && <img src={category.image.url} alt={category.name} className="w-6 h-6 mr-2" />}
                        <span className="text-gray-800">{category.name}</span>
                    </div>
                    {expandedCategory === category._id && (
                        <div className="ml-8">
                            {category.subcategories && category.subcategories.map(subcategory => (
                                <div
                                    key={subcategory._id}
                                    className="flex items-center p-2 block hover:bg-gray-100 rounded cursor-pointer"
                                    onClick={() => onSubcategorySelect(subcategory._id)}
                                >
                                    {subcategory.image && <img src={subcategory.image.url} alt={subcategory.name} className="w-5 h-5 mr-2" />}
                                    <span className="text-gray-600">{subcategory.name}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
            
        </div>
    );
}

export default Categoryfilter;
