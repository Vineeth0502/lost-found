import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ToastProvider } from 'react-toast-notifications'; // Import the ToastProvider
import LostItem from '../Lost_item';

test('renders post item pop-up', () => {
  const { getByText } = render(
    <ToastProvider>
      <LostItem />
    </ToastProvider>
  );

  // Find the button that triggers the modal
  const postItemButton = getByText('Post Item');

  // Click the button to open the modal
  fireEvent.click(postItemButton);

  // Check if the modal title is present
  const modalTitle = getByText('Post item');
  expect(modalTitle).toBeInTheDocument();
});