import './item.css';

interface ItemProps {
  id: number;
  name: string;
  description: string;
  clickHandler: (id: number) => void;
}

function Item(props: ItemProps) {
  const { id, name, description, clickHandler } = props;

  const liClickHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    clickHandler(id);
  };

  return (
    <li className="item" key={id} onClick={liClickHandler}>
      <div className="title">Title: {name}</div>
      <div className="description">Publish date: {description}</div>
    </li>
  );
}

export default Item;
