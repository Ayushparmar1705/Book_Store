import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const root = ReactDOM.createRoot(document.getElementById('root'));
const publishKey = loadStripe('pk_test_51RLM7sELedKMrQykEwa8tL7CMg0Ggl1EDL23gjszm8F6TZQ4hnzJd9bj4LJAl1OjRzzgpS5rof89XS9izOYuu8l5006DPMCwam')
root.render(
  <BrowserRouter>
    <Elements stripe={publishKey}>
      <App />
    </Elements>
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
