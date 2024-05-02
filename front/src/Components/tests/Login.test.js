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

  it('submits login form with valid credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<Login />);
    const emailInput = getByPlaceholderText('Email id');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.change(emailInput, { target: { value: 'adithya1234@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Aa12345' } });

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBeTruthy();
      expect(localStorage.getItem('user')).toBeTruthy();
    });
  });

  // Add more test cases as needed...
});
