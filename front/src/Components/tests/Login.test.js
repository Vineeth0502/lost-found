import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Login from '../Login';
import '@testing-library/jest-dom/extend-expect';

describe('Login Component', () => {
  it('renders login form', () => {
    const { getByText, getByPlaceholderText } = render(<Login />);
    expect(getByText('Log in')).toBeInTheDocument();
    expect(getByPlaceholderText('Email id')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('displays error message on invalid credentials', async () => {
    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText('Email id'), { target: { value: 'invalid@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'invalidpassword' } });
    fireEvent.click(screen.getByText('Submit'));
    await waitFor(() => {
      const errorMessage = screen.getByText(/Invalid credentials/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('saves token and user info on successful login', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ token: 'dummy-token', user: { id: 1, name: 'John Doe' } }),
      })
    );

    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText('Email id'), { target: { value: 'valid@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'validpassword' } });
    fireEvent.click(screen.getByText('Submit'));
    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('dummy-token');
      expect(JSON.parse(localStorage.getItem('user'))).toEqual({ id: 1, name: 'John Doe' });
    });
    global.fetch.mockRestore();
  });
});
