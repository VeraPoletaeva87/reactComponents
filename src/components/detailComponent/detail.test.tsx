import { render, screen, waitFor } from '@testing-library/react';
import {
  Mock,
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import userEvent from '@testing-library/user-event';
import Detail from './detail';
import { MemoryRouter, useNavigate, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { setupServer } from 'msw/node';
import { delay, http, HttpResponse } from 'msw';

const mockData = [
  {
    name: 'name1',
    description: 'description1',
    tagline: 'tagline1',
  },
];

const handlers = [
  http.get('https://api.punkapi.com/v2/beers/details/1', async () => {
    await delay(150);
    return HttpResponse.json(mockData);
  }),
];

let server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

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
  it('clicking the close button hides the component', async () => {
    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Provider store={store}>
          <Detail />
        </Provider>
      </MemoryRouter>
    );
    await waitFor(() =>
      expect(screen.getByTestId('detail-close-button')).toBeInTheDocument()
    );
    await userEvent.click(screen.getByTestId('detail-close-button'));
    expect(navigate).toBeCalledWith('/');
  });

  it('loading indicator is displayed while fetching data', async () => {
    async () => {
      const handlers = [
        http.get('https://api.punkapi.com/v2/beers/details/1', async () => {
          await delay(150);
          return HttpResponse.json([mockData]);
        }),
      ];

      server = setupServer(...handlers);
      server.resetHandlers();

      render(
        <MemoryRouter initialEntries={['/details/1']}>
          <Provider store={store}>
            <Detail />
          </Provider>
        </MemoryRouter>
      );

      expect(screen.getByTestId('detail-loader')).toBeInTheDocument();
    };
  });

  it('detailed card component correctly displays the detailed card data', async () => {
    async () => {
      const handlers = [
        http.get('https://api.punkapi.com/v2/beers/details/1', async () => {
          await delay(150);
          return HttpResponse.json([mockData]);
        }),
      ];

      server = setupServer(...handlers);
      server.resetHandlers();

      render(
        <MemoryRouter initialEntries={['/details/1']}>
          <Provider store={store}>
            <Detail />
          </Provider>
        </MemoryRouter>
      );

      await waitFor(() =>
        expect(screen.getByTestId('detail-description')).toBeInTheDocument()
      );
      screen.debug;
      expect(
        (screen.getByTestId('detail-description') as HTMLElement).textContent
      ).toEqual('description1');
      expect(
        (screen.getByTestId('detail-name') as HTMLElement).textContent
      ).toEqual('name: name1');
      expect(
        (screen.getByTestId('detail-tagline') as HTMLElement).textContent
      ).toEqual('tagline1');
    };
  });
});
