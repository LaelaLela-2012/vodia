import React, { useContext, useState, useEffect } from 'react'
import NavBar from 'containers/NavBar/NavBar'
import { useHistory } from "react-router-dom";
import { AuthenticationContext } from 'context/Authentication'
import useDropdown from './useDropdown'
import ProfileCard from 'components/UI/ProfileCard/ProfileCard'
import { NavLink, Link } from 'react-router-dom'
import LoginControl from '../pages/loginRegister/LoginControl'
import { Profile } from '../assets/images/index'

const UseNavbar = () => {
    const logoutHandler = () => {
        // localStorage.removeItem('profileSelected')
        localStorage.removeItem('token')
        authContext.logout()
        history.push('/')
    }

    const [name, setName] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [token, setToken] = useState('');

    const center = {
        textAlign: 'center'
    }
    
    const logout = async () => {
        await axiosInstance.post('/member/signout', {}, {withCredentials: true});
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('member_name');
        localStorage.removeItem('member');
        setRedirect(true);
    }

    useEffect(() => {
        setName(localStorage.getItem('member_name'));
        setToken(localStorage.getItem('token'));
    }, [token]);

    const profileDropdownContent = (
        <>
            {/* <ProfileCard
                profileImage={Profile}
                username="Pushpa"
                dropdown
            /> */}
            <span style={center}>- Hi, {name} -</span>
            <span style={{ borderTop: '1px solid grey', textAlign:'center' }}>Manage Profiles</span>
            <span style={center}>Account</span>
            <span style={center}>Help Center</span>
            <span style={center}>
                <Link to={`/`}>
                    <a href="javascript:void(0)" onClick={logoutHandler}>
                    Logout
                    </a>
                </Link>
            </span>
        </>
    )
    const style = {
        display: 'none'
    }

    const navLinks = (
        <>
            <NavLink className="inactive" activeClassName="active" to="/" exact>Home</NavLink>
            <NavLink className="inactive" activeClassName="active" to="/tv" exact>TV Shows</NavLink>
            <NavLink className="inactive" activeClassName="active" to="/movies" exact>Movies</NavLink>
            {/* navbar after login */}
            <NavLink className="inactive" style={style} activeClassName="active" to="/home" exact>Home</NavLink>
            <NavLink className="inactive" style={style} activeClassName="active" to="/tvAuth" exact>TV Shows</NavLink>
            <NavLink className="inactive" style={style} activeClassName="active" to="/moviesAuth" exact>Movies</NavLink>
        </>
    )

    const profileDropdown = useDropdown(profileDropdownContent,
        { top: '42px', right: '0px', width: '20vh', height: 'auto' })

    const navDropdown = useDropdown(navLinks,
        { top: '15px', width: '100px' })

    const authContext = useContext(AuthenticationContext)
    const history = useHistory()

    return (
        <NavBar navigation profileDropdown={profileDropdown}
            navDropdown={navDropdown} />
    )
}

export default UseNavbar