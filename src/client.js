import axios from 'axios'; //eslint-disable-line

/**
 * Initialize axios library
 *
 * Add headers to HTTP requests that sent to the server
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export default axios.create({
  baseURL: process.env.REACT_APP_EMIS_API_URL || process.env.EMIS_API_URL || '',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
