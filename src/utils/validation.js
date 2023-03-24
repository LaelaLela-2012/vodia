export const validation = input => {
    const userRegex = /^[A-z][A-z0-9-_]{3,23}$/;
    const usernameRegex = /^[A-z][A-z0-9-_]{3,23}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const phoneRegex = /^\d{10}$/   // eslint-disable-next-line 
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ 
    return input.match(userRegex) || input.match(usernameRegex) || input.match(passwordRegex) || input.match(phoneRegex) || input.match(emailRegex)
}