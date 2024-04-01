import React from 'react';

const TitleSection = () => {
  return (
    <section className="timer">
    <div className="container">
      <div className="ss">
        <div className="col-lg-6 mb-4 mb-lg-0">
          <div className="text-center text-lg-start">
            <h1 className="title">Welcome to the Community Lost & Found Application</h1>
            <p className="subtitle">Your go-to platform for finding lost items</p>
            <div className="buttons">
              <a href="/log-in" className="btn btn-primary" style={{ marginRight: '10px' }}>Sign-In</a>
              <a href="/sign-up" className="btn btn-outline-primary">Sign-Up</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  );
};

export default TitleSection;
