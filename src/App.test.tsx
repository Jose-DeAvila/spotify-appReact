import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import Home from './pages/home';

test('Check if app render', () => {
  render(<App />);
  const linkElement = screen.getByText(/Ingresar con Spotify/i);
  expect(linkElement).toBeInTheDocument();
});

test('Testing test for home', () => {
  render(<Home />);
  const titleSection = screen.getByText(/Playlists:/i);
  expect(titleSection).toBeVisible(); 
})