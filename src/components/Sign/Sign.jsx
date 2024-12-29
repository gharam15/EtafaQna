import React, { useContext, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import Modal from "react-modal";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { User } from "../context/context";
import logo from '../../Assests/logo.png'
import facebook from '../../Assests/facebook.png';
import twiter from '../../Assests/twitter.png';
import google from '../../Assests/google.png';
import styles from "../../styles/Styles";
import { IoLocate } from "react-icons/io5";

// Create a custom icon for the marker
const customIcon = new Icon({
  iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-orange.png',
  iconSize: [38, 38]
});

Modal.setAppElement("#root"); // For accessibility

function Sign() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [confirm, setConfirm] = useState("");
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [address, setAddress] = useState("");
  const cookie = new Cookies();
  const user = useContext(User);
  const [visible, setVisible] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  async function submit(e) {
    e.preventDefault();
    try {
      let res = await axios.post("https://etafqna-api.onrender.com/api/v1/auth/signup", {
        name: name,
        email: email,
        password: password,
        passwordConfirm: confirm,
        phone: number,
        location: {
          coordinates: coordinates,
          address: address
        }
      });
      const token = res.data.token;
      cookie.set("Bearer", token, { path: "/" });
      const userDetails = res.data.data.user;
      user.setAuth({ token, userDetails });
      window.location.href = "/";
    } catch (err) {
      if (err.response && err.response.status === 500) {
        console.log("Internal Server Error. Please try again later.");
      } else {
        console.log("Error:", err.message);
      }
    }
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setCoordinates([lat, lng]);
         // Update address with coordinates
          setModalIsOpen(true); // Open the modal to show the map
        },
        (error) => {
          console.error("Error obtaining location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="w-full h-screen flex items-start mt-[-40px]">
      <div className="relative w-1/2 h-[1400px] flex flex-col mt-[-150px] bg-gray-200">
        <div className="my-auto text-center flex flex-col ml-[-50px] mt-[-50px]">
          <img className="logo-image flex p-0 my-3 ml-[-20px] " src={logo} alt="logo" />
          <p className="text-center text-2xl font-bold ml-[-57px] text-gray-900 my-3">
            Your Best Gate To <br /> Buy, Sell, Donate & Exchange <br /> Whatever You Need
          </p>
        </div>
      </div>
      <div className="w-1/2 h-full flex flex-col mt-[-10px]">
        <div className="flex flex-col sm:px-20">
          <h5 className="my-16 text-center text-3xl font-extrabold text-gray-900">Sign Up</h5>
          <form onSubmit={submit} className="space-y-7 flex flex-col w-full">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Enter Your Name..."
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Enter Your Email Address..."
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="number"
                autoComplete="tel"
                placeholder="Enter Your Phone Number..."
                required
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  placeholder="Enter Your Password..."
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>

            <div>
              <label htmlFor="confirm" className="block text-sm font-medium text-gray-700">
                Password Confirmation
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="confirm"
                  placeholder="Confirm Your Password..."
                  autoComplete="current-password"
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="remember-me"
                id="remember-me"
                className="h-4 w-4 text-orange-500 focus:ring-blue-orange border-gray-300 rounded-lg"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                name="address"
                placeholder="Governorate/city/street.."
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              />
            </div>
            <div>
              <button
                type="button"
                onClick={getCurrentLocation}
                className=" bg-orange-500 text-white px-2 py-2 rounded-lg ml-[400px] mt-[10px] w-[0px]]"
              >
               <p className="ml-[19px] w-[165px] h-[20px]"> set current location</p>
                < IoLocate className="mt-[-20px] ml-[-5px] text-[25px]"/>
              </button>
            </div>
            <div>
              <label htmlFor="coordinates" className="block text-sm font-medium text-gray-700 mt-[-30px]">
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

          

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Sign Up
              </button>
            </div>
            <div>
             
              <p className="my-3 block text-center text-gray-400"> By clicking Signup or Login<br />Iagree to <span className="text-orange-500">ETFA2NA'S</span> terms of service and privacy policy </p>
              <p className="my-1 block text-center  text-gray-400">  ____________________OR ____________________</p>
            </div>
            <div className={`${styles.noramlFlex} w-full  `}>
              <h4 className=" my-2 block text-center" >Don't have any account?</h4>
              <Link to="/Sign" className="text-orange-500 pl-2">
              Sign Up
              </Link>
            </div>
 
            <div>
              <ul className="social-media-icon">
                <li><img src={google} alt="face book" /></li>
                <li><img src={facebook} alt="face book" /></li>
                <li><img src={twiter} alt="face book" /></li>
              </ul>
            </div>
           
        
          </form>
        </div>
      </div>

      {/* Modal to show the map */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Map Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div className="map-container">
          <MapContainer center={coordinates} zoom={13} scrollWheelZoom={false} style={{ height: "400px", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={coordinates} icon={customIcon}>
              <Popup>
                Your Location
              </Popup>
            </Marker>
          </MapContainer>
        </div>
        <button onClick={() => setModalIsOpen(false)} className="mt-4 bg-orange-400 text-white px-4 py-2 rounded-lg">Close</button>
      </Modal>
    </div>
  );
}

export default Sign;
