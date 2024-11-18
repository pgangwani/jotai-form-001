import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Layout } from './components/Layout';
import { BasicForm } from './components/BasicForm';
import { AdvancedForm } from './components/AdvancedForm';
import { Home } from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="basic" element={<BasicForm />} />
          <Route path="advanced" element={<AdvancedForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
