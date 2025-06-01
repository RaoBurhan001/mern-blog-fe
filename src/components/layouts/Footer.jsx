import React from 'react';

const Footer = () => (
  <footer className="w-full bg-white border-t py-4 text-center text-gray-400 text-sm mt-8 shadow-inner">
    &copy; {new Date().getFullYear()} MERN Blog. All rights reserved.
  </footer>
);

export default Footer;
