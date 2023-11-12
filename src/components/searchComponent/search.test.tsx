import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import Search from './search';
import { AppContext } from '../../AppContext';

describe('Search', () => {
  it('clicking the Search button saves the entered value to the local storage', async () => {
    const searchValue = 'newSearch';
    const handleSearch = (): void => {
      localStorage.setItem('searchString', searchValue);
    };

    render(<Search onSearch={handleSearch} />);
    await userEvent.click(screen.getByTestId('search-button'));
    expect(localStorage.getItem('searchString')).toEqual(searchValue);
  });

  it('component retrieves the value from the local storage upon mounting', () => {
    const searchValue = 'newSearch';
    localStorage.setItem('searchString', searchValue);

    const handleSearch = (): void => {};

    render(
      <AppContext.Provider
        value={{
          searchString: searchValue,
          setSearchString: () => {},
          items: [],
          setItems: () => {},
        }}
      >
        <Search onSearch={handleSearch} />
      </AppContext.Provider>
    );
    expect(
      (screen.getByTestId('search-input') as HTMLInputElement).value
    ).toContain(searchValue);
  });
});
