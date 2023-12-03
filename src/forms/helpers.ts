import * as yup from "yup";
import { InferType } from "yup";

export const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as unknown as string);
      reader.onerror = reject;
    });
  }

export const schema = yup.object().shape({
    country: yup.string(),
    gender: yup.string(),
    accept: yup.string(),
    image: yup.string(),
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
    }),
  });  

  export interface InputSchema extends InferType<typeof schema> {}