/**
 * Applies the a11y properties and sets the tab controls per index
 * @param {number} index -- Index of the tab to control
 */
export const a11yProps = index => ({
  id: `wrapped-tab-${index}`,
  'aria-controls': `wrapped-tabpanel-${index}`,
});

/**
 * Method to select the entire value of an input given an event
 * @param {Object} event -- JavaScript Event object containing the input to select
 */
export const selectInputValue = (target, range) => target.setSelectionRange(0, range || target.value.length);

/**
 * Applies or removes a border based on the event and direction
 * @param {string} className -- Name of the class that should be applied
 * @param {string} status -- The status determining whether to add or remove the class
 */
export const setBorder = (className, status) => event => {
  // Stop propagation of the border effect
  event.stopPropagation();
  event.preventDefault();

  // Add or remove the class based on the status
  if (status === 'on') {
    event.target.classList.add(className);
  } else {
    event.target.classList.remove(className);
  }
};

/**
 * Helper method to use either the component name if set or type if not
 * @param {Object} component -- The component object containing either a user-supplied name or the library-defined type
 * @returns {String} -- The type of component to render, this will be library-defined
 */
export const componentType = component => component?.name || component?.type;

export const formatName = (name, user) => (name === user?.name ? `${name} (Me)` : name);

export const formatDate = (dateString, format) => {
  // Convert the date string to a date object
  const date = new Date(dateString);

  // Parse the Date components
  const year = date.getFullYear();
  let day = date.getDate();
  let month = date.getMonth() + 1;

  switch (format) {
    case 'M/D/YYYY':
      return `${month}/${day}/${year}`;
    case 'MM/DD/YYYY':
      // Append 0 to single digit days and months
      month = month < 10 ? `0${month}` : month;
      day = day < 10 ? `0${day}` : day;

      return `${month}/${day}/${year}`;
    default:
      return date.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
  }
};

export const filterDirty = (dirtyFields, values) =>
  Object.keys(dirtyFields).reduce(
    (list, field) => ({
      ...list,
      [dirtyFields[field] && field]: values[field],
    }),
    {}
  );

/**
 * FormatLicense -- Groups the list of available licenses by rolej
 * @param {array} licenses -- The list of licenses for a specific account
 * @returns {array} -- The list of available licenses grouped by role
 */
export const formatLicenses = licenses => {
  const grouped = licenses
    .filter(license => !license.assignedTo)
    .reduce(
      (list, license) => ({
        ...list,
        [license.role]: {
          count: list[license.role]?.count ? list[license.role].count + 1 : 1,
          name: `${license.role} (${list[license.role]?.count + 1 || 1} Available)`,
        },
      }),
      {}
    );

  const options = Object.keys(grouped).map(option => ({
    id: option,
    name: grouped[option].name,
  }));

  return options;
};

/**
 * FormatDisplayName -- Converts a user display name to a URL friendly format
 * @param {string} name -- The unformatted user display name
 * @returns {string} -- Display Name lowercased and spaces replaced with `-`
 */
export const formatDisplayName = name => {
  return name.toString().toLowerCase().split(' ').join('-');
};
