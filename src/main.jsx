import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import NoiseBG from './components/NoiseBG.jsx'
import "./stylesheets/output.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NoiseBG/>
    <App />
  </React.StrictMode>,
)
