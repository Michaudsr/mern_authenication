import axios from 'axios';
import { delete } from '../../../backend/routes/api/users';

// This utility will add the authorized users JWT to the request header
// Any routes that are protected will require the JWT in order to access them

const setAuthToken = token => {
    if (token) {
        // Apply the token to every request header
        axios.defaults.headers.common['Authorization'] = token;
        console.log(axios.defaults.headers.common);
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthToken;