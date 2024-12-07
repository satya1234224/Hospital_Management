import React from "react";
import { TextField, Button, Grid, Typography, Container } from "@mui/material";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAsync } from "../slices/Loginslice";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { Box } from "@mui/system";
import axios from "axios";
import background from './background.jpg';

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values) => {
    // console.log(values);
    try {
        const response= await axios.post ("http://localhost:8080/doctorsignin",values)
        console.log(response.data)
        
        if(response.status===200){
            localStorage.setItem("jwt",response.data.token)
            localStorage.setItem("user",JSON.stringify(response.data.user))
            localStorage.setItem("is_doctor",response.data.user.is_doctor)
            if(response.data.user.is_doctor===true){
                toast.success("login successfully")
                
                navigate("/")
                window.location.reload("true")
            }

        }
        else{
            toast.error("login failed")
        }


    }
    catch(error){
        console.log(error.message)
    }   

    
  };

  const validationSchema = yup.object({
    email: yup.string().required("email must be required"),
    password: yup.string().required("Password must be required"),
  });
  const myStyle = {
    backgroundImage: `url(${background})`,
    height: '70vh',
    margin: 0,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  
  const boxStyle = {
    backdropFilter: 'blur(15px)',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    border: '2px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '15px',
    padding: '30px',
    width: '100%',
    maxWidth: '400px',
  };

  return (
    <div style={myStyle}>
    <Box >
      <Container
        maxWidth="xs"
        style={boxStyle}
      >
        <Typography variant="h4" align="center" gutterBottom>
           Doctor Login
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <Grid sx={{
              
            

            }} container spacing={2}>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  type="text"
                  label="email"
                  variant="outlined"
                  name="email"
                  fullWidth
                />
                <Box

                  sx={{ color: "red" }}
                >
                  <ErrorMessage name="email" />
                </Box>
                
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  type="password"
                  label="Password"
                  variant="outlined"
                  name="password"
                  fullWidth
                />
                <Box sx={{ color: "red" }}>
                  <ErrorMessage name="password" />  
                </Box>
              
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Container>
      </Box>
    </div>
  );
}

export default LoginForm;
