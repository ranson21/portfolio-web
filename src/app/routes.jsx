import React from 'react';
import { Dashboard, Group, Domain, Assignment } from '@material-ui/icons';

export const ROUTES = [
  {
    path: 'home',
    Icon: Dashboard,
  },
  {
    path: 'accounts',
    subtitle: 'Customer Management',
    description:
      'Create new Accounts and manage existing Customer Accounts. You can Create members as well as allocate and assign licenses.',
    Icon: Domain,
  },
  {
    path: 'members',
    subtitle: 'User Management',
    description:
      'Create new Members associated with one of the available accounts. You can also assign licenses to these members as well as update their profile information',
    Icon: Group,
  },
  {
    path: 'standards',
    subtitle: 'Controls and Assessment Management',
    description:
      'Create new Standards and manage existing Standards assessments. Define custom controls and mappings between each control in each standard',
    Icon: Assignment,
  },
];
