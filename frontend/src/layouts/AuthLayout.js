// AuthLayout.js
import React from 'react';
import Header from '../components/Header';
function AuthLayout({ children }) {
  return (
    <>
    <Header/>
      <div className="auth-layout bg-white h-[80%] w-full flex items-center justify-center">
      {children}
    </div>
    </>
  
  );
}

export default AuthLayout;

