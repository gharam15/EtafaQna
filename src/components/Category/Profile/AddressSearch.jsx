import React, { useState } from 'react';

const AddressSearch = ({ setLocation, setShowLocationSearch }) => {
  const [address, setAddress] = useState('');
  const [results, setResults] = useState([]);

  const findAddress = () => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=3&q=${address}`;
    fetch(url)
      .then(response => response.json())
      .then(data => setResults(data))
      .catch(err => console.log(err));
  };

  const handleAddressSelect = (location) => {
    setLocation(location);
    setShowLocationSearch(false);
  };

  return (
    <div className="bg-white p-4 border border-gray-300 py-5 rounded-lg mt-2 w-full">
      <input
        type="text"
        placeholder="Search for an address"
        value={address}
        onChange={e => setAddress(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
      />
      <button
        onClick={findAddress}
        className="bg-orange-600 text-white w-full py-2 rounded-lg mb-4"
      >
        Search
      </button>
      <div id="results">
        {results.length > 0 ? (
          results.map((element, index) => (
            <div
              key={index}
              onClick={() => handleAddressSelect(element.display_name)}
              className="cursor-pointer p-2 border-b border-gray-300 hover:bg-gray-100"
            >
              {element.display_name} <br /> Lat: {element.lat} Lng: {element.lon}
            </div>
          ))
        ) : (
          <p className="text-red-500">Not found</p>
        )}
      </div>
    </div>
  );
};

export default AddressSearch;
