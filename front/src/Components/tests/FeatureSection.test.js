import React from 'react';
import { render } from '@testing-library/react';
import FeaturesSection from '../FeatureSection';
import { ToastProvider } from 'react-toast-notifications'; // Import the ToastProvider
import '@testing-library/jest-dom/extend-expect';

test('renders FeaturesSection component', () => {
  const { getByText } = render(
    <ToastProvider>
      <FeaturesSection />
    </ToastProvider>
  );
  
  // Check if each feature title is rendered
  expect(getByText('User Registration and Authentication')).toBeInTheDocument();
  expect(getByText('Lost Item Reporting')).toBeInTheDocument();
  expect(getByText('Found Item Submission')).toBeInTheDocument();
  expect(getByText('Centralized Database')).toBeInTheDocument();
  expect(getByText('Verification Process for Claiming Items')).toBeInTheDocument();
  expect(getByText('User Dashboard and Notifications')).toBeInTheDocument();
});
