// External Depedencies
import React, { useState, useEffect } from 'react';
import { InputAdornment, Grid, Typography, Button, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Form } from 'react-final-form';
import { Mail, AccountCircle, Send } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Style dependencies
import { line } from '@styles';
import { Text } from '@components/FormControls';
import { validate } from '@utils/validator';

// Style dependencies remain the same...
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

const ThankYouMessage = () => (
  <Grid container spacing={3} sx={{ textAlign: 'center' }}>
    <Grid item xs={12}>
      <Typography variant="h2" component="h2" gutterBottom>
        Thank You
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <Typography variant="subtitle1" color="text.secondary">
        I appreciate you reaching out. I will review your message and respond within 24-48 hours. Thank you for your patience.
      </Typography>
    </Grid>
  </Grid>
);

export const Contact = props => {
  const theme = useTheme();
  const [formError, setFormError] = useState('');
  const [validating, setValidating] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    // Check if there's a recent message submission
    const messageSentTime = localStorage.getItem('messageSentTime');
    if (messageSentTime) {
      const timeDiff = Date.now() - parseInt(messageSentTime);
      const fifteenMinutes = 15 * 60 * 1000; // 15 minutes in milliseconds

      if (timeDiff < fifteenMinutes) {
        setShowThankYou(true);

        // Set timeout to hide thank you message after remaining time
        const remainingTime = fifteenMinutes - timeDiff;
        const timeout = setTimeout(() => {
          setShowThankYou(false);
          localStorage.removeItem('messageSentTime');
        }, remainingTime);

        return () => clearTimeout(timeout);
      } else {
        localStorage.removeItem('messageSentTime');
      }
    }
  }, []);

  const onSubmit = async values => {
    try {
      setValidating(true);
      setFormError('');

      const response = await fetch(import.meta.env.VITE_APP_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.statusText}`);
      }

      // Store the submission time
      localStorage.setItem('messageSentTime', Date.now().toString());
      setShowThankYou(true);

      // Set timeout to hide thank you message after 15 minutes
      setTimeout(() => {
        setShowThankYou(false);
        localStorage.removeItem('messageSentTime');
      }, 15 * 60 * 1000);
    } catch (error) {
      setFormError(error?.message || 'Failed to send message. Please try again.');
    } finally {
      setValidating(false);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ flex: 1 }}>
      <Article item md={6}>
        <Grid container justifyContent="center" alignItems="center" sx={{ height: '100%', maxWidth: '500px' }}>
          {showThankYou ? (
            <ThankYouMessage />
          ) : (
            <>
              <Grid item xs={12} sx={{ marginBottom: 4 }}>
                <Typography variant="h2" component="p">
                  Contact Me
                </Typography>
                <div>
                  <span style={{ ...line(theme), marginTop: '1.2rem' }}></span>
                </div>
              </Grid>
              <Grid item xs={12}>
                {formError && (
                  <Typography color="error" sx={{ mb: 2 }}>
                    {formError}
                  </Typography>
                )}
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
                          <Text required multiline rows={6} name="message" label="Message" />
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
            </>
          )}
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
