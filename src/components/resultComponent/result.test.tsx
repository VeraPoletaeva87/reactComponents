import Result from './result';
import { expect, describe, it, test, vi, beforeEach, Mock } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { listApi } from './result-api';
import { useContext } from 'react';
import { AppContext } from '../../AppContext';

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

vi.mock('./result-api', async () => {
  return {
    listApi: vi.fn(),
  };
});

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

beforeEach(() => {
  (useNavigate as Mock).mockReturnValue(navigate);
});

describe('Result', () => {
  it('renders the correct number of items in the list', async () => {
    (listApi as Mock).mockReturnValue(Promise.resolve(mockData));
    const contextValue = {
      searchString: '',
      setSearchString: vi.fn(),
      items: mockData,
      setItems: vi.fn(),
    };

    (useContext as Mock).mockReturnValue(contextValue);

    render(
      <MemoryRouter initialEntries={['/main']}>
        <AppContext.Provider value={contextValue}>
          <Result />
        </AppContext.Provider>
      </MemoryRouter>
    );

    const expectedItemsCount = 5;
    await waitFor(() => expect(screen.getByTestId('list')).toBeInTheDocument());
    const listItems = screen.getByTestId('list').children;
    expect(listItems.length).toEqual(expectedItemsCount);
  });

  test('the correct message is displayed if no cards are present'),
    async () => {
      (listApi as Mock).mockReturnValue(Promise.resolve([]));

      render(<Result />);
      await waitFor(() =>
        expect(screen.getByTestId('empty-text')).toBeInTheDocument()
      );
      expect(screen.getByTestId('empty-text')).toBeInTheDocument();
    };

  it('clicking on a card opens a detailed card component', async () => {
    (listApi as Mock).mockReturnValue(Promise.resolve(mockData));

    render(<Result />);

    await waitFor(() => expect(screen.getByTestId('list')).toBeInTheDocument());
    const item = screen.getByTestId('list').children[0];
    await userEvent.click(item);
    expect(navigate).toBeCalledWith('/details/1', { state: { id: 1 } });
  });

  it('card component renders the relevant card data', async () => {
    (listApi as Mock).mockReturnValue(Promise.resolve(mockData));

    render(<Result />);
    await waitFor(() => expect(screen.getByTestId('list')).toBeInTheDocument());
    const description = screen.getAllByTestId('item-description')[0];
    const name = screen.getAllByTestId('item-name')[0];
    expect((description as HTMLElement).textContent).toEqual(
      'Publish date: description1'
    );
    expect((name as HTMLElement).textContent).toEqual('Title: name1');
  });
});
