import { Route, Redirect } from 'react-router-dom'

const privateRoute = ({children, ...rest}) => {
    let auth = {'token':false}
    return(
        <Route {...rest}>
            {!auth.token?
            <Redirect to='/login' />
            :
            children}
        </Route>
    )
}

export default privateRoute;