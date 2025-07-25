// src/components/Header.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ onReset }) => {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link to="/" onClick={onReset}>
          <h1 className="text-xl md:text-2xl font-bold cursor-pointer">Onde no Mundo?</h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;