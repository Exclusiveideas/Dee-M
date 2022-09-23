import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import './Auth.scss';
import Snackbar from '@mui/material/Snackbar';
import { login } from '../../redux/apiCalls';
import { clearError } from '../../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    password: "",
    showPassword: false,
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loginFailed, setLoginFailed, ] = useState(false);
  const isLoading = useSelector((state) => state.user.isLoading);
  const error = useSelector((state) => state.user.error);
  const errorMessage = useSelector((state) => state.user.errorMessage);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const dispatch = useDispatch();

  // routes to the home page when there's a user
  useEffect(() => {
    if(currentUser) {
      setOpenSnackbar(true)
      setTimeout(() => {
        setOpenSnackbar(false)
        navigate("/");
      }, 1500); 
    }
  }, [currentUser]);

  useEffect(() => {
    if(loginFailed){
      setTimeout(() => {
        setLoginFailed(false)
      }, 2000);
    }
  }, [values, loginFailed])

  useEffect(() => {
    if ((values.name?.trim()).length > 3 && values.password?.length > 5)
      setButtonDisabled(false);
    else setButtonDisabled(true);
  }, [values]);

  // clears error when components mounts/ re-renders
  useLayoutEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  // disables button when loading
  useLayoutEffect(() => {
    if (isLoading) setButtonDisabled(true);
    else setButtonDisabled(false);
  }, [isLoading]);

  const shakeIfValid = () => {
    if (error) {
      setLoginFailed (true);

      setTimeout(() => {
        setLoginFailed(false);
      }, 2000);
    }
  };

  useEffect(() => {
    shakeIfValid();
  }, [error]);

  // clears error when input is focused
  const onInputFocus = () => {
    dispatch(clearError());
  };

  const handleFormChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

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
    if (!values.name || !values.password) return;

    const user = {
      username: values.name,
      password: values.password,
    };
    // Submit form below
    login(dispatch, user);
    shakeIfValid();
  }

  const closeSnackbar = () => {
    setOpenSnackbar(false);
  };

  
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
            onChange={handleFormChange}
            label="Name"
            name="name"
            onFocus={onInputFocus}
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
              onChange={handleFormChange}
              onFocus={onInputFocus}
              name="password"
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
              Log In
            </Button>
          </div>
          <p className="register_routeText" >Don't have a Account? <Link to="/auth/register" className="route_text">Create an Account</Link></p>
          {error && <p className="loginError">{errorMessage}</p>}
        </div>
      </div>
      <Snackbar open={openSnackbar} autoHideDuration={1500} onClose={closeSnackbar}>
        <Alert onClose={closeSnackbar} severity="success" sx={{ width: '100%' }}>
          Login successfully!
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Login; 