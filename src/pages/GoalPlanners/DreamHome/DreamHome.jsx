import React from 'react';
import Navbar from '@/component/Navbar';
import Footer from '@/component/Footer';
import DreamHomeForm from './Components/DreamHomeForm';

const DreamHome = () => {
  return (
    <div>
      <Navbar />
      <DreamHomeForm />
      <Footer />
    </div>
  );
};

export default DreamHome;
