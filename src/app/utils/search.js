// External Dependencies
import { pick, omitBy, isEmpty } from 'lodash';

// Local Dependencies
import { formatDisplayName } from 'app/utils/format';

// Constants
import { AVAILABLE_LIBRARIES, COMMON_GROUPS, ADVANCED_GROUPS } from 'app/config/constants';

/**
 * Method to search an array for a search string
 * @param {array} list -- The input list to search
 */
export const search = (list, options) => {
  // Apply a key-based filter if the list is full of objects
  if (typeof list[0] === 'object') {
    return list.filter(item => item[options.key]?.includes(options.value));
  }

  // Apply a fuzzy string match filter if the list type is strings
  if (typeof list[0] === 'string') {
    return list.filter(item => item.toLowerCase().includes(options.value.toLowerCase()));
  }

  // Handle search object of arrays
  if (typeof list === 'object') {
    return omitBy(
      Object.keys(list).reduce(
        (result, key) => ({
          ...result,
          [key]: list[key]?.filter(item => item[options.key]?.toLowerCase()?.includes(options.value.toLowerCase())),
        }),
        {}
      ),
      isEmpty
    );
  }

  // Default to filter based on item inclusion
  return list.filter(item => item === options.value);
};

/**
 * FindLicense -- Returns the first available License ID for the specified role
 * @param {array} licenses -- The list of available licenses
 * @param {string} role -- The selected license role
 * @returns {string} -- The first available License ID
 */
export const findLicense = (licenses, role) => {
  const [license] = licenses.filter(license => !license.assignedTo).filter(license => license?.role === role);

  return license?.uid;
};

/**
 * FindMember -- Locates the member based on display name
 * @param {array} members -- The list of members
 * @param {string} name -- The name of the member to locate
 * @returns {object} -- The member from the members array
 */
export const findMember = (members, name) => {
  // Handle empty members
  if (!members?.length) {
    return false;
  }

  // Find the member by name
  const [member] = members.filter(member => formatDisplayName(member.displayName) === name);

  // Return the located member
  return member;
};

export const findAccountByName = (accounts, name) => {
  if (!accounts?.length) {
    return null;
  }

  // Find the account by id
  const [account] = accounts.filter(account => formatDisplayName(account.name) === name);

  return account;
};

export const findAccount = (accounts, accountId) => {
  if (!accounts?.length) {
    return null;
  }

  // Find the account by id
  const [account] = accounts.filter(account => account.uid === accountId);

  return account;
};

export const findStandard = (standards, name) => {
  if (!standards?.length) {
    return null;
  }

  // Find the account by id
  const [standard] = standards.filter(standard => standard.name === name);

  return standard;
};
