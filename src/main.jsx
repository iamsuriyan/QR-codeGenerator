import React from 'react'
import ReactDOM from 'react-dom/client'
import QrCode from './generators/QrCode.jsx'
import "./CSS/qr.css";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QrCode/>
  </React.StrictMode>,
)
