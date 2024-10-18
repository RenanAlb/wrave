import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './global.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cadastro from './pages/Cadastro';
import Home from './pages/Home';
import Hero from './pages/Hero';
import Login from './pages/Login';
import First from './pages/First';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<First/>}/>
        <Route path='/:nomeUser' element={<Home/>}/>
        <Route path='/cadastro' element={<Cadastro/>}/>
        <Route path='/:nomeUser/:containerId' element={<Hero/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
