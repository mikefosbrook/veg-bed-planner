import { rest } from 'msw';
import bedMockData from './bed-mock-data';

function getPosts() {
  return rest.get('http://localhost:4000/beds/', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(bedMockData));
  });
}

export const handlers = [getPosts()];
