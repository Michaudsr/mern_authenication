import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import About from './components/About'
import Footer from './components/Footer'
import Welcome from './components/Welcome'


function App() {
  return (
    <div className="App">
      <Navbar />
      <Welcome />
      <Footer />
    </div>
  );
}

export default App;
