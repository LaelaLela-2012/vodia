import React, { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SignReg.css";
import { Link } from 'react-router-dom';
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { Vodialogo } from "assets/images/";


const NAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PASSWORD_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;


const SignUp = () => {
    const userRef = useRef();
    const errRef = useRef();

    
    const [ name, setName ] = useState('');
    const [ validName, setValidName ] = useState(false);
    const [ nameFocus, setNameFocus ] = useState(false);

    const [ username, setUsername ] = useState('');
    const [ validUsername, setValidUsername ] = useState(false);
    const [ usernameFocus, setUsernameFocus ] = useState(false);

    const [ email, setEmail ] = useState('');
    const [ validEmail, setValidEmail ] = useState(false);
    const [ emailFocus, setEmailFocus ] = useState(false);

    const [ password, setPassword ] = useState('');
    const [ validPassword, setValidPassword ] = useState(false);
    const [ passwordFocus, setPasswordFocus ] = useState(false);

    const [ matchPassword, setMatchPassword ] = useState('');
    const [ validMatch, setValidMatch ] = useState(false);
    const [ matchFocus, setMatchFocus ] = useState(false);

    const [validCaptcha, changeValidCaptcha] = useState(null);
    const [changeValidUser] = useState(false);

    const captcha = useRef(null);

    const onChange = () => {
        if(captcha.current.getValue()) {
		console.log('The user is not a robot');
        changeValidCaptcha(true);
        }
	}

    const [ errMsg, setErrMsg ] = useState('');
    const [ success, setSuccess ] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = NAME_REGEX.test(name);
        console.log(result);
        console.log(name);
        setValidName(result);
    }, [name])

    useEffect(() => {
        const result = USERNAME_REGEX.test(username);
        console.log(result);
        console.log(username);
        setValidUsername(result);
    }, [username])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const result = PASSWORD_REGEX.test(password);
        console.log(result);
        console.log(password);
        setValidPassword(result);
        const match = password === matchPassword;
        setValidMatch(match);
    }, [password, matchPassword])

    useEffect(() => {
        console.log(captcha);
    }, [captcha])

    useEffect(() => {
        setErrMsg('');
    }, [name, username, email, password, matchPassword, captcha])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = NAME_REGEX.test(name);
        const v2 = USERNAME_REGEX.test(username);
        const v3 = EMAIL_REGEX.test(email);
        const v4 = PASSWORD_REGEX.test(password);
        if (!v1 || !v2 || !v3 || !v4) {
            setErrMsg('Invalid Entry');
            return;
        }
        // console.log(user, email, pwd)
        // setSuccess(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_VODIA_API_ENDPOINT}/member/signup`,
                JSON.stringify({ name, username, email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response.data);
            console.log(response.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            // clear input fields
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }

        // We validate the form inputs
		// if they are correct we can send the form, update the interface, etc.

		if(captcha.current.getValue()){
            console.log('The user is not a Robot');
            changeValidUser(true);
            changeValidCaptcha(true);
            } else {
                console.log('please accept the captcha');
                changeValidUser(false);
                changeValidCaptcha(false);
            }

        await axios.post('/member/signup', {
            name, username, email, password
        });

    }

  return (
    <>
    {success ? (
        <section>
            <h1>Success!</h1>
            <p>
            <Link to={`/signin`}>
            Please Check email to activated your Account!
            </Link>
            </p>
        </section>
    ) :(
        <section>
            <Link to='/'>
      <img src={Vodialogo} alt="Logo" />
        </Link>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <div className='center'>
            <h1>Sign Up</h1>
            <p>Explore our new movies and get the better insight for your life </p>
        </div>
        <form onSubmit={handleSubmit}  action=''>
            {/* name */}
            <label htmlFor='name'>
                Name:
                <span className={validName ? 'valid' : 'hide'}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validName || !name ? 'hide' : 'invalid'}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </label>
            <input type='text'
            id='name'
            autoComplete='off'
            onChange={(e) => setName(e.target.value)} required
            aria-invalid={validName ? 'false' : 'true'}
            aria-describedby='namenote'
            onFocus={() => setNameFocus(true)}
            onBlur={() => setNameFocus(false)}
            placeholder='Name' />
            <p id='namenote' className={nameFocus && name && !validName ? 'instructions' : 'offscreen'}>
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.<br />
                Must begin with a letter.<br />
                Letters, numbers, underscores, hypens allowed.
            </p>
            {/* name End */}

            {/* username */}
            <label htmlFor='userName'>
                Username:
                <span className={validUsername ? 'valid' : 'hide'}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validUsername || !username ? 'hide' : 'invalid'}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </label>
            <input type='text'
            id='username'
            ref={userRef}
            autoComplete='off'
            onChange={(e) => setUsername(e.target.value)} required
            aria-invalid={validUsername ? 'false' : 'true'}
            aria-describedby='usernamenote'
            onFocus={() => setUsernameFocus(true)}
            onBlur={() => setUsernameFocus(false)}
            placeholder='Username' />
            <p id='usernamenote' className={usernameFocus && username && !validUsername ? 'instructions' : 'offscreen'}>
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.<br />
                Must begin with a letter.<br />
                Letters, numbers, underscores, hypens allowed.
            </p>
            {/* username End */}

            {/* Email start */}
            <label htmlFor='email'>
                Email:
                <span className={validEmail ? 'valid' : 'hide'}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validEmail || !email ? 'hide' : 'invalid'}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </label>
            <input 
            type='email'
            id='email'
            onChange={(e) => setEmail(e.target.value)} required
            aria-invalid={validEmail ? 'false' : 'true'}
            aria-describedby='emailnote'
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            placeholder='Email' />
            <p id="emailnote" className={emailFocus && !validEmail ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Email must be a valid email<br />
                Must include uppercase and lowercase letters, a number and a special character.<br />
                Must include @ and .com/.co.id
            </p>
            {/* Email End */}

            {/* Password start */}
            <label htmlFor='password'>
                Password:
                <span className={validPassword ? 'valid' : 'hide'}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validPassword || !password ? 'hide' : 'invalid'}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </label>
            <input 
            type='password'
            id='password'
            onChange={(e) => setPassword(e.target.value)} required
            aria-invalid={validPassword ? 'false' : 'true'}
            aria-describedby='passwordnote'
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
            placeholder='Password' />
            <p id="passwordnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters.<br />
                Must include uppercase and lowercase letters, a number and a special character.<br />
                Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
            </p>
            {/* Password End */}

            {/* Confirm Password start */}
            <label htmlFor='confirm_password'>
                Confirm Password:
                <span className={validMatch && matchPassword ? 'valid' : 'hide'}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validMatch || !matchPassword ? 'hide' : 'invalid'}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </label>
            <input 
            type='password'
            id='confirm_pwd'
            onChange={(e) => setMatchPassword(e.target.value)} required
            aria-invalid={validMatch ? 'false' : 'true'}
            aria-describedby='confirmnote'
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
            placeholder='Confirm Password' />
            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field!
                </p>
            {/* Confirm Password End */}

            {/* recaptcha start */}
            <div className="recaptcha">
                <ReCAPTCHA
                    ref={captcha}
                    sitekey={`${process.env.REACT_APP_SITE_KEY}`}
                    onChange={onChange}
                    theme = 'dark'
                />
            </div>      
            {validCaptcha === false && 
                <div className='error-captcha'>Please Accept the Captcha</div>
            }
            {/* captcha validation end */}

            {/* Submit button start */}
            <button disabled={!validName || !validUsername || !validEmail || !validPassword || !validMatch ? true : false || !validCaptcha }>Sign Up</button>
            {/* Submit button End */} 
        </form>
        <p>Already registered?<br />
        <span className='line'>
            {/* {put router link here} */}
            <Link to={`/login`}>
                Sign In
            </Link>
        </span>
        </p>
        </section>
        )}
    </>
  )
}

export default SignUp;