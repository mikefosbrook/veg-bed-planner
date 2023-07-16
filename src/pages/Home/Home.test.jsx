import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { BedsProvider } from '../../contexts/Beds';
import Home from './Home';

describe('Home', () => {
  test('Renders the <BedList />, within <Home />, with two Beds', async () => {
    render(
      <BrowserRouter>
        <BedsProvider ContextProvider>
          <Home />
        </BedsProvider>
      </BrowserRouter>,
    );

    const bed1 = await screen.findByRole('heading', { name: /Test Bed 1/i });
    const bed2 = await screen.findByRole('heading', { name: /Test Bed 2/i });

    expect(bed1).toBeInTheDocument();
    expect(bed2).toBeInTheDocument();
  });
});
