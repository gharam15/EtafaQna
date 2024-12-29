import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

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
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold mt-[5px]">List of category</h1>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 w-[1200px] px-4 h-[50px]">
        {categories.map(category => (
          <Link
            key={category._id}
            to={`/category/${category._id}`}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            {category.image && <img src={category.image.url} alt={category.name} className="w-10 h-9 mr-4" />}
            <div className="flex-1 text-gray-600">{category.name}</div>
            <IoIosArrowForward size={23} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
