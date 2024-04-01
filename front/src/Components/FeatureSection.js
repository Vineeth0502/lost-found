import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFileAlt, faFileUpload, faDatabase, faShieldAlt, faBell } from '@fortawesome/free-solid-svg-icons';

const FeaturesSection = () => {
  return (
    <section className="bg-light py-5" id="features">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4">
            <div className="feature-box text-center p-4">
              <FontAwesomeIcon className="icon-distance mb-4" icon={faUser} size="4x" />
              <h3 className="mb-3" style={{ color: "#343a40" }}>User Registration and Authentication</h3>
              <p className="text-muted">Allow users, both students, and college administration, to register and create accounts. Implement a robust authentication system to ensure secure access to the application, protecting users' personal information.</p>
            </div>
          </div>
          <div className="col-lg-4 mb-4">
            <div className="feature-box text-center p-4">
              <FontAwesomeIcon className="icon-distance mb-4" icon={faFileAlt} size="4x" />
              <h3 className="mb-3" style={{ color: "#343a40" }}>Lost Item Reporting</h3>
              <p className="text-muted">Enable users to report their lost items through a simple and intuitive interface. Users can provide details such as the item's description, location where it was lost, and any relevant additional information.</p>
            </div>
          </div>
          <div className="col-lg-4 mb-4">
            <div className="feature-box text-center p-4">
              <FontAwesomeIcon className="icon-distance mb-4" icon={faFileUpload} size="4x" />
              <h3 className="mb-3" style={{ color: "#343a40" }}>Found Item Submission</h3>
              <p className="text-muted">Allow users who find lost items to submit a report with details about the found item. They can include a description, the location where they found it, and possibly upload a picture to help with identification.</p>
            </div>
          </div>
          <div className="col-lg-4 mb-4">
            <div className="feature-box text-center p-4">
              <FontAwesomeIcon className="icon-distance mb-4" icon={faDatabase} size="4x" />
              <h3 className="mb-3" style={{ color: "#343a40" }}>Centralized Database</h3>
              <p className="text-muted">Implement a MongoDB database to store all reported lost and found items. This database should be well-organized and easily searchable, allowing users to efficiently locate and claim their lost belongings.</p>
            </div>
          </div>
          <div className="col-lg-4 mb-4">
            <div className="feature-box text-center p-4">
              <FontAwesomeIcon className="icon-distance mb-4" icon={faShieldAlt} size="4x" />
              <h3 className="mb-3" style={{ color: "#343a40" }}>Verification Process for Claiming Items</h3>
              <p className="text-muted">Introduce an authentication mechanism, such as security questions, to verify the rightful owner of a found item. This step is essential to ensure that items are returned to the correct person and prevent any misuse.</p>
            </div>
          </div>
          <div className="col-lg-4 mb-4">
            <div className="feature-box text-center p-4">
              <FontAwesomeIcon className="icon-distance mb-4" icon={faBell} size="4x" />
              <h3 className="mb-3" style={{ color: "#343a40" }}>User Dashboard and Notifications</h3>
              <p className="text-muted">Provide users with personalized dashboards where they can view their reported lost items and the status of their claims. Implement a notification system to update users on the progress of their lost item reports and any responses from the platform.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
