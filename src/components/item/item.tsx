import './item.css';
import { FormData } from '../../features/formDataSlice';
import { useEffect } from 'react';

function Item(props: FormData) {
  const { name, age,  email, gender, accept, image, country } = props;

  useEffect(() => console.log(image), [image]);

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
      <img className='form-image' src={image}/>
    </div>
  );
}

export default Item;