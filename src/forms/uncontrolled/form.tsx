import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

export default function Uncontrolled() {
  const selectRef = useRef();
  const checkboxRef = useRef();
  const nameRef = useRef();
  const emailRef =useRef();
  const confirmRef = useRef();
  const passwordRef = useRef();
  const ageRef = useRef();
  const navigate = useNavigate();
  let messages = {};
  const schema = yup.object().shape({
    username: yup.string().matches(/^[A-Z]/, "Username should staert with uppercase and lowercase character"),
    email: yup.string().email(),
    age: yup.number().positive(),
    password: yup.string()
    .matches(/\d/, "Password should contain at least one number")
    .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password ahould contain at least one uppercase and lowercase character")
    .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character"),
    // confirmPassword: yup.string().when("password", (password, field) => {
    //   if (password) {
    //     return field.required("The passwords do not match").oneOf([yup.ref("password")], "The passwords do not match");
    //   }
    // }),
  });

  const backClickHandler = () => {
    navigate(`/`);
  };

  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();
  
    const formData = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirm: confirmRef.current.value,
      age: ageRef.current.value,
    };
  
    try {
      await schema.validate(formData, {abortEarly: false});
    } catch (err) {
      //messages = err.errors;
      err.inner.forEach(error => {
        messages[error.path] = error.message;
      });
      
      
    }
  
     if (messages.length > 0) {
      return;
    } else {
      navigate(`/`);
    }
  };

  return (
    <>
    <form >
      <label>
        <p>Name:</p>
        <input ref={nameRef} type="text" />
      </label>
      <label>
        <p>Age:</p>
        <input ref={ageRef} type="text" />
      </label>
      <label>
        <p>Email:</p>
        <input ref={emailRef} type="text" />
      </label>
      <label>
        <p>Password:</p>
        <input ref={passwordRef} type="text" />
      </label>
      <label>
        <p>Confirm Password:</p>
        <input ref={confirmRef} type="text" />
      </label>
      <label>
        <p>Gender:</p>
        <select ref={selectRef}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>
      <label>
        accept T&C
        <input type="checkbox" ref={checkboxRef} />
      </label>
      <button type="submit" onClick={handleSubmit} >Submit</button>
    </form>
    <div className="back-button" onClick={backClickHandler}>
      <img src="assets/backIcon.png"/>
    </div>
    </> 
  );
}