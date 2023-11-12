import { createContext } from 'react';

interface Item {
  id: number;
  name: string;
  description: string;
}

export interface AppContextType {
  searchString: string;
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

export const AppContext = createContext<AppContextType>({
  searchString: '',
  setSearchString: () => {},
  items: [],
  setItems: () => {},
});
