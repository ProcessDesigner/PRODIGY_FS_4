import axios from'axios'

const BASE_URL = 'http://localhost:5003/api/v1';

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = BASE_URL
axiosInstance.defaults.withCredentials = true
axiosInstance.defaults.headers.common['Cache-Control'] = 'no-cache, no-store, must-revalidate';

export default axiosInstance;