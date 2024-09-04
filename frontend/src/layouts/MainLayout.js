// MainLayout.js
import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';

function MainLayout({ children }) {
  return (
    <div className='bg-gray-100'>
      <Header />
      <main className="py-3 ">
        <Container>
          {children}
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
