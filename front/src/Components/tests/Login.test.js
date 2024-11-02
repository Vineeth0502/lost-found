import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Login from '../Login';
import '@testing-library/jest-dom/extend-expect';

describe('Login Component', () => {
  it('renders login form', () => {
    const { getByText, getByPlaceholderText } = render(<Login />);
    expect(getByText('Log in')).toBeInTheDocument();
    expect(getByPlaceholderText('Email id')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
  });

  // Add assertions for the expected behavior after successful login
});

test('Login form displays error message on invalid credentials', async () => {
  render(<Login />);
  
  fireEvent.change(screen.getByPlaceholderText('Email id'), { target: { value: 'invalid@example.com' } });
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'invalidpassword' } });
  
  fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBeTruthy();
      expect(localStorage.getItem('user')).toBeTruthy();
    });
  });

  // Add more test cases as needed...
});