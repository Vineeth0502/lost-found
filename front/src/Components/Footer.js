import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: '#282c34',
        color: '#ffffff',
        padding: '15px 20px',
        textAlign: 'center',
        fontSize: '16px',
        position: 'relative',
      }}
      id="footer"
    >
      <div
        style={{
          content: '""',
          position: 'absolute',
          top: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80px',
          height: '3px',
          backgroundColor: '#ff8c00',
          borderRadius: '4px',
          marginTop: '-20px',
        }}
      ></div>
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-12 col-md-auto mb-3 mb-md-0 text-center">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#ff8c00',
                marginRight: '10px',
                transition: 'color 0.3s ease, transform 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = '#ffd700';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = '#ff8c00';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <i className="fas fa-envelope fa-2x"></i>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#ff8c00',
                marginRight: '10px',
                transition: 'color 0.3s ease, transform 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = '#ffd700';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = '#ff8c00';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <i className="fas fa-globe fa-2x"></i>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#ff8c00',
                marginRight: '10px',
                transition: 'color 0.3s ease, transform 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = '#ffd700';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = '#ff8c00';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <i className="fab fa-github fa-2x"></i>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#ff8c00',
                transition: 'color 0.3s ease, transform 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = '#ffd700';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = '#ff8c00';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
          </div>
          <div className="col-12 col-md text-center text-md-start mt-3 mt-md-0">
            <p style={{ margin: '0', fontSize: '15px', color: '#bbb' }}>
              © {currentYear} Lost - Found
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
