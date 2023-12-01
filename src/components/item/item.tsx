import './item.css';
import { FormData } from '../../features/formDataSlice';

function Item(props: FormData) {
  const { name, age,  email, gender, accept, country } = props;

  return (
    <div className="list-item">
      <div className="title">
        Name: {name} 
      </div>
      <div className="description">
        {age} y.o. Gender: {gender}. Country: {country}
      </div>
      <div className="description">
        Email: {email}
      </div>
      <div className="description">
        Accept: {accept}
      </div>
    </div>
  );
}

export default Item;