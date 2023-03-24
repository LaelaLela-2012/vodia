import React, { useState, useContext, useRef } from "react";
import "./Register.css";
import { Vodialogo } from "assets/images/";
import { TextField } from "@material-ui/core"
import Button from "components/UI/Button/Button"
import ReCAPTCHA from "react-google-recaptcha"
import { useHistory, Link } from "react-router-dom"
import { AuthenticationContext } from 'context/Authentication'
import { validation } from 'utils/validation'


/**
 * The register component, which validates the name, username, email and password
 * fields and uses a controlled form. Uses material UI for the
 * textfields.
 */
const Register = props => {
  const [form, setForm] = useState({
    user: {
      value: '',
      touched: false,
      valid: false
    },

    username: {
      value: '',
      touched: false,
      valid: false
    },

    email: {
      value: '',
      touched: false,
      valid: false
    },

    password: {
      value: '',
      touched: false,
      valid: false
    },

    onSubmitInvalid: false
  })

  const history = useNavigate()
  const authContext = useContext(AuthenticationContext)

  const [validCaptcha, changeValidCaptcha] = useState(null);
  const captcha = useRef(null);

  const inputChangeHandler = event => {
    const { name, value } = event.target;
    if (name === "user") {
      setForm(prevForm => ({
        ...prevForm,
        name: {
          ...prevForm.user,
          value: value, touched: true, valid: value.length > 0 && validation(value)
        }
      }))

    } else if (name === "username") {
      setForm(prevForm => ({
        ...prevForm,
        username: {
          ...prevForm.username,
          value: value, touched: true, valid: value.length > 0 && validation(value)
        }
      }))

    } else if (name === "email") {
      setForm(prevForm => ({
        ...prevForm,
        email: {
          ...prevForm.email,
          value: value, touched: true, valid: value.length > 0 && validation(value)
        }
      }))

    } else if (name === "password") {
      setForm(prevForm => ({
        ...prevForm,
        password: {
          ...prevForm.password, value: value, touched: true,
          valid: value.length >= 4 && value.length <= 60
        }
      }))
    }
  };

  // For setting error spans once any of the fields are touched.
  const fieldBlurHandler = event => {
    if (event.target.name === 'user') {
      if (form.user.value === '') {
        setForm(prevForm => ({
          ...prevForm,
          user: { ...prevForm.user, touched: true }
        }))
      }
    }

    if (event.target.name === 'username') {
      if (form.username.value === '') {
        setForm(prevForm => ({
          ...prevForm,
          username: { ...prevForm.username, touched: true }
        }))
      }
    }

    if (event.target.name === 'email') {
      if (form.email.value === '') {
        setForm(prevForm => ({
          ...prevForm,
          email: { ...prevForm.email, touched: true }
        }))
      }
    }

    if (event.target.name === 'password') {
      if (form.password.value === '') {
        setForm(prevForm => ({
          ...prevForm,
          password: { ...prevForm.password, touched: true }
        }))
      }
    }
  };

  let [userSpan, usernameSpan, emailSpan, passwordSpan] = [null, null];

  if ((!form.user.valid && form.user.touched) || (form.onSubmitInvalid && !form.user.valid)) {
    userSpan = <span>Please enter your Name</span>
  }

  if ((!form.username.valid && form.username.touched) || (form.onSubmitInvalid && !form.username.valid)) {
    usernameSpan = <span>Please enter your username</span>
  }

  if ((!form.email.valid && form.email.touched) || (form.onSubmitInvalid && !form.email.valid)) {
    emailSpan = <span>Please enter a valid email</span>
  }

  if ((!form.password.valid && form.password.touched) || (form.onSubmitInvalid && !form.password.valid)) {
    passwordSpan = <span>Your password must contain between 4 and 60 characters.</span>
  }

  const formSubmitHandler = (event) => {
    event.preventDefault()
    if (!form.user.valid || !form.username.valid || !form.email.valid || !form.password.valid) {
      setForm(prevForm => ({ ...prevForm, onSubmitInvalid: true }))
    } else {
      authContext.register()
      history.push("/browse");
    }
  }

  const onChange = () => {
    if(captcha.current.getValue()) {
  console.log('The user is not a robot');
      changeValidCaptcha(true);
      }
  }

  return (
    <div
      className="Register"
      style={{backgroundColor: 'black'}}
    >
      <div className="RegisterCard">
        <Link to='/'>
      <img src={Vodialogo} alt="Logo" />
        </Link>
        <h1>Sign Up</h1>
        <p>Explore our new movies and get the better insight for your life</p>
        <form onSubmit={formSubmitHandler}>
        <TextField
            name="user"
            className="textField"
            label="Name"
            variant="filled"
            type="text"
            style={{ backgroundColor: "#333" }}
            color="secondary"
            value={form.user.value}
            onChange={inputChangeHandler}
            onBlur={fieldBlurHandler}
            autoComplete="off"
            InputLabelProps={{
              style: { color: "#8c8c8c" }
            }}
          />

          {userSpan}

          <TextField
            name="username"
            className="textField"
            label="Username"
            variant="filled"
            type="text"
            style={{ backgroundColor: "#333" }}
            color="secondary"
            value={form.username.value}
            onChange={inputChangeHandler}
            onBlur={fieldBlurHandler}
            autoComplete="off"
            InputLabelProps={{
              style: { color: "#8c8c8c" }
            }}
          />

          {usernameSpan}

          <TextField
            name="email"
            className="textField"
            label="Email or phone number"
            variant="filled"
            type="text"
            style={{ backgroundColor: "#333" }}
            color="secondary"
            value={form.email.value}
            onChange={inputChangeHandler}
            onBlur={fieldBlurHandler}
            autoComplete="off"
            InputLabelProps={{
              style: { color: "#8c8c8c" }
            }}
          />

          {emailSpan}

          <TextField
            name="password"
            className="textField"
            label="Password"
            variant="filled"
            type="password"
            style={{ backgroundColor: "#333" }}
            color="secondary"
            value={form.password.value}
            onChange={inputChangeHandler}
            onBlur={fieldBlurHandler}
            autoComplete="off"
            InputLabelProps={{
              style: { color: "#8c8c8c" }
            }}
          />

          {passwordSpan}

          {/* recaptcha start */}
          <div className="recaptcha">
              <ReCAPTCHA
                  ref={captcha}
                  // sitekey="6LedGmwiAAAAAMIZ0NBQQWA0pJOMfVaZxzjM1Ez8"
                  sitekey={`${process.env.REACT_APP_SITE_KEY}`}
                  onChange={onChange}
                  theme = 'dark'
              />
          </div>  
          {validCaptcha === false && 
              <div className='error-captcha'>Please Accept the Captcha</div>
          }
          {/* captcha validation end */}

          <Button
            height="45px" width="100%"
            backgroundColor="#e50914"
            textColor="#fff">
            Sign In
          </Button>

        </form>
        <p>Already registered?<br />
        <span className='line'>
            {/* {put router link here} */}
            <Link to={`/login`}>
                Sign In
            </Link>
        </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
