import { useHistory } from "react-router-dom";
import Button from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import {useFormik} from "formik";
import * as yup from 'yup';

export const userValidationSchema = yup.object({
   name:yup.string().required("Fill The Name"),
   position:yup.string().required("Fill The Position"),
   YearsOfExperience:yup.number().required("Fill the Position"),
   email:yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,"Pattern Not Matched"),
   phone:yup.number().min(10, "Invalid Phone Number"),
});

export function AddUsers() {

    const {handleSubmit, values, handleChange, handleBlur, touched, errors} = useFormik({
        initialValues:{
            name:"",
            position:"",
            YearsOfExperience:"",
            email:"",
            phone:""},
        validationSchema : userValidationSchema,
        onSubmit:(newUser)=>{
            console.log("onSubmit", newUser)
            addUser(newUser)
        }
        
    })
  const history = useHistory();

  const addUser = (newUser) => {

    fetch("https://61e2dd193050a100176822d2.mockapi.io/users",
      {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then((data) => data.json())
      .then(() => history.push("/"));
  };

  //defining the input items to new useState setValues.
  return (
      
    <form onSubmit={handleSubmit} className="add-movie">
      <Input
        id="name"
        name ="name"
        type="name"
        placeholder="Employee-Name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}  />

      {touched.name && errors.name ? errors.name : ""}

     <Input
        id="position"
        name ="position"
        type="position"
        placeholder="Employee-position"
        value={values.position}
        onChange={handleChange}
        onBlur={handleBlur}  />

      {touched.position && errors.position ? errors.position : ""}

     <Input
        id="YearsOfExperience"
        name ="YearsOfExperience"
        type="YearsOfExperience"
        placeholder="Experience in Years"
        value={values.YearsOfExperience}
        onChange={handleChange}
        onBlur={handleBlur}  />

      {touched.YearsOfExperience && errors.YearsOfExperience ? errors.YearsOfExperience : ""}

     <Input
        id="email"
        name ="email"
        type="email"
        placeholder="Employee-email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}  />

     {touched.email && errors.email ? errors.email : ""}

     <Input
        id="phone"
        name ="phone"
        type="phone"
        placeholder="Employee-phone"
        value={values.phone}
        onChange={handleChange}
        onBlur={handleBlur}  />

     {touched.phone && errors.phone ? errors.phone : ""}

  
        <Button
         type ="submit"
          variant="outlined"
          color="success" >   
          Add-User
        </Button>
 
    </form>
  
  );
}
