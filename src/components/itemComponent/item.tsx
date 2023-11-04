import './item.css';

interface ItemProps {
  uid: number;
  title: string;
  publishedYear: string;
  clickHandler: (id: number) => void;
}

function Item(props: ItemProps) {
  const { uid, title, publishedYear, clickHandler } = props;

  const liClickHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    clickHandler(uid);
  };

  return (
    <li className="item" key={uid} onClick={liClickHandler}>
      <div className="title">Title: {title}</div>
      <div className="description">Publish date: {publishedYear}</div>
    </li>
  );
}

export default Item;
