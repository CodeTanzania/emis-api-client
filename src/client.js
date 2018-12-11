import axios from 'axios'; //eslint-disable-line

/**
 * Initialize axios library
 *
 * Add headers to HTTP requests that sent to the server
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export default function(URL) {
  return axios.create({
    baseURL: URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}
