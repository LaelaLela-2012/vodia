import React, { useRef, useState, useEffect } from 'react';
import "./SignReg.css";
import { Link } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import {Redirect} from 'react-router-dom';
import axiosInstance from '../../interceptors/axios.js';
import { Vodialogo } from "assets/images/";

const SignIn = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [ username, setUsername ] = useState('');
    const [ validUsername, setValidUsername ] = useState(false);

    const [ password, setPassword ] = useState('');
    const [ validPassword, setValidPassword ] = useState(false);
    
    const [redirect , setRedirect ] = useState(false);

    const [validCaptcha, changeValidCaptcha] = useState(null);

    const captcha = useRef(null);

    const onChange = () => {
        if(captcha.current.getValue()) {
		console.log('The user is not a robot');
        changeValidCaptcha(true);
        }
	}

    const [ errMsg, setErrMsg ] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = username;
        setValidUsername(result);
    }, [username])

    useEffect(() => {
        const result = password;
        setValidPassword(result);
    }, [password])

    // useEffect(() => {
    //     console.log(captcha);
    // }, [captcha])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // if button enabled with JS hack
        const v1 = username;
        const v2 = password;
        if (!v1 || !v2) {
            setErrMsg('Invalid Entry');
            return;
        }

        try {
            await axiosInstance.post(`${process.env.REACT_APP_VODIA_API_ENDPOINT}/member/signin`, {
                username, password
            }, {withCredentials: true}).then(function(data) {          
                var data = data.data.data;
        
                console.log(data.member);
        
                localStorage.setItem('token', data.token);
                localStorage.setItem('refresh_token', data.token);
                localStorage.setItem('member_name', data.member.name);
                localStorage.setItem('member', JSON.stringify(data.member));
    
                setRedirect (true);
            });

        } catch (err) {
            if (err.response?.status === 401) {
                setErrMsg('Login Failed!');
            } else {
                setErrMsg('Invalid Username/ Password')
            }
            errRef.current.focus();
        }
    }

    if (redirect ) {
        return <Redirect to="/home" />;
    }

  return (
    <>
        <section>
        <Link to='/' className='center'>
            <img src={Vodialogo} alt="Logo" />
        </Link>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <div className='center'>
            <h1>Sign In</h1>
            <p>Explore our new movies and get the better insight for your life </p>
        </div>
        <form onSubmit={handleSubmit}  action=''>

            {/* username */}
            <label htmlFor='userName'>
                Username:
            </label>
            <input type='text'
            id='username'
            ref={userRef}
            autoComplete='off'
            onChange={(e) => setUsername(e.target.value)}
            required={true}
            aria-describedby='usernamenote'
            placeholder='Username' />
            {/* username End */}

            {/* Password start */}
            <label htmlFor='password'>
                Password:
            </label>
            <input 
            type='password'
            id='password'
            onChange={(e) => setPassword(e.target.value)}
            required={true}
            aria-describedby='passwordnote'
            placeholder='Password' />
            {/* Password End */}

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

            {/* Submit button start */}
            <button disabled={!validUsername || !validPassword || !validCaptcha }>Sign In</button>
            {/* Submit button End */} 
        </form>
        <p>Don't have an Account?<br />
        <span className='line'>
            {/* {put router link here} */}
            <Link to={`/register`}>
                Sign Up
            </Link>
        </span>
        </p>
        </section>
        
    </>
  )
}

export default SignIn;