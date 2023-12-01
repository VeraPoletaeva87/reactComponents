import { useNavigate } from 'react-router-dom';
import Item from '../item/item';
import { FormData } from '../../features/formDataSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useEffect, useState } from 'react';
import './home.css';

function Home() {
  const navigate = useNavigate();
  const items = useSelector((state: RootState) => state.formData.value);
  const [length, setLength] = useState(0);

  const uncontrolledClick = () => {
    navigate(`/uncontrolled`);
  };

  const controlledClick = () => {
    navigate(`/controlled`);
  };

  useEffect(() => {
    setLength(items.length);
  }, [items]);

  return (
    <>
      <div className="flex-row button-block">
        <button className='show-form' onClick={uncontrolledClick}>+ Uncontrolled form</button>
        <button className='show-form' onClick={controlledClick}>+ Controlled form</button>
      </div>
      <div>
        <h3>Submitted form data</h3>
        {items?.map((item: FormData, i: number) => (
          <div className={i === length-1 ? 'border-red list-margin' : 'list-margin'}>
            <Item
              name={item.name}
              age={item.age}
              email={item.email}
              gender={item.gender}
              accept={item.accept}
              country={item.country}
              password={''}
              confirm={''}
              image={''}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
