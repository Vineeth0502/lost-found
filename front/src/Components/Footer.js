import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="colored-section py-4" id="footer">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-12 col-md-auto mb-3 mb-md-0">
            <a href="#" target="_blank" className="text-decoration-none me-3">
              <i className="social_icon fas fa-envelope fa-2x text-white"></i>
            </a>
            <a href="#" target="_blank" className="text-decoration-none me-3">
              <i className="social_icon fas fa-globe fa-2x text-white"></i>
            </a>
            <a href="#" target="_blank" className="text-decoration-none me-3">
              <i className="social_icon fab fa-github fa-2x text-white"></i>
            </a>
            <a href="#" target="_blank" className="text-decoration-none">
              <i className="social_icon fab fa-linkedin fa-2x text-white"></i>
            </a>
          </div>
          <div className="col-12 col-md text-center text-md-start">
            <p className="mb-0 text-white">© {currentYear} Lost - Found</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
