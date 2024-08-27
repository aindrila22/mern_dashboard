import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#151414] text-gray-300 text-xs text-center py-4 tracking-wide">
      <p>&copy; {currentYear} Made by Aindrila Bhattacharjee</p>
    </footer>
  );
};

export default Footer;