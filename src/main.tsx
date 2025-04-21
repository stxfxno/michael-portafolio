import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import MoreProjects from './components/MoreProjects.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/more-projects" element={<MoreProjects />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)