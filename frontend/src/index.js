import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store'; // Import the Redux store
import './index.css'; // Import global CSS styles
import './bootstrap.min.css'; // Import Bootstrap CSS
import App from './App'; // Import the root component
import reportWebVitals from './reportWebVitals'; // Import for performance measuring

// Render the application to the DOM
ReactDOM.render(
  <Provider store={store}> {/* Wrap App with Provider to connect Redux store */}
    <App /> {/* Render the root component */}
  </Provider>,
  document.getElementById('root') // Render into the HTML element with ID 'root'
);

// Measure performance
reportWebVitals(); // Call reportWebVitals to measure and report performance
