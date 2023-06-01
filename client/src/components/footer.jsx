import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h4>POPULAR LOCATIONS</h4>
            <p>Mumbai</p>
             <p>Hyderabad</p>
            <p>Kolkata</p>
            <p>Bangaluru</p>
          </div>
           <div className="col-md-4">
            <h4>EasySell
</h4>
            <p>At Easy Sell, we believe in the power of second-hand selling. It's more than just a transaction; it's an opportunity to give new life to your pre-loved items. Whether you're decluttering, upgrading, or simply looking to pass on cherished possessions, we're here to make the process easy and rewarding.</p>
            
          </div>
          <div className="col-md-4">
            <h4>Contact Us</h4>
            <ul className="list-unstyled">
              <li><FontAwesomeIcon icon={faEnvelope} /> xyz@example.com</li>
              <li><FontAwesomeIcon icon={faPhone} /> (+91)9876543210</li>
              <li><FontAwesomeIcon icon={faMapMarkerAlt} /> 123 Main St, deljj, ind 10001</li>
            </ul>
          </div>
        </div>
        <hr />
        <p className="text-center">&copy; 2023 our Company. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
