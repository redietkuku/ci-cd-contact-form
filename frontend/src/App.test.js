import { render, screen } from '@testing-library/react';
import App from './App';

test('renders contact form heading', () => {
  render(<App />);
  expect(screen.getByText(/contact us/i)).toBeInTheDocument();
});
