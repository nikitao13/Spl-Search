import { useState, useEffect } from 'react'
import './App.css'
import 'terminal.css'
import Header from "./components/Header.jsx";
import MainContent from "./components/MainContent.jsx";

function App() {
  return (
      <div className="container">
      <Header />
      <MainContent />
    </div>
  )
}

export default App
