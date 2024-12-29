import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { MdSell } from "react-icons/md";
import { TbCameraPlus } from "react-icons/tb";
import { AnimatePresence, motion } from "framer-motion";
import { PiHandshakeLight } from "react-icons/pi";
import { FaRegHandshake } from "react-icons/fa";
import { IoLocate } from "react-icons/io5";
const PostAdForm = () => {
  const { categoryId, subcategoryId } = useParams();
  const [adTitle, setAdTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [category, setCategory] = useState(null);
  const [subcategory, setSubcategory] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [images, setImages] = useState(new Array(10).fill(null));
  const [selectedLocation, setSelectedLocation] = useState('');
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(categoryId || '');
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(subcategoryId || '');
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
    fetchLocations();
  }, []);

  useEffect(() => {
    if (categoryId) {
      fetchCategory(categoryId);
    }
  }, [categoryId]);

  useEffect(() => {
    if (subcategoryId) {
      fetchSubcategory(subcategoryId);
    }
  }, [subcategoryId]);


  const fetchCategories = async () => {
    try {
      const response = await fetch('https://etafqna-api.onrender.com/api/v1/categories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await fetch('https://etafqna-api.onrender.com/api/v1/subcategories');
      if (!response.ok) {
        throw new Error('Failed to fetch subcategories');
      }
      const data = await response.json();
      setSubcategories(data.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const fetchCategory = async (categoryId) => {
    try {
      const response = await fetch(`https://etafqna-api.onrender.com/api/v1/categories/${categoryId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch category');
      }
      const { data } = await response.json();
      setCategory(data);
    } catch (error) {
      console.error('Error fetching category:', error);
    }
  };

  const fetchSubcategory = async (subcategoryId) => {
    try {
      const response = await fetch(`https://etafqna-api.onrender.com/api/v1/subcategories/${subcategoryId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch subcategory');
      }
      const { data } = await response.json();
      setSubcategory(data);
    } catch (error) {
      console.error('Error fetching subcategory:', error);
    }
  };
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setCoordinates([lat, lng]);
         // Update address with coordinates
           // Open the modal to show the map
        },
        (error) => {
          console.error("Error obtaining location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  const fetchLocations = async () => {
    const egyptGovernorates = [
      'Cairo,Nasr City',
      'Alexandria,Sidi Gabe',
      'Giza,6th of October',
      'Dakahlia,Mansoura',
      'Red Sea,Hurghada',
      'Beheira,Damanhour',
      'Fayoum,Fayoum City',
      'Gharbia,Tanta',
      'Ismailia,Fayed',
      'Menofian,Shebeen El Kom',
      'Minya,Mallawi',
      'Qaliubiya,Banha',
      'New Valley,Kharga',
      'Suez,Ain Sokhna',
      'Aswan,Kom Ombo',
      'Assiut,Abnoub',
      'Beni Suef,Beba',
      'Port Said,Port Fuad',
      'Damietta,Ras El Bar',
      'Sharkia,Zagazig',
      'South Sinai,Sharm El Sheikh',
      'Kafr Al sheikh,Desouk',
      'Matrouh',
      'Luxor',
      'Qena',
      'North Sinai',
      'Sohag',
    ];
    const mockLocations = egyptGovernorates.map((governorate, index) => ({
      address: governorate,
      coordinates: [31.0 + index, 30.0 + index],
    }));
    setLocations(mockLocations);
  };
  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = file;
      return newImages;
    });
  };

  const removeImage = (index) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = null;
      return newImages;
    });
  };
  const handlePaymentOptionChange = (option) => {
    if (paymentOptions.includes(option)) {
      setPaymentOptions(paymentOptions.filter((opt) => opt !== option));
    } else {
      setPaymentOptions([...paymentOptions, option]);
    }
  };
  const validateForm = () => {
    const newErrors = {};
    if (adTitle.length < 2 || adTitle.length > 32) {
      newErrors.adTitle = 'Title must be between 2 and 32 characters.';
    }
    if (!description || description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters long.';
    }
    if (!coverImage) {
      newErrors.coverImage = 'Cover image is required.';
    }
    if (!selectedCategoryId) {
      newErrors.category = 'Category is required.';
    }
    if (!selectedSubcategoryId) {
      newErrors.subcategory = 'Subcategory is required.';
    }
    if (!selectedLocation) {
      newErrors.location = 'Location is required.';
    }
    if (paymentOptions!== 'Donate' && !price) {
      newErrors.price = 'Price is required.';
    }
   
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const selectedLocationData = locations.find(location => location.address === selectedLocation);

    const formData = new FormData();
    formData.append('name', adTitle);
    formData.append('description', description);
    formData.append('imageCover', coverImage);
    images.forEach((image, index) => {
      if (image) formData.append('images', image);
    });
    formData.append('category', selectedCategoryId);
    formData.append('subcategories', selectedSubcategoryId);
    formData.append('price', price);
    formData.append('exchange', paymentOptions === 'Exchange');
    formData.append('donate', paymentOptions === 'Donate');
    formData.append('location[address]', selectedLocationData.address);
    formData.append('location[coordinates][]', selectedLocationData.coordinates[0] || '');
    formData.append('location[coordinates][]', selectedLocationData.coordinates[1] || '');

    // Log FormData contents
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    const cookies = new Cookies();
    const token = cookies.get('Bearer');

    if (!token) {
      console.error('No token found. Please log in again.');
      return;
    }

    try {
      const response = await fetch('https://etafqna-api.onrender.com/api/v1/products', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to submit ad: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Ad submitted successfully:', data);
      setIsModalOpen(true); // Open modal on successful form submission
      // Handle successful form submission
    } catch (error) {
      console.error('Error submitting ad:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white">
      <div className="text-center">
        <h2 className="text-4xl font mb-6">Release</h2>
        <MdSell className="text-3xl font-bold ml-[820px] mt-[-45px] flex text-orange-500" />
        <p className="text-base mb-4">Share your item with the world</p>
      </div>

      <div className="mb-4">
        <label className="mb-2 text-4xl sm:text-xl font-BG whitespace-pre-line text-center tracking-tighter">Ad Title</label>
        <input
          type="text"
          value={adTitle}
          onChange={(e) => setAdTitle(e.target.value)}
          className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.adTitle && <p className="text-red-500 text-xs italic">{errors.adTitle}</p>}
      </div>

      <div className="mb-4">
        <label className="mb-2 text-4xl sm:text-xl font-BG whitespace-pre-line text-center tracking-tighter">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows="5"
        />
        {errors.description && <p className="text-orange-500 text-xs italic">{errors.description}</p>}
      </div>

      <div className="mb-4">
          <label className="mb-10 text-4xl sm:text-xl font-BG whitespace-pre-line text-center tracking-tighter">Cover Image</label>
          <div className="relative border-separate w-[600px] h-[200px] ml-[10px] border-2 border-gray-200 rounded-lg p-4 flex justify-center items-center">
            <input
              type="file"
              onChange={handleCoverImageChange}
              className="absolute inset-0 w-full h-full opacity-0"
            />
            {coverImage ? (
              <img src={URL.createObjectURL(coverImage)} alt="Cover" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <TbCameraPlus className="text-4xl text-gray-400" />
            )}
          </div>
          {coverImage && (
            <button
              type="button"
              onClick={() => setCoverImage(null)}
              className="mt-2 bg-orange-500 text-white rounded-full p-1"
            >
              &times;
            </button>
          )}
          {errors.coverImage && <p className="text-orange-500 text-xs italic">{errors.coverImage}</p>}
        </div>

        <div className="mb-4">
          <label className="mb-2 text-4xl sm:text-xl font-BG whitespace-pre-line text-center tracking-tighter">Additional Images</label>
          <div className="grid grid-cols-5 gap-3">
            {images.map((image, index) => (
              <div key={index} className="relative border-collapse border-2 h-[100px] w-[150px] ml-[10px] border-gray-200 rounded-lg p-4 flex justify-center items-center">
                <input
                  type="file"
                  onChange={(e) => handleImageChange(e, index)}
                  className="absolute inset-0 w-full h-full opacity-0"
                />
                {image ? (
                  <img src={URL.createObjectURL(image)} alt={`Upload ${index}`} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <TbCameraPlus className="text-4xl text-gray-400 h-[20px] w-[30px]" />
                )}
                {image && (
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 p-1 bg-orange-500 text-white rounded-full"
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

      <div className="mb-4">
        <label className="mb-2 text-4xl sm:text-xl font-BG whitespace-pre-line text-center tracking-tighter">Category</label>
        <select
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
          className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>{category.name}</option>
          ))}
        </select>
        {errors.category && <p className="text-orange-500 text-xs italic">{errors.category}</p>}
      </div>

      <div className="mb-4">
        <label className="mb-2 text-4xl sm:text-xl font-BG whitespace-pre-line text-center tracking-tighter">Subcategory</label>
        <select
          value={selectedSubcategoryId}
          onChange={(e) => setSelectedSubcategoryId(e.target.value)}
          className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select Subcategory</option>
          {subcategories.map((subcategory) => (
            <option key={subcategory._id} value={subcategory._id}>{subcategory.name}</option>
          ))}
        </select>
        {errors.subcategory && <p className="text-orange-500 text-xs italic">{errors.subcategory}</p>}
      </div>

      
      <div className="mb-4">
        <label className="mb-2 text-4xl sm:text-xl font-BG whitespace-pre-line text-center tracking-tighter">Payment Option</label>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="cash"
            checked={paymentOptions.includes('Cash')}
            onChange={() => handlePaymentOptionChange('Cash')}
            className="mr-2"
          />
          <label htmlFor="cash" className="mr-4">Cash</label>

          <input
            type="checkbox"
            id="exchange"
            checked={paymentOptions.includes('Exchange')}
            onChange={() => handlePaymentOptionChange('Exchange')}
            className="mr-2"
          />
          <label htmlFor="exchange" className="mr-4">Exchange</label>

          <input
            type="checkbox"
            id="donate"
            checked={paymentOptions.includes('Donate')}
            onChange={() => handlePaymentOptionChange('Donate')}
            className="mr-2"
          />
          <label htmlFor="donate" className="mr-4">Donate</label>
        </div>
      </div>
      {!paymentOptions.includes('Donate') && (
        <div className="mb-4">
          <label className="mb-2 text-4xl sm:text-xl font-BG whitespace-pre-line text-center tracking-tighter">Price</label>
          <div className="flex items-center">
            <div className="flex items-center border border-gray-300 rounded-l px-3 py-2">
              EGP
            </div>
            <input
              type="number"
              value={price}
              placeholder='Enter the price in Egyptian pounds "L.E"'
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border-t border-b border-r rounded-r py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {errors.price && <p className="text-orange-500 text-xs italic">{errors.price}</p>}
        </div>
      )}
      <div className="mb-4">
        <label className="mb-2 text-4xl sm:text-xl font-BG whitespace-pre-line text-center tracking-tighter">Location</label>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="w-full border rounded py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select Location</option>
          {locations.map((location) => (
            <option key={location.address} value={location.address}>{location.address}</option>
          ))}
        </select>
        {errors.location && <p className="text-orange-500 text-xs italic">{errors.location}</p>}
      </div>
      <div>
              <button
                type="button"
                onClick={getCurrentLocation}
                className=" bg-orange-400 text-white px-2 py-2 rounded-lg ml-[1270px] mt-[-10px] w-[20px]]"
              >
               <p className="ml-[19px] w-[165px] h-[20px]"> set current location</p>
                < IoLocate className="mt-[-20px] ml-[-5px] text-[25px]"/>
              </button>
            </div>
            <div>
              <label htmlFor="coordinates" className="block text-sm font-medium text-gray-700 mt-[-0px]">
                Coordinates
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  name="coordinates"
                  placeholder="Latitude"
                  value={coordinates[0]}
                  onChange={(e) => setCoordinates([e.target.value, coordinates[1]])}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                />
                <input
                  type="text"
                  name="coordinates"
                  placeholder="Longitude"
                  value={coordinates[1]}
                  onChange={(e) => setCoordinates([coordinates[0], e.target.value])}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                />
              </div>
            </div>
      <div className="text-center mt-8">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 px-5 ml-[1300px] rounded focus:outline-none focus:shadow-outline"
        >
          Release
        </button>
      </div>

      {isModalOpen && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="bg-white p-8 rounded-lg"
            >
              <h2 className="text-xl font-bold mb-4">Success! <FaRegHandshake className='text-orange-400 ml-[130px] mt-[20px] text-[50px]'/> </h2>
              <p className="text-gray-700 mb-4">Your ad has been submitted successfully.</p>
              <Link to='/'>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="bg-orange-400 ml-[50px] hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Go to show your post
              </button>
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default PostAdForm;
