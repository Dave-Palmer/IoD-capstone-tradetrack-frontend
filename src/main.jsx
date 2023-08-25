import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ProSidebarProvider } from "react-pro-sidebar";
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/userContext';
import axios from 'axios';

axios.defaults.baseURL = 'https://trade-track-server.onrender.com/';
// axios.defaults.baseURL = 'http://localhost:3000/';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProSidebarProvider>
          <App />
        </ProSidebarProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
