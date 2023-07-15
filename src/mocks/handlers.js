// src/mocks/handlers.js
import { rest } from 'msw';
// import bedMockData from './bed-mock-data';
// export const handlers = [
// rest.post('/login', (req, res, ctx) => {
//   // Persist user's authentication in the session
//   sessionStorage.setItem('is-authenticated', 'true')

//   return res(
//     // Respond with a 200 status code
//     ctx.status(200),
//   )
// }),

//   rest.get('/beds/', (req, res, ctx) => {
//     console.log('mocking beds');
//     return res(
//       ctx.status(200),
//       ctx.json([
//         {
//           id: 1,
//           name: 'Test Bed 1',
//           cellsX: 2,
//           cellsY: 2,
//           cells: [
//             {
//               id: 1,
//               name: 'Cell 1',
//               vegetable: 'beetroot',
//             },
//             {
//               id: 2,
//               name: 'Cell 2',
//               vegetable: 'lettuce',
//             },
//             {
//               id: 3,
//               name: 'Cell 3',
//               vegetable: 'radish',
//             },
//             {
//               id: 4,
//               name: 'Cell 4',
//               vegetable: 'kale',
//             },
//           ],
//         },
//         {
//           id: 2,
//           name: 'Test Bed 2',
//           cellsX: 4,
//           cellsY: 2,
//           cells: [
//             {
//               id: 1,
//               name: 'Cell 1',
//               vegetable: 'beetroot',
//             },
//             {
//               id: 2,
//               name: 'Cell 2',
//               vegetable: 'beetroot',
//             },
//             {
//               id: 3,
//               name: 'Cell 3',
//               vegetable: 'beetroot',
//             },
//             {
//               id: 4,
//               name: 'Cell 4',
//               vegetable: 'beetroot',
//             },
//             {
//               id: 5,
//               name: 'Cell 5',
//               vegetable: 'beetroot',
//             },
//             {
//               id: 6,
//               name: 'Cell 6',
//               vegetable: 'beetroot',
//             },
//             {
//               id: 7,
//               name: 'Cell 7',
//               vegetable: 'beetroot',
//             },
//             {
//               id: 8,
//               name: 'Cell 8',
//               vegetable: 'beetroot',
//             },
//           ],
//         },
//       ]),
//     );
//   }),
// ];

function getPosts() {
  return rest.get('http://localhost:4000/beds/', (req, res, ctx) => {
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
  });
}

export const handlers = [getPosts()];
