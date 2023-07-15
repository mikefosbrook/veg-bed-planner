import matchers from '@testing-library/jest-dom/matchers';
import { expect, afterEach, beforeAll, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import server from '../src/mocks/server';

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// Establish API mocking before all tests.
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
  // runs a cleanup after each test case (e.g. clearing jsdom)
  cleanup();
});

// Clean up after the tests are finished.
afterAll(() => server.close());
