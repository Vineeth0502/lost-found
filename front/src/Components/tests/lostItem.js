import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import LostItem from '../Lost_item';

describe('LostItem Component', () => {
  it('renders lost item form', () => {
    const { getByText, getByPlaceholderText } = render(<LostItem />);
    expect(getByText('Post Item')).toBeInTheDocument();
    expect(getByPlaceholderText('Item name')).toBeInTheDocument();
    expect(getByPlaceholderText('Description')).toBeInTheDocument();
    // Add assertions for other form elements as needed...
  });

  // Add more test cases as needed...
});
