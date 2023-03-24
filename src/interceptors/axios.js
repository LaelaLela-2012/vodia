import axios from "axios";


const axiosInstance = axios.create({
    headers: {
        'Accept' : 'application/json'
    }
  });

let refresh = false;

// const savedToken = localStorage.getItem('token');
// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    const savedToken = localStorage.getItem('token');
    console.log('dapet ' + savedToken);
    config.headers.Authorization = savedToken ? `Bearer ${savedToken}` : '';
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

axiosInstance.interceptors.response.use(resp => resp, async error => {
    if (error.response.status === 401 && !refresh) {
        refresh = true;

        const response = await axios.post('/member/refresh-token', {}, {withCredentials: true});

        if (response.status === 200) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data['token']}`;

            return axios(error.config);
        }
    }
    refresh = false;
    return error;
});

export default axiosInstance;
