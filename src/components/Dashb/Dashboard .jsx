import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState('categories');
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [itemName, setItemName] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [itemImage, setItemImage] = useState(null);
  const [password, setPassword] = useState('');

  const [counts, setCounts] = useState({
    categories: 0,
    subcategories: 0,
    products: 0,
    users: 0,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://etafqna-api.onrender.com/api/v1/categories/');
        setCategories(response.data.data);
        setCounts(prev => ({ ...prev, categories: response.data.data.length }));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        switch (activeComponent) {
          case 'categories':
            setData(categories);
            break;
          case 'subcategories':
            const subcategoriesResponse = await axios.get('https://etafqna-api.onrender.com/api/v1/subcategories');
            setData(subcategoriesResponse.data.data);
            setCounts(prev => ({ ...prev, subcategories: subcategoriesResponse.data.data.length }));
            break;
          case 'products':
            const productsResponse = await axios.get('https://etafqna-api.onrender.com/api/v1/products');
            setData(productsResponse.data.data);
            setCounts(prev => ({ ...prev, products: productsResponse.data.data.length }));
            break;
          case 'users':
            const usersResponse = await axios.get('https://etafqna-api.onrender.com/api/v1/users');
            setData(usersResponse.data.data);
            setCounts(prev => ({ ...prev, users: usersResponse.data.data.length }));
            break;
          default:
            break;
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [activeComponent, categories]);

  const handleDelete = async (id) => {
    if (password === 'correctPassword') {
      try {
        // Assuming you have an API endpoint to delete the item
        await axios.delete(`https://etafqna-api.onrender.com/api/v1/${activeComponent}/${id}`);
        setData(data.filter(item => item._id !== id));
        setIsDeleting(false);
        setPassword('');
        setItemToDelete(null);
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    } else {
      alert('Incorrect password');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        const updatedItem = {
          ...editingItem,
          name: itemName,
          category: itemCategory,
          image: itemImage ? URL.createObjectURL(itemImage) : editingItem.image,
        };
        await axios.put(`https://etafqna-api.onrender.com/api/v1/${activeComponent}/${editingItem._id}`, updatedItem);
        setData(data.map(item => (item._id === editingItem._id ? updatedItem : item)));
      } else {
        const newItem = {
          name: itemName,
          category: itemCategory,
          image: URL.createObjectURL(itemImage),
        };
        const response = await axios.post(`https://etafqna-api.onrender.com/api/v1/${activeComponent}`, newItem);
        setData([...data, response.data.data]);
      }
      resetForm();
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  const resetForm = () => {
    setItemName('');
    setItemCategory('');
    setItemImage(null);
    setEditingItem(null);
    setIsAdding(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-orange-500 text-white p-4">
        <nav>
          <ul className="space-y-2">
            <li
              className={`cursor-pointer p-2 rounded ${activeComponent === 'categories' ? 'bg-orange-400' : 'hover:bg-orange-400'}`}
              onClick={() => setActiveComponent('categories')}
            >
              Categories ({counts.categories})
            </li>
            <li
              className={`cursor-pointer p-2 rounded ${activeComponent === 'subcategories' ? 'bg-orange-400' : 'hover:bg-orange-400'}`}
              onClick={() => setActiveComponent('subcategories')}
            >
              Subcategories ({counts.subcategories})
            </li>
            <li
              className={`cursor-pointer p-2 rounded ${activeComponent === 'products' ? 'bg-orange-400' : 'hover:bg-orange-400'}`}
              onClick={() => setActiveComponent('products')}
            >
              Products ({counts.products})
            </li>
            <li
              className={`cursor-pointer p-2 rounded ${activeComponent === 'users' ? 'bg-orange-400' : 'hover:bg-orange-400'}`}
              onClick={() => setActiveComponent('users')}
            >
              Users ({counts.users})
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex-1 flex flex-col">
        <header className="bg-orange-500 shadow p-4">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        </header>
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold capitalize text-gray-700">{activeComponent}</h2>
            {(activeComponent === 'categories' || activeComponent === 'subcategories') && (
              <button
                className="bg-orange-500 text-white px-4 py-2 rounded shadow hover:bg-orange-600 transition"
                onClick={() => setIsAdding(true)}
              >
                Add New Item
              </button>
            )}
          </div>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="py-2 px-4 bg-gray-200 text-gray-800">ID</th>
                  <th className="py-2 px-4 bg-gray-200 text-gray-800">Name</th>
                  {activeComponent === 'categories' && <th className="py-2 px-4 bg-gray-200 text-gray-800">Image</th>}
                  {activeComponent === 'subcategories' && <th className="py-2 px-4 bg-gray-200 text-gray-800">Category</th>}
                  {activeComponent === 'subcategories' && <th className="py-2 px-4 bg-gray-200 text-gray-800">Image</th>}
                  {activeComponent === 'products' && <th className="py-2 px-4 bg-gray-200 text-gray-800">Category</th>}
                  {activeComponent === 'products' && <th className="py-2 px-4 bg-gray-200 text-gray-800">Subcategory</th>}
                  {activeComponent === 'products' && <th className="py-2 px-4 bg-gray-200 text-gray-800">Price</th>}
                  <th className="py-2 px-4 bg-gray-200 text-gray-800">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map(item => item && (
                  <tr key={item._id} className="border-t">
                    <td className="py-2 px-4">{item._id}</td>
                    <td className="py-2 px-4">{item.name}</td>
                    {activeComponent === 'categories' && (
                      <td className="py-2 px-4">
                        <img src={item.image.url} alt={item.name} className="w-16 h-16 object-cover" />
                      </td>
                    )}
                    {activeComponent === 'subcategories' && <td className="py-2 px-4">{item.category}</td>}
                    {activeComponent === 'subcategories' && (
                      <td className="py-2 px-4">
                        <img src={item.image.url} alt={item.name} className="w-16 h-16 object-cover" />
                      </td>
                    )}
                    {activeComponent === 'products' && <td className="py-2 px-4">{item.category}</td>}
                    {activeComponent === 'products' && <td className="py-2 px-4">{item.subcategory}</td>}
                    {activeComponent === 'products' && <td className="py-2 px-4">{item.price}</td>}
                    <td className="py-2 px-4 flex items-center">
                      {(activeComponent === 'categories' || activeComponent === 'subcategories') && (
                        <button
                          className="bg-gray-500 text-white px-2 py-1 rounded shadow hover:bg-gray-600 transition"
                          onClick={() => {
                            setEditingItem(item);
                            setItemName(item.name);
                            setItemCategory(item.category);
                            setItemImage(null);
                          }}
                        >
                          Edit
                        </button>
                      )}
                      {(activeComponent === 'categories' || activeComponent === 'subcategories' || activeComponent === 'products' || activeComponent === 'users') && (
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded shadow hover:bg-red-600 transition ml-2"
                          onClick={() => {
                            setItemToDelete(item);
                            setIsDeleting(true);
                          }}
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {(isAdding || editingItem) && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded shadow-md">
                <h2 className="text-lg font-bold mb-4">{editingItem ? 'Edit Item' : 'Add New Item'}</h2>
                <form onSubmit={handleSave}>
                  <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                    />
                  </div>
                  {activeComponent !== 'categories' && (
                    <div className="mb-4">
                      <label className="block text-gray-700">Category</label>
                      <select
                        className="w-full p-2 border rounded"
                        value={itemCategory}
                        onChange={(e) => setItemCategory(e.target.value)}
                      >
                        {categories.map(category => (
                          <option key={category._id} value={category.name}>{category.name}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className="mb-4">
                    <label className="block text-gray-700">Image</label>
                    <input
                      type="file"
                      className="w-full p-2 border rounded"
                      onChange={(e) => setItemImage(e.target.files[0])}
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                      onClick={resetForm}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-orange-500 text-white px-4 py-2 rounded"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {isDeleting && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded shadow-md">
                <h2 className="text-lg font-bold mb-4">Delete Confirmation</h2>
                <p>Are you sure you want to delete this item?</p>
                <div className="mb-4">
                  <label className="block text-gray-700">Password</label>
                  <input
                    type="password"
                    className="w-full p-2 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => {
                      setIsDeleting(false);
                      setPassword('');
                      setItemToDelete(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDelete(itemToDelete._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
