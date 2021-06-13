import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('Check if app render', () => {
  render(<App />);
  const linkElement = screen.getByText(/Ingresar con Spotify/i);
  expect(linkElement).toBeInTheDocument();
});