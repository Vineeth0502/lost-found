import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Login from '../Login';

test('Login form submits successfully', async () => {
  render(<Login />);
  
  fireEvent.change(screen.getByPlaceholderText('Email id'), { target: { value: 'adithya1234@gmail.com' } });
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Aa12345' } });
  
  fireEvent.click(screen.getByText('Submit'));

  await waitFor(() => {
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  // Add assertions for the expected behavior after successful login
});

test('Login form displays error message on invalid credentials', async () => {
  render(<Login />);
  
  fireEvent.change(screen.getByPlaceholderText('Email id'), { target: { value: 'invalid@example.com' } });
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'invalidpassword' } });
  
  fireEvent.click(screen.getByText('Submit'));

  await waitFor(() => {
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  // Add assertions for the expected behavior when login fails
});
