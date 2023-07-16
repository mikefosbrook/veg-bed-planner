# Veg Bed Planner

A vegetable bed planning app based on the [Square Foot Gardening](https://squarefootgardening.org/ 'Square Foot Gardening') technique.

## Technologies

[Vite](https://vitejs.dev/ 'Vite')<br>
[React](https://react.dev/p:// 'React')<br>
[React Router](https://reactrouter.com/en/main:// 'React Router')<br>
[JSON Server](https://github.com/typicode/json-server 'JSON Server')<br>
[Testing Library](https://testing-library.com/, 'Testing Library')<br>
[Vitest](https://vitest.dev/ 'Vitest')<br>
[Mock Service Worker](https://mswjs.io/ 'MSW')

## Getting Started

### Dependencies

- Node JS (built @ version 18.16.1).
- NPM (built @ version 9.5.1)

### Installing

```
npm install
```

Create a file called .env.local in the root directory and add the following:

```
VITE_API_HOST=http://localhost:4000
```

### Running

```
npm run dev
```

- The project will automatically launch in the browser at http://localhost:3000/
- JSON Server will also run at the same time at http://localhost:4000/

## Testing

```
npm run test
```

- Testing is handled by Vitest (with jest-dom matchers) and React Testing Library
- Although JSON Server is employed as a mock API, fetch requests in the tests are intercepted by MSW and mocked responses are returned for consistency in tests

## Data

Data is provided in the form of a fake REST API using JSON Server and accessed via:
http://localhost:4000/beds All bed data
http://localhost:4000/beds/[id] Specific bed

The data is stored at`/src/data/db.json`
