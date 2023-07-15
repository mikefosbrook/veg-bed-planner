import { render, screen } from '@testing-library/react';

import Home from './Home';
import server from '../../mocks/server';

import { rest } from 'msw';
import { BrowserRouter } from 'react-router-dom';
import { BedsProvider } from '../../contexts/Beds';

describe('Home', () => {
  //   test('Renders the component with loading state', async () => {
  //     render(<Home />);
  //     await screen.findByText(/Loading.../i);
  //   });

  test('Renders the BedList within Home with two Beds', async () => {
    server.use(
      rest.get(`http://localhost:4000/beds`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json([
            {
              id: 1,
              name: 'Test Bed 1',
              cellsX: 2,
              cellsY: 2,
              cells: [
                {
                  id: 1,
                  name: 'Cell 1',
                  vegetable: 'beetroot',
                },
                {
                  id: 2,
                  name: 'Cell 2',
                  vegetable: 'lettuce',
                },
                {
                  id: 3,
                  name: 'Cell 3',
                  vegetable: 'radish',
                },
                {
                  id: 4,
                  name: 'Cell 4',
                  vegetable: 'kale',
                },
              ],
            },
            {
              id: 2,
              name: 'Test Bed 2',
              cellsX: 4,
              cellsY: 2,
              cells: [
                {
                  id: 1,
                  name: 'Cell 1',
                  vegetable: 'beetroot',
                },
                {
                  id: 2,
                  name: 'Cell 2',
                  vegetable: 'beetroot',
                },
                {
                  id: 3,
                  name: 'Cell 3',
                  vegetable: 'beetroot',
                },
                {
                  id: 4,
                  name: 'Cell 4',
                  vegetable: 'beetroot',
                },
                {
                  id: 5,
                  name: 'Cell 5',
                  vegetable: 'beetroot',
                },
                {
                  id: 6,
                  name: 'Cell 6',
                  vegetable: 'beetroot',
                },
                {
                  id: 7,
                  name: 'Cell 7',
                  vegetable: 'beetroot',
                },
                {
                  id: 8,
                  name: 'Cell 8',
                  vegetable: 'beetroot',
                },
              ],
            },
          ]),
        );
      }),
    );
    render(
      <BrowserRouter>
        <BedsProvider ContextProvider>
          <Home />
        </BedsProvider>
      </BrowserRouter>,
    );
    // find txt anywhere in the document
    await screen.findByText(/Test Bed 1/i);
    await screen.findByText(/Test Bed 2/i);
  });
});
