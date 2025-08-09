import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import CreateForm from './pages/CreateForm/CreateForm';
import PreviewForm from './pages/PreviewForm/PreviewForm';
import MyForm from './pages/MyForm/MyForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/create" element={<CreateForm />} />
        <Route path="/preview" element={<PreviewForm />} />
        <Route path="/myforms" element={<MyForm />} />
      </Routes>
    </Router>
  );
}

export default App;
