import axios from "axios";
// config
import { HOST_API_KEY } from "src/config";

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API_KEY });

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => Promise.reject((error.response && error.response.data) || error || "Something went wrong")
);

export default axiosInstance;
