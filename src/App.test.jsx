import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
  it('renders correctly', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
  });
});
