import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import Search from './search';
import { store } from '../../store';
import { Provider } from 'react-redux';
import { changSearch } from '../../features/searchSlice';

describe('Search', () => {
  it('clicking the Search button saves the entered value to the local storage', async () => {
    const searchValue = 'newSearch';
    const handleSearch = (): void => {
      store.dispatch(changSearch(searchValue));
    };

    render(
      <Provider store={store}>
        <Search onSearch={handleSearch} />
      </Provider>
    );
    await userEvent.click(screen.getByTestId('search-button'));

    expect(
      (screen.getByTestId('search-input') as HTMLInputElement).value
    ).toContain(searchValue);
  });

  it('component retrieves the value from the local storage upon mounting', () => {
    const searchValue = 'newSearch';
    store.dispatch(changSearch(searchValue));

    const handleSearch = (): void => {};

    render(
      <Provider store={store}>
        <Search onSearch={handleSearch} />
      </Provider>
    );
    expect(
      (screen.getByTestId('search-input') as HTMLInputElement).value
    ).toContain(searchValue);
  });
});
