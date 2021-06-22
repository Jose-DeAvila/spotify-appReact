import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import App from './App';
import Home from './pages/home';
import { getAccessCode } from './services/services';

describe('Checking renders', () => {
  test('Check if app render', () => {
    render(<App />);
    const linkElement = screen.getByText(/Ingresar con Spotify/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('Check if home render', () => {
    render(<Home />);
    const titleSection = screen.getByText(/Playlists:/i);
    expect(titleSection).toBeVisible(); 
  });
});

describe('Checking localStorage calls', () => {
  test('Home return to init if TokenInfo doesnt exist', () => {

    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Home />
      </Router>
    );

    expect(localStorage.getItem('tokenInfo')).toBeFalsy();
    expect(history.location.pathname).toBe('/');
  });
});