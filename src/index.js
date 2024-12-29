import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserProvider from './components/context/context';

import { Provider } from "react-redux";
import { store, persistor } from "./components/redux/store";



import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <UserProvider>

    <App />
    </UserProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
