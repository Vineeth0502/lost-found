import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Signup from '../Signup';

// Mock axios module to simulate API requests
jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: 'Done' })),
}));

describe('Signup Component', () => {
  it('renders signup form', () => {
    const { getByPlaceholderText, getByText } = render(<Signup />);
    
    expect(getByPlaceholderText('First Name')).toBeInTheDocument();
    expect(getByPlaceholderText('Last Name')).toBeInTheDocument();
    expect(getByPlaceholderText('Email')).toBeInTheDocument();
    expect(getByPlaceholderText('Phone Number')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
    expect(getByPlaceholderText('Confirm Password')).toBeInTheDocument();
    expect(getByText('Submit')).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    const { getByPlaceholderText, getByText } = render(<Signup />);
    
    fireEvent.change(getByPlaceholderText('First Name'), { target: { value: 'John' } });
    fireEvent.change(getByPlaceholderText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(getByPlaceholderText('Phone Number'), { target: { value: '1234567890' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(getByPlaceholderText('Confirm Password'), { target: { value: 'password123' } });
    
    fireEvent.click(getByText('Submit'));
    
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/signup', {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        number: '1234567890',
        password: 'password123',
        cpassword: 'password123',
      });
    });
    
    expect(getByText('Done')).toBeInTheDocument();
  });

  // Add more test cases to cover edge cases and error handling
});
