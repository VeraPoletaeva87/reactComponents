import { useNavigate } from 'react-router-dom';
import Item from '../item/item';
import { FormData } from '../../features/formDataSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useEffect, useState } from 'react';
import './home.css';
import { saveCountries } from '../../features/countriesSlice';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

    // set countries list to store
    useEffect(() => {
      fetch('https://countriesnow.space/api/v0.1/countries')
        .then((response) => response.json())
        .then((dataList) => {
          const countryList = dataList.data.map(item => item.country);
          dispatch(saveCountries(countryList));
        });
    }, []);

  return (
    <>
      <div className="flex-row button-block">
        <button className='show-form' onClick={uncontrolledClick}>+ Uncontrolled form</button>
        <button className='show-form' onClick={controlledClick}>+ Controlled form</button>
      </div>
      <div>
        <h3>Submitted form data</h3>
        {items?.map((item: FormData, i: number) => (
          <div className={i === length-1 ? 'border-red list-margin' : 'list-margin'} key={item.name}>
            <Item
              name={item.name}
              age={item.age}
              email={item.email}
              gender={item.gender}
              accept={item.accept}
              country={item.country}
              password={''}
              confirm={''}
              image={item.image}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
