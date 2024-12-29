import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import Flex from "../../designLayouts/Flex";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { paginationItems } from "../../Contants/Index";
import { IoIosArrowDown } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import Cookies from "universal-cookie";
import axios from "axios";
import userImg from "../../../Assests/user.png";
import { MdOutlineFavorite } from "react-icons/md";
import { SlUserFollow } from "react-icons/sl";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faUser as faUserIcon,
  faEnvelope,
  faSliders,
  faCircleQuestion,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../../utils/auth"; // Ensure the correct path
const Profile = () => {
  const [dropdownActive, setDropdownActive] = useState(false);

  const toggleDropdown = () => {
    setDropdownActive(!dropdownActive);
  };

  const handleClickOutside = (event) => {
    const profileDropdownBtn = document.querySelector('.profile-dropdown-btn');
    if (profileDropdownBtn && !profileDropdownBtn.contains(event.target)) {
      setDropdownActive(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="profile-dropdown relative">
      <div onClick={toggleDropdown} className="profile-dropdown-btn flex items-center cursor-pointer">
        <img src={userImg} alt="User" className="w-[40px] h-[40px] rounded-full" />
        <span className="ml-2 flex items-center">
          User
          <FontAwesomeIcon icon={faAngleDown} className="ml-2" />
        </span>
      </div>
      {dropdownActive && (
        <motion.ul
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute top-14 right-0 z-50 bg-white w-44 text-[#767676] p-4 rounded-lg shadow-lg"
        >
          <li className="profile-dropdown-list-item">
            <Link to="/Editprofilepage" className="flex items-center py-2">
              <FontAwesomeIcon icon={faUserIcon} className="mr-2" />
              Edit Profile
            </Link>
          </li>
           <li className="profile-dropdown-list-item">
            <Link to="/ MyProducts" className="flex items-center py-2">
              <MdOutlineProductionQuantityLimits className="mr-2" />
              My Products
            </Link>
          </li>
          <li className="profile-dropdown-list-item">
            <Link to="/Favourites" className="flex items-center py-2">
              <MdOutlineFavorite className="mr-2" />
              Favourites
            </Link>
          </li>
          <li className="profile-dropdown-list-item">
            <Link to="/Following" className="flex items-center py-2">
            <SlUserFollow className="mr-2" />
              Following
            </Link>
          </li>
          <li className="profile-dropdown-list-item">
            <Link to="/Settingspage" className="flex items-center py-2">
              <FontAwesomeIcon icon={faSliders} className="mr-2" />
              Settings
            </Link>
          </li>
          <hr />
          <li className="profile-dropdown-list-item flex items-center py-2 cursor-pointer" onClick={logout}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} className="mr-2" />
            Log out
          </li>
        </motion.ul>
      )}
    </div>
  );
};

const HeaderBottom = () => {
  const products = useSelector((state) => state.orebiReducer.products);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [me, setMe] = useState("");
  const navigate = useNavigate();
  const cookie = new Cookies();
  const token = cookie.get("Bearer", { path: "/" });

  useEffect(() => {
    if (searchQuery) {
      const filtered = paginationItems.filter((item) =>
        item.productName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (token) {
      axios
        .get("https://etafqna-api.onrender.com/api/v1/users/me", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((data) => setMe(data.data.data.user.name))
        .catch((error) => console.error("Error:", error));
    }
  }, [token]);

  return (
    <div className="w-full bg-[#F5F5F3] relative">
      <div className="max-w-container mx-auto">
        <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
          <div className="bg-[#ffffff] flex justify-center ml-[40px] py-3 px-[70px] w-[220px] border border-transparent text-sm font-medium rounded-full text-white hover:bg-orange-500">
            <button className="text-[#000] flex items-center ml-[10px] w-[80px]">
              <CiLocationOn size={25} className="absolute -m-[65px] text-black" />
              <p className="-ml-9 font-Roboto">Location</p>
              <IoIosArrowDown size={25} className="absolute ml-[100px]" />
            </button>
          </div>

          <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-full">
            <input
              className="flex-1 h-full w-[250px] outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
              type="text"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              placeholder="Search your products here"
            />
            <FaSearch className="w-5 h-5 text-orange-500" />
            {searchQuery && (
              <div
                className={`w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer`}
              >
                {filteredProducts.map((item) => (
                  <div
                    onClick={() => {
                      navigate(`/product/${item.productName.toLowerCase().split(" ").join("")}`, {
                        state: { item: item },
                      });
                      setSearchQuery("");
                    }}
                    key={item._id}
                    className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3"
                  >
                    <img className="w-24" src={item.img} alt="productImg" />
                    <div className="flex flex-col gap-1">
                      <p className="font-semibold text-lg">{item.productName}</p>
                      <p className="text-xs">{item.des}</p>
                      <p className="text-sm">
                        Price: <span className="text-primeColor font-semibold">${item.price}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
            <Profile />
            {token ? (
              <div>
                <Link to="/profile">
                  
                </Link>
              </div>
            ) : (
              <div className="bg-[#ffffff] text-1xl flex justify-center py-2 px-6 border text-lg border-transparent font-medium rounded-full text-white hover:bg-orange-500">
                <Link to="/login">
                  <button className="text-[#000] flex w-[120px]">
                    <p className="ml-[18px]">Login</p>
                  </button>
                </Link>
              </div>
            )}
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default HeaderBottom;
