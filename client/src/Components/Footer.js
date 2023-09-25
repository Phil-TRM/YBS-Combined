import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="container px-8 mx-auto xl:px-5 max-w-screen-lg py-5 lg:py-8 mt-10 border-t border-gray-100 dark:border-gray-800">
      <div className="text-center text-sm">
        Copyright © {/* */}2023{/* */} {/* */}The Regan Method LLC{/* */}. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
