// Import the React library
import React from 'react';
// Import the ReactDOM library
import ReactDOM from 'react-dom/client';
// Import the App component from './App'
import App from './App';
// Import the Bootstrap CSS file
import 'bootstrap/dist/css/bootstrap.min.css';
// Import the BrowserRouter component from react-router-dom
import {BrowserRouter} from "react-router-dom"


// Create a root element using ReactDOM.createRoot and specify the DOM element with id 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
// Render the application component inside the root element
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
);


