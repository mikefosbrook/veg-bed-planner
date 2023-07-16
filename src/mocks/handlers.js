import { rest } from 'msw';
import bedMockData from './bed-mock-data';

function getBeds() {
  return rest.get('http://localhost:4000/beds/', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(bedMockData));
  });
}

function deleteBed() {
  return rest.delete('http://localhost:4000/beds/:id', (req, res, ctx) => {
    return res(ctx.status(200));
  });
}

export const handlers = [getBeds(), deleteBed()];
