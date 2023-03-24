import axios from 'axios';

const token = localStorage.getItem('token');

const baseAxios = axios.create({ 
    baseURL: 'https://api.vodia.id/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    }
});

export default baseAxios;