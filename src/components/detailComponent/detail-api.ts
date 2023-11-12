export interface BookItem {
  name: string;
  description: string;
  tagline: string;
}

export const beerApi = async (id: unknown): Promise<BookItem> => {
  const Url = `https://api.punkapi.com/v2/beers/?ids=${id}`;
  const response = await fetch(Url);
  const items = await response.json();
  return items[0] as BookItem;
};
