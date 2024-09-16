import React from 'react'
import Logo from '../images/logoIcon.svg';
const Loader = () => {
  return (
    /* From Uiverse.io by abrahamcalsin */ 
    <div className="flex flex-col items-center justify-center h-screen bg-white ">
   
      <img
        src={Logo} // Replace with the actual path to your SVG
        alt="Loading logo"
        className="w-12 h-12 breathing-logo  "
      />
    </div>

  )
}

export default Loader