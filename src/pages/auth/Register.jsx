import React, { useState } from "react";
import "./Auth.scss";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from '@mui/material/Snackbar';
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
import { useEffect } from "react";
import { register } from "../../redux/apiCalls";
import { clearError } from "../../redux/userSlice";
import { useLayoutEffect } from "react";
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    password: "",
    showPassword: false,
    gender: "Male",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [registrationFailed, setRegistrationFailed] = useState(false);
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
    if ((values.name?.trim()).length > 3 && values.password?.length > 5)
      setButtonDisabled(false);
    else setButtonDisabled(true);
  }, [values]);

  // clears error when components mounts/ re-renders
  useLayoutEffect(() => {
    dispatch(clearError());
  }, []);

  // disables button when loading
  useLayoutEffect(() => {
    if (isLoading) setButtonDisabled(true);
    else setButtonDisabled(false);
  }, [isLoading]);

  const shakeIfValid = () => {
    if (error) {
      setRegistrationFailed(true);

      setTimeout(() => {
        setRegistrationFailed(false);
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

  const handlePasswordChange = (e) => {
    setValues({ ...values, password: e.target.value });
  };

  const handleNameChange = (e) => {
    setValues({ ...values, name: e.target.value });
  };

  const handleGenderChange = (e) => {
    setValues({ ...values, gender: e.target.value });
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
    let formGender =
      values.gender === "Prefer not to say" ? "void" : values.gender;
    if (!values.name || !values.password || !formGender) return;

    const user = {
      name: values.name,
      password: values.password,
      gender: formGender,
    };
    // Submit form below
    register(dispatch, user);
    shakeIfValid();
  };

  const closeSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };


  return (
    <div className="registerWrapper">
      <div className="appName_wrapper">
        <h1 className="glitch" data-text="DEE-M">
          DEE-M
        </h1>
      </div>
      <div className="form_wrapper">
        <div className={`form_container ${registrationFailed && "shakeForm"} `}>
          <div className="registerTitleContainer">
            <div className="regiterTitle">
              <h1 className="register_text">SIGN UP</h1>
            </div>
          </div>
          <TextField
            className="inputField"
            id="outlined-helperText"
            onChange={handleNameChange}
            label="Name"
            onFocus={onInputFocus}
            helperText={
              values.name?.length <= 3 &&
              "Name must be greater than 3 characters"
            }
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
              onFocus={onInputFocus}
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
            {values.password?.length <= 5 && (
              <FormHelperText>
                Password must be greater than 5 characters
              </FormHelperText>
            )}
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }} className="shiftLeft">
            <InputLabel id="demo-simple-select-helper-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={values.gender}
              label="Gender"
              onChange={handleGenderChange}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
            </Select>
          </FormControl>
          <div className="buttonContainer">
            <Button
              disabled={buttonDisabled}
              onClick={handleSubmitForm}
              variant="contained"
              color="primary"
            >
              Register
            </Button>
          </div>
          <p className="login_routeText">
            Already have a Account?{" "}
            <Link to="/auth" className="route_text">
              Log In
            </Link>
          </p>
          {error && <p className="registrationError">{errorMessage}</p>}
        </div>
      </div>
      <Snackbar open={openSnackbar} autoHideDuration={1500} onClose={closeSnackbar}>
        <Alert onClose={closeSnackbar} severity="success" sx={{ width: '100%' }}>
          Account created!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Register;
