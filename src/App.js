import React, { useContext } from "react";
import "./App.css"; 
import Browse from 'containers/Browse/Browse'
import { Switch, Route } from "react-router-dom";
import { AuthenticationContext } from 'context/Authentication'
import NotFoundPage from 'components/StaticPages/NotFoundPage/NotFoundPage'
import Play from "Play";
import { CookiePreferences, ContactUs, Login, Register, Privacy, TermCondition, LegalNotices, SignIn, SignUp } from './pages';
import PrivateRoute from "containers/Browse/routes/PrivateRoute";
import { HomeAuth } from "containers/Browse/routes";
import { render } from "react-dom";
import PublicRoute from "containers/Browse/routes/PublicRoute";


localStorage.setItem('profileSelected', true);

export default function App() {
  const authContext = useContext(AuthenticationContext)

  const checkAuthAndSetBrowseComponent = (propsObject) => {
    return (authContext.authenticated || localStorage.getItem('profileSelected')) ?
      <Browse {...propsObject} /> :
      <Browse {...propsObject} />
  }

  return (
    <div className="App">
      <Switch>
        <PublicRoute exact path="/" component={() => checkAuthAndSetBrowseComponent({ route: '/browse' })} />
        <PublicRoute exact path="/tv" component={() => checkAuthAndSetBrowseComponent({ route: '/browse/tv' })} />
        <PublicRoute exact path="/movies" component={() => checkAuthAndSetBrowseComponent({ route: '/browse/movies' })} />
        <PrivateRoute exact path="/home" component={() => checkAuthAndSetBrowseComponent({ route: '/browse/home' })} />
        <PrivateRoute exact path="/tvAuth" component={() => checkAuthAndSetBrowseComponent({ route: '/browse/tvAuth' })} />
        <PrivateRoute exact path="/moviesAuth" component={() => checkAuthAndSetBrowseComponent({ route: '/browse/moviesAuth' })} />
        <PublicRoute exact path="/play/:id" component={Play} />
        <PublicRoute exact path="/search" component={() => checkAuthAndSetBrowseComponent({ route: '/search' })} />
        <PublicRoute exact path="/login" component={SignIn} />
        <PublicRoute exact path="/register" component={SignUp} />
        <Route path='/cookie-preferences' component={CookiePreferences} />
        <Route path='/contact-us' component={ContactUs} />
        <Route path='/privacy' component={Privacy} />
        <Route path='/terms-and-conditions' component={TermCondition} />
        <Route path='/legal-notices' component={LegalNotices} />
        <PublicRoute exact path="/" component={() => checkAuthAndSetBrowseComponent({ route: '/browse' })} />
        <PublicRoute exact component={NotFoundPage} />
      </Switch>
    </div >
  );
}
