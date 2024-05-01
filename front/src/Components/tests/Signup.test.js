import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Signup from '../Signup';

test('Signup form submits successfully', async () => {
  render(<Signup />);
  
  fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
  fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'Doe' } });
  fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByPlaceholderText('Phone Number'), { target: { value: '1234567890' } });
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
  fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'password123' } });
  
  fireEvent.click(screen.getByText('Submit'));

  await waitFor(() => {
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  // Add assertions for the expected behavior after successful signup
});

test('Signup form displays error message on invalid input', async () => {
  render(<Signup />);
  
  // Simulate invalid input
  
  fireEvent.click(screen.getByText('Submit'));

  await waitFor(() => {
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  // Add assertions for the expected behavior when signup fails
});
