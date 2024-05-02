import React from 'react';
import { render } from '@testing-library/react';
import LostItem from '../Lost_item';


// Mock the ToastProvider context
jest.mock('react-toast-notifications', () => ({
  useToasts: jest.fn(), // Mock the useToasts hook
  ToastProvider: ({ children }) => <div>{children}</div>, // Mock the ToastProvider component
}));

describe('LostItem Component', () => {
  it('renders lost item form', () => {
    // Mock the useToasts hook to return a mocked value
    const mockAddToast = jest.fn();
    require('react-toast-notifications').useToasts.mockReturnValue({ addToast: mockAddToast });

    // Render the LostItem component within the mocked ToastProvider context
    const { getByText, getByPlaceholderText } = render(<LostItem />);

    // Your assertions here
    expect(getByText('Post Item')).toBeInTheDocument();
    expect(getByPlaceholderText('Item name')).toBeInTheDocument();
    expect(getByPlaceholderText('Description')).toBeInTheDocument();
  });
});
