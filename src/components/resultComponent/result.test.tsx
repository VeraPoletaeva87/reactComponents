import Result from './result';
import {
  expect,
  describe,
  it,
  test,
  vi,
  beforeEach,
  Mock,
  afterAll,
  afterEach,
  beforeAll,
} from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { useContext } from 'react';
import { HttpResponse, delay, http } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { store } from '../../store';

const mockData = [
  {
    id: 1,
    name: 'name1',
    description: 'description1',
  },
  {
    id: 2,
    name: 'name2',
    description: 'description2',
  },
  {
    id: 3,
    name: 'name3',
    description: 'description3',
  },
  {
    id: 4,
    name: 'name4',
    description: 'description4',
  },
  {
    id: 5,
    name: 'name5',
    description: 'description5',
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
    useNavigate: vi.fn(),
  };
});

vi.mock('react', async () => {
  const react = await vi.importActual<typeof import('react')>('react');
  return {
    ...react,
    useContext: vi.fn(),
  };
});

const navigate = vi.fn();

beforeEach(() => {
  (useNavigate as Mock).mockReturnValue(navigate);
});

describe('Result', () => {
  it('renders the correct number of items in the list', async () => {
    const contextValue = {
      searchString: '',
      setSearchString: vi.fn(),
      items: mockData,
      setItems: vi.fn(),
    };

    (useContext as Mock).mockReturnValue(contextValue);

    async () => {
      const handlers = [
        http.get('https://api.punkapi.com/v2/beers/', async () => {
          await delay(150);
          return HttpResponse.json([mockData]);
        }),
      ];

      server = setupServer(...handlers);
      server.resetHandlers();

      render(
        <MemoryRouter initialEntries={['/main']}>
          <Provider store={store}>
            <Result />
          </Provider>
        </MemoryRouter>
      );

      const expectedItemsCount = 5;
      await waitFor(() =>
        expect(screen.getByTestId('list')).toBeInTheDocument()
      );
      const listItems = screen.getByTestId('list').children;
      expect(listItems.length).toEqual(expectedItemsCount);
    };
  });

  test('the correct message is displayed if no cards are present'),
    async () => {
      const handlers = [
        http.get('https://api.punkapi.com/v2/beers/', async () => {
          await delay(150);
          return HttpResponse.json([]);
        }),
      ];

      server = setupServer(...handlers);
      server.resetHandlers();

      render(
        <Provider store={store}>
          <Result />
        </Provider>
      );

      await waitFor(() =>
        expect(screen.getByTestId('empty-text')).toBeInTheDocument()
      );
      expect(screen.getByTestId('empty-text')).toBeInTheDocument();
    };

  it('clicking on a card opens a detailed card component', async () => {
    render(
      <Provider store={store}>
        <Result />
      </Provider>
    );
    await waitFor(() => expect(screen.getByTestId('list')).toBeInTheDocument());
    const item = screen.getByTestId('list').children[0];
    await userEvent.click(item);
    expect(navigate).toBeCalledWith('/details/1', { state: { id: 1 } });
  });

  it('card component renders the relevant card data', async () => {
    async () => {
      const handlers = [
        http.get('https://api.punkapi.com/v2/beers/', async () => {
          await delay(150);
          return HttpResponse.json([mockData]);
        }),
      ];

      server = setupServer(...handlers);
      server.resetHandlers();

      render(
        <Provider store={store}>
          <Result />
        </Provider>
      );

      await waitFor(() =>
        expect(screen.getByTestId('list')).toBeInTheDocument()
      );
      const description = screen.getAllByTestId('item-description')[0];
      const name = screen.getAllByTestId('item-name')[0];
      expect((description as HTMLElement).textContent).toEqual(
        'Publish date: description1'
      );
      expect((name as HTMLElement).textContent).toEqual('Title: name1');
    };
  });
});
