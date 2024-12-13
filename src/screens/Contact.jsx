// External Depedencies
import React, { useState } from 'react';
import { InputAdornment, Toolbar, Box, Grid, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Form } from 'react-final-form';
import { Mail, AccountCircle, Send } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Style dependencies
import { line } from '@styles';
import { Text } from '@components/FormControls';
import { validate } from '@utils/validator';

// Create the dashboard screen styles
const Article = styled(
  Grid,
  {}
)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    scale: '0.7',
    transformOrigin: 'top center',
  },
}));

const Image = styled(
  'img',
  {}
)(({ theme }) => ({
  width: '1000px',
  borderRadius: '10px',
  [theme.breakpoints.down('sm')]: {
    height: '300px',
    width: '300px',
  },
}));

/**
 * Dashboard Screen Component
 */
export const Contact = props => {
  // Create the styles for this screen
  const theme = useTheme();

  // Create local state to handle auth errors
  const [formError, setFormError] = useState('');
  const [validating, setValidating] = useState(false);

  const onSubmit = async values => {
    try {
      setValidating(true);
    } catch (error) {
      setValidating(false);
      setFormError(error?.message);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ flex: 1 }}>
      <Article item md={6}>
        <Grid container justifyContent="center" alignItems="center" sx={{ height: '100%', maxWidth: '500px' }}>
          <Grid item xs={12} sx={{ marginBottom: 4 }}>
            <Typography variant="h2" component="p">
              Contact Me
            </Typography>
            <div>
              <span style={{ ...line(theme), marginTop: '1.2rem' }}></span>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Form
              onSubmit={onSubmit}
              validate={validate(['name', 'email', 'message'])}
              render={({ handleSubmit, submitting, invalid }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Text
                        required
                        name="name"
                        label="Name"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccountCircle />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Text
                        required
                        name="email"
                        label="Email"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Mail />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Text required multiline rows={6} name="message" label="Message" InputProps={{}} />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={invalid || submitting || validating}
                        endIcon={submitting || validating ? <CircularProgress size={20} /> : <Send />}
                      >
                        Send
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            />
          </Grid>
        </Grid>
      </Article>
      <Grid item md={6} sx={{ marginTop: { xs: '-200px', md: 0 } }}>
        <Grid container justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
          <Image src={'img/contact_me.png'} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Contact;
