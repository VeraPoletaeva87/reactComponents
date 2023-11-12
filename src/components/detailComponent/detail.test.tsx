import { render, screen, waitFor } from '@testing-library/react';
import { Mock, beforeEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Detail from './detail';
import { MemoryRouter, useNavigate, useLocation } from 'react-router-dom';
import { beerApi } from './detail-api';

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

vi.mock('./detail-api', async () => {
  return {
    beerApi: vi.fn(),
  };
});

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
  it('clicking the close button hides the component', async () => {
    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Detail />
      </MemoryRouter>
    );
    await waitFor(() =>
      expect(screen.getByTestId('detail-close-button')).toBeInTheDocument()
    );
    await userEvent.click(screen.getByTestId('detail-close-button'));
    expect(navigate).toBeCalledWith('/');
  });

  it('loading indicator is displayed while fetching data', async () => {
    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Detail />
      </MemoryRouter>
    );
    expect(screen.getByTestId('detail-loader')).toBeInTheDocument();
  });

  it('detailed card component correctly displays the detailed card data', async () => {
    (beerApi as Mock).mockReturnValue(
      Promise.resolve({
        name: 'name1',
        description: 'description1',
        tagline: 'tagline1',
      })
    );

    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Detail />
      </MemoryRouter>
    );
    await waitFor(() =>
      expect(screen.getByTestId('detail-description')).toBeInTheDocument()
    );
    expect(
      (screen.getByTestId('detail-description') as HTMLElement).textContent
    ).toEqual('description1');
    expect(
      (screen.getByTestId('detail-name') as HTMLElement).textContent
    ).toEqual('name: name1');
    expect(
      (screen.getByTestId('detail-tagline') as HTMLElement).textContent
    ).toEqual('tagline1');
  });
});
