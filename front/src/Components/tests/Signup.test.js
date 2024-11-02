import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Signup from '../Signup';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

test('Signup form redirects to login page after successful signup', async () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Signup />
    </Router>
  );
  
  fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
  fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'Doe' } });
  fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'tesst@example.com' } });
  fireEvent.change(screen.getByPlaceholderText('Phone Number'), { target: { value: '1234567890' } });
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
  fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'password123' } });
  
  fireEvent.click(screen.getByText('Submit'));

  // Wait for the login page to render
  await waitFor(() => {
    expect(history.location.pathname).toBe('/');
  });
});