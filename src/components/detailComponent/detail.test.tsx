import { render, screen } from '@testing-library/react';
import { Mock, beforeEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Detail from './detail';
import { MemoryRouter, useNavigate, useLocation } from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  const routerDom = await vi.importActual<typeof import('react-router-dom')>(
    'react-router-dom'
  );
  return {
    ...routerDom,
    useLocation: vi.fn(),
    useNavigate: vi.fn(),
  };
});

const navigate = vi.fn();

beforeEach(() => {
  (useLocation as Mock).mockReturnValue({
    state: { id: 1 },
    key: '',
    pathname: '',
    search: '',
    hash: '',
  });
  (useNavigate as Mock).mockReturnValue(navigate);
});

describe('Detail', () => {
  const mockData = [
    {
      name: 'name1',
      description: 'description1',
      tagline: 'tagline1',
    },
  ];

  global.fetch = vi.fn().mockResolvedValue({
    json: vi.fn(() => Promise.resolve(mockData)),
  });

  it('clicking the close button hides the component', async () => {
    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Detail />
      </MemoryRouter>
    );
    await userEvent.click(screen.getByTestId('detail-close-button'));
    expect(navigate).toBeCalledWith('/');
  });
});
