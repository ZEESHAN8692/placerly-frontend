import React, { useState } from 'react';

import Header from '../layout/Header';
import Footer from '../layout/Footer';

import ContactUsComp from '../components/ContactUsComp';

const ContactUs = () => {



  return (
    <>
    <Header/>
      <ContactUsComp/>
    <Footer/>
    </>
  );
};

export default ContactUs;