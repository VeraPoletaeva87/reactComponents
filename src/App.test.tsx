import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import RoutesComponent from './components/routesComponent/roures';
import { MemoryRouter } from 'react-router-dom';

describe('App', () => {
  it('404 page is displayed when navigating to an invalid route', () => {
    render(
      <MemoryRouter initialEntries={['/not-existing-route']}>
        <RoutesComponent />
      </MemoryRouter>
    );
    expect(screen.getByTestId('invalid-route')).toBeInTheDocument();
  });
});
