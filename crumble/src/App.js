import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Crumble from './Crumble';
import ShareView from './ShareView.js';
import ReactDOM from "react-dom/client";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index exact element={<Crumble/>} />
        <Route path="/:uuid" element={<ShareView/>} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);