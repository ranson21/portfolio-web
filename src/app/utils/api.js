// External Dependencies
import { ajax } from 'rxjs/ajax';

/**
 * Wrapper to send a GET request to a given resource endpoint
 * @param {string} resource -- The resource to request
 */
export const getResource = resource => {
  return ajax.get(`${process.env._SERVER}/${resource}`);
};
