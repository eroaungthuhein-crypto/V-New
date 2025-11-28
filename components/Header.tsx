import React, { useState } from 'react';

interface HeaderProps {
  onNavigate: (page: 'home' | 'create') => void;
  currentPage: 'home' | 'create';
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-red-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo / Brand */}
        <div 
          className="flex items-center space-x-3 cursor-pointer" 
          onClick={() => onNavigate('home')}
        >
          <div className="bg-yellow-400 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold leading-none">ဗီယက်နမ် သတင်း</h1>
            <p className="text-xs text-red-100 opacity-90">Vietnam News Daily</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6">
          <button 
            onClick={() => onNavigate('home')}
            className={`font-semibold hover:text-yellow-300 transition ${currentPage === 'home' ? 'text-yellow-400 underline decoration-2 underline-offset-4' : ''}`}
          >
            ပင်မစာမျက်နှာ (Home)
          </button>
          <button className="hover:text-yellow-300 transition">စီးပွားရေး (Economy)</button>
          <button className="hover:text-yellow-300 transition">ခရီးသွား (Travel)</button>
          <button 
            onClick={() => onNavigate('create')}
            className={`px-4 py-2 rounded bg-yellow-400 text-red-800 font-bold hover:bg-yellow-300 transition ${currentPage === 'create' ? 'ring-2 ring-white' : ''}`}
          >
            သတင်းတင်ရန် (Post News)
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-red-800 p-4 space-y-4">
          <button onClick={() => { onNavigate('home'); setIsMenuOpen(false); }} className="block w-full text-left py-2 hover:bg-red-700 rounded px-2">
            ပင်မစာမျက်နှာ (Home)
          </button>
          <button className="block w-full text-left py-2 hover:bg-red-700 rounded px-2">
            စီးပွားရေး (Economy)
          </button>
          <button className="block w-full text-left py-2 hover:bg-red-700 rounded px-2">
            ခရီးသွား (Travel)
          </button>
          <button onClick={() => { onNavigate('create'); setIsMenuOpen(false); }} className="block w-full text-left py-2 bg-yellow-500 text-red-900 font-bold rounded px-2">
            သတင်းတင်ရန် (Post News)
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;