import axios from 'axios'
import store from '../store';
// import TokenService from './tokenservice'

const api_key = " f1a7c8f477145ef3ea4bfe594a5e238e2f1d5bed236101863e0ca3a690dc8e2fde6ed01fad26c1dafe1ec1f0f32a515ad05f7e769b237515488ff327bbb61e60";

const ApiService = {



    init(baseURL) {
        axios.defaults.baseURL = baseURL;
        this.setHeader();
    },

    setHeader() {

        axios.defaults.headers.common["ACCESS_TOKEN"] = store.getters.getUserAccessToken;
        axios.defaults.headers.common["API_KEY"] = api_key;
    },

    removeHeader() {
        axios.defaults.headers.common = {}
    },

    get(resource) {
        return axios.get(resource)
    },

    post(resource, data) {
        return axios.post(resource, data)
    },

    put(resource, data) {
        return axios.put(resource, data)
    },

    delete(resource) {
        return axios.delete(resource)
    },

    /**
     * Perform a custom Axios request.
     *
     * data is an object containing the following properties:
     *  - method
     *  - url
     *  - data ... request payload
     *  - auth (optional)
     *    - username
     *    - password
     **/
    customRequest(data) {
        return axios(data)
    }
}

export default ApiService