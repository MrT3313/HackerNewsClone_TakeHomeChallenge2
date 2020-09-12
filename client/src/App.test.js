// IMPORTS
import React from 'react';
import { render } from '@testing-library/react';

// COMPONENTS
import App from './App';

// TESTS
test('Renders Without Crashing', () => {
  render(<App />);
});
