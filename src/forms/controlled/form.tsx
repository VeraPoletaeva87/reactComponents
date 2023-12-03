import { useForm, SubmitHandler } from "react-hook-form";
import '../uncontrolled/form.css';
import AutoComplete from "../../components/autoComplete/autocomplete";
import { ChangeEvent, useState } from "react";
import { convertFileToBase64, schema, InputSchema } from "../helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveForm, FormData } from "../../features/formDataSlice";

export default function Controlled() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<InputSchema>({ mode: 'all', resolver: yupResolver<InputSchema>(schema) })

  const [country, setCountry] = useState('');
  const [imageError, setImageError] = useState('');
  const [imageBase64, setImageBase64] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    setValue('country', value); 
  };

  const countryChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value);
  }

  const onSubmit: SubmitHandler<InputSchema> = (data, e) => {
    e?.preventDefault();
  
    const formData: FormData = {
      name: data.name ?? '',
      age: data.age ?? 0,
      email: data.email ?? '',
      password: data.password ?? '',
      confirm: data.confirm ?? '',
      gender: data.gender ?? '',
      accept: (data.accept ?? false).toString(),
      image: imageBase64,
      country: data.country ?? ''
    };

     if (Object.keys(errors).length > 0 || imageError) {
      return;
    } else {
      dispatch(saveForm(formData));
      navigate(`/`);
    }
  };

  return (
    <div className="flex">
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-block">
        <div className="flex-row">
          <label htmlFor="name" className="label">Name</label>
          <input {...register("name")} id="name" className="input"/>
        </div>
        <p className="red">{errors.name?.message}</p>
      </div>
      <div className="input-block">
        <div className="flex-row">
          <label className="label">Age</label>
          <input {...register("age")} className="input" type="number" />
        </div>
        <p className="red">{errors.age?.message}</p>
      </div>
      <div className="input-block">
        <div className="flex-row">
          <label className="label">Email</label>
          <input {...register("email")} className="input"/>
        </div> 
        <p className="red">{errors.email?.message}</p>
      </div>
      <div className="input-block">
        <div className="flex-row">
          <label htmlFor="password" className="label">Password: </label>
          <input {...register("password")} id="password" type="password" className="input"/>
        </div>
        <p className="red">{errors.password?.message}</p>
      </div>
      <div className="input-block">
        <div className="flex-row">
          <label htmlFor="confirm" className="label">Confirm Password: </label>
          <input {...register("confirm")} id="confirm" type="password" className="input"/>
        </div>
        <p className="red">{errors.confirm?.message}</p>
      </div>  
      <div className="flex-row">
        <label htmlFor="gender" className="label">Gender: </label>
        <select {...register("gender")} id="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className="flex-row">
        <label htmlFor="accept">Accept T&C: </label>
        <input type="checkbox" id="accept" {...register("accept")} />
      </div>
      <div className="input-block">
      <div className="margin flex-row">
        <label htmlFor="image" className="label">Upload image: </label>
        <input type="file" id="image" {...register("image")} accept="image/png, image/jpeg" onChange={imageUploadHandler}/>
      </div>
      <p className="red">{imageError}</p>
      </div>
      <div className="input-block">
        <div className="flex-row">
          <label htmlFor="country"  className="label">Country: </label>
          <div className="input">
            <input id="country" {...register("country")} type="text" onChange={countryChangeHandler}/>
            <AutoComplete userInput={country} clickHandler={autoCompleteSelectHandler}/>
          </div>
        </div>
      </div>
      <input type="submit"/>
    </form>
    </div>
  )
}