import { useHistory } from "react-router-dom";
import Button from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import {useFormik} from "formik";

import { userValidationSchema } from "./AddUsers";

export function EditUsers() {
  const { id } = useParams();
  // const user = users[id];
  const [user, setUser] = useState(null);
  const getUsers = () => {
    fetch(`https://61e2dd193050a100176822d2.mockapi.io/users/${id}`,
      { method: "GET" }
    )
      .then((data) => data.json())
      .then((us) => setUser(us));
  };

  useEffect(getUsers, []);

  return user ? <UpdateUser user={user} /> : "";
}
function UpdateUser({ user }) {

  const history = useHistory();

  const {handleSubmit, values, handleChange, handleBlur, touched, errors} = useFormik({
    initialValues:user,
    validationSchema : userValidationSchema,
    onSubmit:(updateUser)=>{
        console.log("onSubmit", updateUser)
        editUser(updateUser)
    }
    
})

  const editUser = (updateUser) => {
    
    //add the new edited value to the remainng user and deleting the old user
    fetch(`https://61e2dd193050a100176822d2.mockapi.io/users/${user.id}`, {
      method: "PUT",
      body: JSON.stringify(updateUser),
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then((data) => data.json())
      .then(() => history.push("/"));

  };

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
          Edit-User
        </Button>
 
    </form>
  );
}
