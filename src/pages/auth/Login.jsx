import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import './Auth.scss';

const Login = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    name: "",
    password: "",
    showPassword: false,
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loginFailed, setLoginFailed, ] = useState(false);
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    if((values.name?.trim()).length > 3 && values.password?.length > 5) setButtonDisabled(false);
    else setButtonDisabled(true);
  }, [values])

  useEffect(() => {
    if(loginFailed){
      setTimeout(() => {
        setLoginFailed(false)
      }, 2000);
    }
  }, [values])

  const handlePasswordChange = (e) => {
    setValues({ ...values, password: e.target.value });
  };

  const handleNameChange = (e) => {
    setValues({ ...values, name: e.target.value });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    // Submit form below
  }


  useEffect(() => {
    // navigate("/auth/register");
  }, [])
  
  return (
    <div className='loginWrapper'>
      <div className="appName_wrapper">
        <h1 className='logo_text'>DEE-M</h1>
        <h1 className='logo_text'>DEE-M</h1>
      </div>
      <div className="login_formWrapper">
        <div className={`login_formContainer ${loginFailed && "shakeLoginForm"} `}>
        <div className="loginTitleContainer">
          <div className="loginTitle">
          <h1 className="login_text">SIGN IN</h1>
        </div>
          </div>
          <TextField
            className="inputField"
            id="outlined-helperText"
            onChange={handleNameChange}
            label="Name"
          />
          <FormControl
            sx={{ m: 1 }}
            className="inputField shiftLeft"
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handlePasswordChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <div className="buttonContainer">
            <Button disabled={buttonDisabled} onClick={handleSubmitForm} variant="contained" color="primary">
              Success
            </Button>
          </div>
          <p className="register_routeText" >Don't have a Account? <Link to="/auth/register" className="route_text">Create an Account</Link></p>
          {loginError && <p className="loginError" >{loginError}</p>}
        </div>
      </div>
    </div>
  )
}

export default Login; 