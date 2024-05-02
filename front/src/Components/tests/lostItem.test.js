import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import LostItem from './LostItem';
import axios from 'axios';

jest.mock('axios');

describe('LostItem Component', () => {
  beforeEach(() => {
    axios.mockClear();
  });

  it('renders LostItem component', () => {
    render(<LostItem />);
    expect(screen.getByText('Post Item')).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    const { getByLabelText, getByText } = render(<LostItem />);
    const itemNameInput = getByLabelText('Item name*');
    const descriptionInput = getByLabelText('Description*');
    const typeInput = getByLabelText('Item type*');

    fireEvent.change(itemNameInput, { target: { value: 'Test Item' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    fireEvent.change(typeInput, { target: { value: 'Lost' } });

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(axios).toHaveBeenCalledWith({
        url: 'http://localhost:5000/postitem',
        method: 'POST',
        data: expect.any(FormData),
        headers: {
          Authorization: expect.any(String),
        },
      });
    });
  });

  it('displays error message for missing required fields', async () => {
    render(<LostItem />);
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('Did you miss any of the required fields 🙄?')).toBeInTheDocument();
    });
  });

  // Add more test cases as needed...
});
