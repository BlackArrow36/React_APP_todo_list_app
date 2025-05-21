import React from 'react';
import defaultLogo from '../assets/logo.png';

function Logo() {
  return (
    <img
      src={defaultLogo}
      alt="Task Logo"
      style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 8, marginRight: 10 }}
    />
  );
}

export default Logo;
