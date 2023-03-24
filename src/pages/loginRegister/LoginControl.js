import React from 'react';
import './loginControl.css';
import { Link } from "react-router-dom";


class LoginControl extends React.Component {

    constructor(props) {
      super(props);
      this.handleLoginClick = this.handleLoginClick.bind(this);
      this.handleLogoutClick = this.handleLogoutClick.bind(this);
      this.state = {isLoggedIn: false};
    }
  
    handleLoginClick() {
      this.setState({isLoggedIn: true});
    }
  
    handleLogoutClick() {
      this.setState({isLoggedIn: false});
    }
  
    render() {
      const isLoggedIn = this.state.isLoggedIn;
      let button;
  
      if (isLoggedIn) {
        button = <LogoutButton onClick={this.handleLogoutClick} />;
      } else {
        button = <LoginButton onClick={this.handleLoginClick} />;
      }
  
      return (
        <div>
          <Greeting isLoggedIn={isLoggedIn} />
          {button}
        </div>
      );
    }
  }
  
  function UserGreeting(props) {
    return <h6 className='hide'>Welcome back!</h6>;
  }
  
  function GuestGreeting(props) {
    return <h6 className='hide'>Please sign up.</h6>;
  }
  
  function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
      return <UserGreeting />;
    }
    return <GuestGreeting />;
  }
  
  function LoginButton(props) {
    return (
      <button onClick={props.onClick} className='loginout'>
        {/* <Link to='/login'>Login</Link> */}
        Login
      </button>
    );
  }
  
  function LogoutButton(props) {
    return (
      <button onClick={props.onClick} className='loginout'>
        Logout
      </button>
    );
  }
  
  export default LoginControl
