// External Dependencies
import { identity, pickBy } from 'lodash';

export const parseURL = () => {
  // Extract the path list from the pathname
  const path = window.location.href.split('#/')[1];

  // Extract the current route and routes
  return path.split('/').reverse();
};

/**
 * Method to parse URL for props
 * @returns {Object} -- Object containing keys for the project and organization
 */
export const propsFromURL = () =>
  pickBy(
    window.location.hash
      .split('/')
      .filter(part => part !== '#')
      .reduce((result, part, i, parts) => {
        return {
          ...result,
          org: parts[0],
          proj: parts[1],
        };
      }, {}),
    identity
  );

/**
 * Method to parse props from the URL to populate the store
 * @param {Object} props -- Props to interrogate for URL props
 */
export const extractProps = ({ orgs, projects }) => {
  // Get the Props from the URL
  const { org, proj } = propsFromURL();

  // Get the Organization that was loaded
  const [organization] = orgs.filter(o => o.slug === org);
  const [project] = projects.filter(p => p.slug === proj);

  // Return the extracted props
  return {
    organization: organization || orgs[0],
    project: project || {},
  };
};

/**
 * Parse the first and last name into intials
 * @param {string} firstName -- First name string
 * @param {string} lastName -- Last name string
 */
export const initials = (firstName, lastName) => `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;

/**
 * Method to determine an empty layout on a screen
 * @param {array} structure -- The screen component structure
 */
export const emptyLayout = structure => !structure?.length || !structure.filter(component => component.componentType === 'layout')?.length;

/**
 * Method to recursively find the nearest parent ID
 * @param {Object} element -- HTML Element to search
 */
export const findParent = element => {
  if (!element.id) {
    return findParent(element.parentElement);
  }

  return element.id;
};
