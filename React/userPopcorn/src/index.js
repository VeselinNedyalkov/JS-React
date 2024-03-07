import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './AppV1';
// import StarRating from './StarRating';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <StarRating maxRating={10} /> */}
    <App />
  </React.StrictMode>
);

