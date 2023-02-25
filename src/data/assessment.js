import { GROUPS } from 'app/config/constants';

export const createAssessments = () =>
  GROUPS.reduce(
    (result, group) => ({
      ...result,
      [group.name]: {
        status: 'pending',
      },
    }),
    {}
  );
