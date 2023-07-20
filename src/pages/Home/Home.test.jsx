import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { BedsProvider } from '../../contexts/Beds';
import Home from './Home';
import App from '../../App';
import { act } from 'react-dom/test-utils';

describe('Home', () => {
  test('<Home /> renders the <BedList /> with two Beds', async () => {
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

  test('If a user clicks the delete button on the first bed, then the bed is removed from the page', async () => {
    render(
      <BrowserRouter>
        <BedsProvider ContextProvider>
          <Home />
        </BedsProvider>
      </BrowserRouter>,
    );

    const deleteButton = await screen.findAllByRole('button', { name: /Delete/i });

    act(() => {
      fireEvent.click(deleteButton[0]);
    });

    const bed1 = await screen.findByRole('heading', { name: /Test Bed 1/i });
    const bed2 = await screen.findByRole('heading', { name: /Test Bed 2/i });

    expect(bed1).not.toBeInTheDocument();
    expect(bed2).toBeInTheDocument();
  });

  test('If a user clicks on a bed, then they are taken to the corresponding page', async () => {
    render(
      <BrowserRouter>
        <BedsProvider ContextProvider>
          <App />
        </BedsProvider>
      </BrowserRouter>,
    );

    const bed2 = await screen.findByRole('heading', { name: /Test Bed 2/i });

    act(() => {
      fireEvent.click(bed2);
    });

    const bedPage2 = await screen.findByRole('heading', { name: /Test Bed 2/i });

    expect(bedPage2).toBeInTheDocument();

    const homeLink = await screen.findByRole('link', { name: /Home/i });

    act(() => {
      fireEvent.click(homeLink);
    });
  });

  test("If a user clicks 'Add a new bed', then they are taken to the page where they can create a bed", async () => {
    render(
      <BrowserRouter>
        <BedsProvider ContextProvider>
          <App />
        </BedsProvider>
      </BrowserRouter>,
    );

    const addBedButton = await screen.findByRole('button', { name: 'Add a new bed' });

    act(() => {
      fireEvent.click(addBedButton);
    });

    const addBedPageHeading = await screen.findByRole('heading', { name: /Add a new bed/i });

    expect(addBedPageHeading).toBeInTheDocument();
  });
});
