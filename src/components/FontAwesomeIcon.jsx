// External Dependencies
import * as React from 'react';
import { Icon } from '@mui/material';
import { loadCSS } from 'fg-loadcss';

/**
 * Font-Awesome Icon loader component
 * @param {Object} props -- Contains the font awesome icon name to render
 */
export const FontAwesomeIcon = ({ icon, ...props }) => {
  React.useEffect(() => {
    const node = loadCSS('https://use.fontawesome.com/releases/v5.12.0/css/all.css');

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

  return <Icon {...props} className={icon} />;
};
