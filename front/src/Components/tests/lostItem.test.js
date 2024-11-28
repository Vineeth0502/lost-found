import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ToastProvider } from 'react-toast-notifications'; 
import LostItem from '../Lost_item';

test('renders post item pop-up', () => {
  const { getByText } = render(
    <ToastProvider>
      <LostItem />
    </ToastProvider>
  );
  const postItemButton = getByText('Post Item');
  fireEvent.click(postItemButton);
  const modalTitle = getByText('Post item');
  expect(modalTitle).toBeInTheDocument();
});

// Add more test cases for other scenarios like file upload, etc.
