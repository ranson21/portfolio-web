import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardHeader } from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';
import { useHistory } from 'react-router';

const useStyles = makeStyles(theme => ({
  root: {
    width: 350,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  header: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light,
  },
  action: {
    alignItems: 'flex-end',
    flexDirection: 'column',
  },
  content: {
    height: 150,
  },
}));

export const ActionCard = ({ title, subheader, details, action, path }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card className={classes.root}>
      <CardHeader title={title} subheader={subheader} classes={{ root: classes.header, subheader: classes.header }} />
      <CardContent classes={{ root: classes.content }}>
        <Typography variant="body2" component="p">
          {details}
        </Typography>
      </CardContent>
      <CardActions classes={{ root: classes.action }}>
        <Button color="primary" onClick={() => history.push(path)} variant="contained" endIcon={<ChevronRight />}>
          {action}
        </Button>
      </CardActions>
    </Card>
  );
};
