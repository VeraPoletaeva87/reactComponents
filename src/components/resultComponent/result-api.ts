export interface ListItem {
  id: number;
  name: string;
  description: string;
}

export const listApi = async (url: string): Promise<ListItem[]> => {
  const response = await fetch(url);
  const items = await response.json();
  return items as ListItem[];
};
