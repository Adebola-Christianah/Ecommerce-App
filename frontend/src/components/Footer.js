import React from "react";
import { Link } from 'react-router-dom';
import QrCode from '../images/Qr Code.png';
import GooglePlay from '../images/google.png';
import AppleStore from '../images/download-appstore.png';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 mt-12">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
        {/* Exclusive Section */}
        <div>
          <h3 className="font-bold text-lg text-white">Exclusive</h3>
          <p>Subscribe</p>
          <p>Get 10% off your first order</p>
          <form className="mt-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 w-full text-black"
            />
            {/* <button
              type="submit"
              className="bg-white text-black mt-2 py-2 px-4 w-full"
            >
              Subscribe
            </button> */}
          </form>
        </div>

        {/* Support Section */}
        <div>
          <h3 className="font-bold text-lg text-white">Support</h3>
          <p>111 Bijoy sarani, Dhaka, DH 1216, Bangladesh.</p>
          <p>exclusive@gmail.com</p>
          <p>+88015-88888-9999</p>
        </div>

        {/* Account Section */}
        <div className="text-white">
          <h3 className="font-bold text-lg text-white">Account</h3>
          <ul>
            <li className="mt-2 text-white">
              <Link to="#" className="text-white">
                My Account
              </Link>
            </li>
            <li className="mt-2 text-white">
              <Link to="#" className="text-white">
                Login / Register
              </Link>
            </li>
            <li className="mt-2 text-white">
              <Link to="#" className="text-white">
                Cart
              </Link>
            </li>
            <li className="mt-2 text-white">
              <Link to="#" className="text-white">
                Wishlist
              </Link>
            </li>
            <li className="mt-2 text-white">
              <Link to="#" className="text-white">
                Shop
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Link Section */}
        <div>
          <h3 className="font-bold text-lg text-white">Quick Link</h3>
          <ul>
            <li className="mt-2 text-white">
              <Link to="#" className="text-white">
                Privacy Policy
              </Link>
            </li>
            <li className="mt-2 text-white">
              <Link to="#" className="text-white">
                Terms Of Use
              </Link>
            </li>
            <li className="mt-2 text-white">
              <Link to="#" className="text-white">
                FAQ
              </Link>
            </li>
            <li className="mt-2 text-white">
              <Link to="#" className="text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Download App Section */}
        <div>
          <h3 className="font-bold text-lg text-white">Download App</h3>
          <p>Save $3 with App New User Only</p>
          <div className="flex space-x-2 mt-4 items-center">
            <img src={QrCode} alt="QR Code" className="w-24 h-24 object-cover" />
            <div>
              <img src={GooglePlay} alt="Google Play" className="mb-2" />
              <img src={AppleStore} alt="App Store" className="" />
            </div>
          </div>
          <div className="flex space-x-4 mt-4">
            <Link to="#" aria-label="Facebook" className="text-white">
              <i className="fab fa-facebook"></i>
            </Link>
            <Link to="#" aria-label="Twitter" className="text-white">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link to="#" aria-label="Instagram" className="text-white">
              <i className="fab fa-instagram"></i>
            </Link>
            <Link to="#" aria-label="LinkedIn" className="text-white">
              <i className="fab fa-linkedin"></i>
            </Link>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <p>© Copyright Adebola 2024. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
