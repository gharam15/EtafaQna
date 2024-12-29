import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { CiLocationOn } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import AddressSearch from "./AddressSearch";

function EditProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [showLocationSearch, setShowLocationSearch] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState("/default-photo.png");
  const [loading, setLoading] = useState(false);
  const [coordinates, setCoordinates] = useState([0, 0]); // Initialize coordinates

  const token = Cookies.get('Bearer');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://etafqna-api.onrender.com/api/v1/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = response.data.data.user;
        setName(user.name);
        setEmail(user.email);
        setNumber(user.phone);
        setBio(user.bio);
        setLocation(user.location.coordinates.length > 0 ? user.location.coordinates.join(", ") : "");
        setCoordinates(user.location.coordinates); // Set coordinates from user data
        setPhoto(user.image.url);
        setPhotoUrl(user.image.url);

      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, [token]);

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPhotoUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", number);
    formData.append("bio", bio);
    formData.append("location", location);
    formData.append("coordinates", coordinates.join(",")); // Send coordinates as string
    if (photo) {
      formData.append("image", photo);
    }

    try {
      const response = await axios.patch(
        "https://etafqna-api.onrender.com/api/v1/users/updateMe",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Profile updated successfully!");
      console.log("Profile updated successfully!", response.data);
    } catch (error) {
      toast.error("Failed to update profile.");
      console.error("Failed to update profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMapClick = (e) => {
    setCoordinates([e.latlng.lat, e.latlng.lng]);
    setShowLocationSearch(false); // Close location search if open
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 md:p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Edit Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row md:space-x-6">
            <div className="flex-grow space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
                />
              </div>
            </div>

            <div className="mt-4 md:mt-0">
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handlePhotoChange}
                id="upload-photo"
              />
              <label htmlFor="upload-photo" className="block cursor-pointer text-center">
                <img
                  src={photoUrl}
                  className="w-40 h-40 rounded-full mx-auto border border-gray-300"
                  alt="Profile"
                />
                <h2 className="mt-2 text-sm font-medium text-gray-700">Upload Photo</h2>
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Bio (optional)
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={5}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
          </div>

          <div>
            <label htmlFor="number" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="number"
              id="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowLocationSearch(!showLocationSearch)}
              className="flex items-center justify-between w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-600"
            >
              <CiLocationOn size={25} className="text-gray-600" />
              <span className="flex-grow text-left ml-3">{location || "Select Location"}</span>
              <IoIosArrowDown size={25} className="text-gray-600" />
            </button>
          </div>

          {showLocationSearch && (
            <div className="mt-4">
              <AddressSearch setLocation={setLocation} setShowLocationSearch={setShowLocationSearch} />
            </div>
          )}

          <div className="mt-4">
            <MapContainer
              center={coordinates}
              zoom={13}
              style={{ height: "400px", width: "100%" }}
              onClick={handleMapClick}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              <Marker position={coordinates}>
                <Popup>Your Location</Popup>
              </Marker>
            </MapContainer>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="py-3 px-6 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled={loading}
            >
              {loading ? <ReactLoading type="bubbles" color="#fff" height={20} width={20} /> : "Save Changes"}
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default EditProfile;
