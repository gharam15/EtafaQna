import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaMapMarkerAlt, FaWhatsapp, FaChevronRight } from 'react-icons/fa';
import { FiChevronRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { MdFavorite } from 'react-icons/md';
import { IoMdShare, IoMdCall } from 'react-icons/io';
import { TbPointFilled } from 'react-icons/tb';
import Modal from 'react-modal';
import ownerimage from '../../Assests/ownerimage.jpg';

// BarLoader Component
const BarLoader = () => {
  const variants = {
    initial: {
      scaleY: 0.5,
      opacity: 0,
    },
    animate: {
      scaleY: 1,
      opacity: 1,
      transition: {
        repeat: Infinity,
        repeatType: 'mirror',
        duration: 1,
        ease: 'circIn',
      },
    },
  };

  return (
    <motion.div
      transition={{
        staggerChildren: 0.25,
      }}
      initial="initial"
      animate="animate"
      className="flex gap-1"
    >
      {[...Array(12)].map((_, index) => (
        <motion.div key={index} variants={variants} className="h-12 w-2 bg-orange-500" />
      ))}
    </motion.div>
  );
};

// ProductDetails Component
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedItems, setRelatedItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://etafqna-api.onrender.com/api/v1/products/${id}`);
        const productData = await response.json();
        if (productData.data) {
          setProduct(productData.data);

          // Fetch related items based on the product's category
          if (productData.data.category) {
            const relatedResponse = await fetch(`https://etafqna-api.onrender.com/api/v1/categories/${productData.data.category}/products`);
            const relatedData = await relatedResponse.json();
            console.log(relatedData);
            if (relatedData.data) {
              setRelatedItems(relatedData.data);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  // If product data is not yet fetched, display loader
  if (!product) {
    return (
      <div className="grid place-content-center px-4 py-24 mt-[200px]">
        <BarLoader />
      </div>
    );
  }

  // Function to format date (optional)
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle chat click
  const handleChatClick = (product) => {
    console.log('Chat button clicked for product:', product.name);
    // Add your chat handling logic here
  };

  // Handle call click
  const handleCallClick = (product) => {
    console.log('Call button clicked for product:', product.name);
    // Add your call handling logic here
  };

  return (
    <div className="container mx-auto px-4 flex mt-[50px]">
      <div className="relative w-[750px] h-[750px] flex flex-col ml-9">
        <div className="bg-white rounded-lg overflow-hidden mb-4 h-[750px]">
          <div className="relative">
            {product.imageCover && product.imageCover.url ? (
              <img
                className="w-full h-[450px] object-cover"
                src={product.imageCover.url}
                alt={product.name}
              />
            ) : (
              <div className="w-full h-64 flex items-center justify-center">
                <span>No image available</span>
              </div>
            )}
            <div className="absolute top-0 left-0 bg-orange-400 text-white px-2 py-1">1/10</div>
            <div className="absolute top-0 right-0 bg-orange-400 text-white px-2 py-1">SALE</div>
          </div>
          <div className="p-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-green-600 text-lg sm:text-xl font-BG whitespace-pre-line ml-5 text-center tracking-tighter">
              {product.price} L.E <br /> <span className="text-gray-600 text-base ml-[-10px]">Negotiable</span>
            </p>
          </div>
          <div className="px-6">
            <p className="text-gray-700 text-base">{product.description}</p>
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center">
                <span className="text-orange-500 mr-1">
                  <FaMapMarkerAlt className="mt-[45px]" />
                </span>
                <p className="text-gray-700 text-base mt-5">
                  <span className="absolute mt-[-40px] ml-[-15px]">Product owner location</span>
                  {product.location?.address}
                </p>
                <p className="text-gray-700 text-base ml-[500px]">{formatDate(product.createdAt)}</p>
              </div>
            </div>
            <button
              className="bg-orange-400 text-xl text-white absolute rounded-full w-[200px] h-[40px] ml-[1000px] mt-[-290px]"
              onClick={() => setIsModalOpen(true)}
            >
              Show 3D Product
            </button>
          </div>
        </div>

        <div className="w-1/2 flex-col grid grid-flow-row-dense grid-cols rounded-lg p-6 mt-[-640px] ml-[750px]">
          <MdFavorite className="absolute ml-[600px] mt-[-160px] text-orange-400 text-[24px]" />
          <IoMdShare className="absolute ml-[630px] mt-[-160px] text-orange-400 text-[24px]" />
          <div className="ml-[180px] mt-[-170px]">
            <h3 className="text-base font-bold">{product.owner.name}</h3>
            <p className="text-gray-600 text-sm">Member since: Mar 2024</p>
            <a href={`/profile/${product.owner.id}`} className="text-orange-500 flex items-center">
              See Profile <FiChevronRight className="ml-1" />
            </a>
          </div>
          <div>
            <div className="px-4 pt-4 pb-2 ml-[55px] flex justify-between items-center">
              <button
                onClick={() => handleChatClick(product)}
                className="bg-orange-400 ml-[105px] mt-[-195px] hover:bg-orange-500 text-white font-bold py-1 px-[30px] rounded-full flex items-center"
              >
                <FaWhatsapp className="mr-2" /> Chat
              </button>
              <button
                onClick={() => handleCallClick(product)}
                className="bg-orange-400 ml-[19px] mt-[-195px] hover:bg-orange-500 text-white font-bold py-1 px-[30px] rounded-full flex items-center"
              >
                <IoMdCall className="mr-2" /> Call
              </button>
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4 ml-[950px] mt-[-100px] w-[350px]">Your safety matters to us!</h2>
        <ul className="list-disc list-inside ml-[970px] mt-[-10px] w-[350px] text-slate-500">
          <li>Only meet in public / crowded places for example metro stations and malls.</li>
          <li>Never go alone to meet a buyer / seller, always take someone with you.</li>
          <li>Check and inspect the product properly before purchasing it.</li>
          <li>Never pay anything in advance or transfer money before inspecting the product.</li>
        </ul>
      </div>
      <div className="items-center mb-4 ml-[220px] mt-[140px]">
        <TbPointFilled className="list-disc list-inside ml-[-30px] mt-[30px] text-slate-500" />
        <TbPointFilled className="list-disc list-inside ml-[-30px] mt-[30px] text-slate-500" />
        <TbPointFilled className="list-disc list-inside ml-[-30px] mt-[30px] text-slate-500" />
        <TbPointFilled className="list-disc list-inside ml-[-30px] mt-[30px] text-slate-500" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedItems.map((relatedItem) => (
          <div key={relatedItem.id} className="bg-white rounded-lg overflow-hidden">
            {relatedItem.imageCover && relatedItem.imageCover.url ? (
              <img
                className="w-full h-48 object-cover"
                src={relatedItem.imageCover.url}
                alt={relatedItem.name}
              />
            ) : (
              <div className="w-full h-48 flex items-center justify-center">
                <span>No image available</span>
              </div>
            )}
            <div className="p-4">
              <h3 className="text-lg font-bold">{relatedItem.name}</h3>
              <p className="text-gray-600 text-sm">{relatedItem.description}</p>
              <p className="text-orange-500 text-xl font-bold mt-2">{relatedItem.price} L.E</p>
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="3D Product Modal"
        className='w-[850px] ml-[460px] mt-[170px]'
      >
        <h2 className=' absolute ml-[240px] font-bold'>3D Product View</h2>
        <button className='bg-orange-400 rounded-full w-5 text-slate-950' onClick={() => setIsModalOpen(false)}>X</button>
        <div className="sketchfab-embed-wrapper">
          <iframe
          className='w-[600px] h-[390px]'
            title="Air Jordan 1"
            frameBorder="0"
            allowFullScreen
            mozallowfullscreen="true"
            webkitallowfullscreen="true"
            allow="autoplay; fullscreen; xr-spatial-tracking"
            xr-spatial-tracking
            execution-while-out-of-viewport
            execution-while-not-rendered
            web-share
            src="https://sketchfab.com/models/a4b434181fbb48008ad460722fd53725/embed"
          >
          </iframe>
          <p style={{ fontSize: '13px', fontWeight: 'normal', margin: '8px', color: '#4A4A4A', width:'250px'}}>
            <a href="https://sketchfab.com/3d-models/air-jordan-1-a4b434181fbb48008ad460722fd53725?utm_medium=embed&utm_campaign=share-popup&utm_content=a4b434181fbb48008ad460722fd53725"
               target="_blank"
               rel="nofollow"
               style={{ fontWeight: 'bold', color: '#1CAAD9', width:'250px' }}>
            
            </a>
           
            <a href="https://sketchfab.com/lu87813?utm_medium=embed&utm_campaign=share-popup&utm_content=a4b434181fbb48008ad460722fd53725"
               target="_blank"
               rel="nofollow"
               style={{ fontWeight: 'bold', color: '#1CAAD9', width:'550px' }}>
              
            </a>
            
            <a href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=a4b434181fbb48008ad460722fd53725"
               target="_blank"
               rel="nofollow"
               style={{ fontWeight: 'bold', color: '#1CAAD9' }}>
            
            </a>
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default ProductDetails;
