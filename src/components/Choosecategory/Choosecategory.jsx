import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';

const ChooseCategory = () => {
  const { categoryId } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categoryId) {
      handleCategoryClick(categoryId);
    }
  }, [categoryId]);

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

  const fetchSubcategories = async (categoryId) => {
    try {
      const response = await fetch(`https://etafqna-api.onrender.com/api/v1/categories/${categoryId}/subcategories`);
      if (!response.ok) {
        throw new Error('Failed to fetch subcategories');
      }
      const { data } = await response.json();
      setSubcategories((prev) => ({ ...prev, [categoryId]: data }));
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    if (!subcategories[categoryId]) {
      fetchSubcategories(categoryId);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-7">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold mt-[5px]">Choose a category</h1>
      </header>
      <div className="flex max-w-7xl w-full">
        <div className="w-1/3 border-r">
          {categories.map(category => (
            <div
              key={category._id}
              className={`p-[10px] cursor-pointer flex justify-between items-center ${selectedCategory === category._id ? 'bg-gray-100' : ''}`}
              onClick={() => handleCategoryClick(category._id)}
            >
              {category.image && <img src={category.image.url} alt={category.name} className="w-8 h-8 mr-4" />}
              <div className="flex-1 text-gray-600">{category.name}</div>
              <IoIosArrowForward />
            </div>
          ))}
        </div>
        <div className="w-2/3 pl-2">
          {selectedCategory && subcategories[selectedCategory] && (
            <div>
              {subcategories[selectedCategory].map(subcategory => (
                <Link
                  key={subcategory._id}
                  to={`/post-ad/${selectedCategory}/${subcategory._id}`}
                  className="block p-[15px] border-b hover:bg-gray-100"
                >
                  {subcategory.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChooseCategory;
