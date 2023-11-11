import Result from './result';
import { expect, describe, it, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Result', () => {
  it('renders the correct number of items in the list', () => {
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

    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn(() => Promise.resolve(mockData)),
    });

    render(
      <MemoryRouter initialEntries={['/main']}>
        <Result />
      </MemoryRouter>
    );

    const expectedItemsCount = 5;

    //screen.debug();
    expect(screen.getByRole('Item').children).toBe(expectedItemsCount);
  });
  test('the correct message is displayed if no cards are present'),
    () => {
      const emptyMockData: [] = [];

      const items = vi.fn().mockResolvedValue({
        json: vi.fn(() => Promise.resolve(emptyMockData)),
      });

      global.fetch = items;

      render(<Result />);
      expect(screen.getByTestId('empty-text')).toBeInTheDocument();
    };
});
