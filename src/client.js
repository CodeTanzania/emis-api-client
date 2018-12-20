import axios from 'axios'; //eslint-disable-line

/**
 * Initialize axios library
 *
 * Add headers to HTTP requests that sent to the server
 *
 * @version 0.1.0
 * @since 0.1.0
 */
// eslint-disable-next-line import/prefer-default-export
export const Axios = axios.create({
  baseURL:
    process.env.REACT_APP_EMIS_API_URL ||
    process.env.EMIS_API_URL ||
    'http://emis-plan.herokuapp.com/v1',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
