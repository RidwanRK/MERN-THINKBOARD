import React from 'react'
import { Routes } from 'react-router'
import  Homepage from "./pages/Homepage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import NoteDetailPage from "./pages/NoteDetailPage.jsx";
import toast from 'react-hot-toast';
import { Route } from 'react-router'

const App = () => {
  return (
    <div data-theme="forest">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  )
}

export default App
