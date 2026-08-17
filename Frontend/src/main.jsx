import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import 'toastr/build/toastr.min.css'
import './index.css'
import App from './App.jsx'
import { CartProvider } from "./context/CartContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <CartProvider>
    <App />
  </CartProvider>
  </BrowserRouter>
);