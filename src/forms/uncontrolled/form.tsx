import { ChangeEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AutoComplete from '../../components/autoComplete/autocomplete';
import './form.css';
import { useDispatch } from "react-redux";
import { saveForm, FormData } from "../../features/formDataSlice";
import { convertFileToBase64, schema } from "../helpers";
import { ValidationError } from "yup";

interface ErrorMessage {
  name?: string,
  age?: string,
  email?: string,
  password?: string,
  confirm?: string
}

export default function Uncontrolled() {
  const selectRef = useRef<HTMLSelectElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef =useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState<ErrorMessage>();
  const [country, setCountry] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [imageError, setImageError] = useState('');

  const backClickHandler = () => {
    navigate(`/`);
  };

  const imageUploadHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
  } else {
    const file = event.target.files[0];
    const fileSize = file.size / 1024 / 1024; // in MiB
    if (fileSize > 2) {
      setImageError('File size exceeds 2 MiB');
    } else {
      setImageError('');
      const uploadedImageBase64 = await convertFileToBase64(file);
      setImageBase64(uploadedImageBase64);
    }
  }
  };

  const autoCompleteSelectHandler = (value: string) => {
    countryRef.current!.value = value;
  };

  const countryChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value);
  }

  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();
  
    const formData: FormData = {
      name: nameRef?.current?.value ?? '',
      age: (ageRef?.current?.value as unknown as number) ?? 0,
      email: emailRef?.current?.value ?? '',
      password: passwordRef?.current?.value ?? '',
      confirm: confirmRef?.current?.value ?? '',
      gender: selectRef?.current?.value ?? '',
      accept: checkboxRef?.current?.value ?? '',
      image: imageBase64,
      country: countryRef?.current?.value ?? ''
    };
    const error: ErrorMessage = {};
    try {
      await schema.validate(formData, {abortEarly: false});
    } catch (err) {
      (err as ValidationError).inner.forEach(({ message, path }) => {
        if (path) {
          error[path as keyof ErrorMessage] = message;
        }
      });
      setErrorMessages(error);
    }
  
     if (Object.keys(error).length > 0 && error.constructor === Object || imageError) {
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
          <input className="input" ref={ageRef} id="age" type="number" />
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
      <div className="input-block">
      <div className="margin flex-row">
        <label htmlFor="image" className="label">Upload image: </label>
        <input type="file" id="image" ref={imageRef} accept="image/png, image/jpeg" onChange={imageUploadHandler}/>
      </div>
      <div className="red">{imageError}</div>
      </div>
      <div className="input-block">
        <div className="flex-row">
          <label htmlFor="country"  className="label">Country: </label>
          <div className="input">
            <input id="country" ref={countryRef} type="text" onChange={countryChangeHandler}/>
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