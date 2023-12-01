import { ChangeEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AutoComplete from '../../components/autoComplete/autocomplete';
import * as yup from "yup";
import './form.css';
import { useDispatch } from "react-redux";
import { saveForm } from "../../features/formDataSlice";

interface ErrorMessage {
  name: string,
  age: string,
  email: string,
  password: string,
  confirm: string
}

export default function Uncontrolled() {
  const selectRef = useRef();
  const checkboxRef = useRef();
  const nameRef = useRef();
  const emailRef =useRef();
  const confirmRef = useRef();
  const passwordRef = useRef();
  const ageRef = useRef();
  const countryRef = useRef();
  const imageRef = useRef();

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState<ErrorMessage>();
  const [country, setCountry] = useState('');


  const schema = yup.object().shape({
    name: yup.string().matches(/^[A-Z]/, "Username should start with uppercase letter"),
    email: yup.string().email(),
    age: yup.number().positive(),
    password: yup.string()
    .matches(/\d/, "Password should contain at least one number")
    .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password ahould contain at least one uppercase and lowercase character")
    .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character"),
    confirm: yup.string().when("password", (password, field) => {
      if (password) {
        return field.required("The passwords do not match").oneOf([yup.ref("password")], "The passwords do not match");
      }
    })
  });

  const backClickHandler = () => {
    navigate(`/`);
  };

  const autoCompleteSelectHandler = (value: string) => {
    countryRef.current.value = value;
  };

  const countryChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value);
  }

  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();
  
    const formData = {
      name: nameRef?.current?.value,
      age: ageRef?.current?.value,
      email: emailRef?.current?.value,
      password: passwordRef?.current?.value,
      confirm: confirmRef?.current?.value,
      gender: selectRef?.current?.value,
      accept: checkboxRef?.current?.value,
      image: imageRef?.current?.value,
      country: countryRef?.current?.value
    };
    const error = {};
    try {
      await schema.validate(formData, {abortEarly: false});
    } catch (err) {
      err.inner.forEach(e => {
       error[e.path] = e.message;
      });
      setErrorMessages(error);
      
    }
  
     if (Object.keys(error).length > 0 && error.constructor === Object) {
      return;
    } else {
      dispatch(saveForm(formData));
      navigate(`/`);
    }
  };

  return (
    <div className="flex">
    <form className="form">
      <div className="input-block">
        <div className="flex-row">
          <label htmlFor="name" className="label">Name: </label>
          <input className="input" ref={nameRef} id="name" type="text" />
        </div>
        <div className="red">{errorMessages?.name}</div>
      </div>
      <div className="input-block">
        <div className="flex-row">
          <label htmlFor="age" className="label">Age: </label>
          <input className="input" ref={ageRef} id="age" type="text" />
        </div>
        <div className="red">{errorMessages?.age}</div>
      </div>
      <div className="input-block">
        <div className="flex-row">
          <label htmlFor="email" className="label">Email: </label>
          <input className="input" ref={emailRef} id="email" type="text" />
        </div>
        <div className="red">{errorMessages?.email}</div>
      </div>
      <div className="input-block">
        <div className="flex-row">
          <label htmlFor="password" className="label">Password: </label>
          <input className="input" ref={passwordRef} id="password" type="password" />
        </div>
        <div className="red">{errorMessages?.password}</div>
      </div>
      <div className="input-block">
        <div className="flex-row">
          <label htmlFor="confirm" className="label">Confirm Password: </label>
          <input className="input" ref={confirmRef} id="confirm" type="password" />
        </div>
        <div className="red">{errorMessages?.confirm}</div>
      </div>
      <div>
      <div className="flex-row">
        <label htmlFor="gender" className="label">Gender: </label>
        <select ref={selectRef} id="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      </div>
      <div className="flex-row">
        <label htmlFor="accept">Accept T&C: </label>
        <input type="checkbox" id="accept" ref={checkboxRef} />
      </div>
      <div className="margin flex-row">
        <label htmlFor="image" className="label">Upload image: </label>
        <input type="file" id="image" ref={imageRef} accept="image/png, image/jpeg" />
      </div>
      <div className="input-block">
        <div className="flex-row">
          <label htmlFor="country"  className="label">Country: </label>
          <div>
            <input className="input" id="country" ref={countryRef} type="text" onChange={countryChangeHandler}/>
            <AutoComplete userInput={country} clickHandler={autoCompleteSelectHandler}/>
          </div>
        </div>
      </div>
      <button type="submit" onClick={handleSubmit} >Submit</button>
    </form>
    <div className="back-button" onClick={backClickHandler}>
      <img src="src/assets/backIcon.png"/>
    </div>
    </div> 
  );
}