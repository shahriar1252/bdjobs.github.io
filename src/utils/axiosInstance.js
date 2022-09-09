import axios from 'axios';
import { decrypt } from './myCrypt';
import { apiRoot } from './fixedRoutes';

const axiosInstance = axios.create({
	baseURL: apiRoot,
	headers: {
		Authorization: `Bearer ${decrypt()}`,
	},
	withCredentials: true,
});

export default axiosInstance;
