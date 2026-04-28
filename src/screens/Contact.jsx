// External Depedencies
import React, { useState, useEffect } from 'react';
import { InputAdornment, Grid, Typography, Button, CircularProgress, Paper, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Form } from 'react-final-form';
import { Mail, AccountCircle, Send } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Style dependencies
import { line } from '@styles';
import { Text } from '@components/FormControls';
import { validate } from '@utils/validator';
import { contactContent } from '@/content/portfolioContent';

// Style dependencies remain the same...
const Article = styled(Grid, {})(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    transformOrigin: 'top center',
  },
}));

const Image = styled('img', {})(({ theme }) => ({
  width: '100%',
  maxWidth: '520px',
  borderRadius: '24px',
  [theme.breakpoints.down('sm')]: {
    height: '300px',
    objectFit: 'cover',
  },
}));

const ThankYouMessage = () => (
  <Grid container spacing={3} sx={{ textAlign: 'center' }}>
    <Grid item xs={12}>
      <Typography variant="h2" component="h2" gutterBottom>
        {contactContent.thankYouTitle}
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <Typography variant="subtitle1" color="text.secondary">
        {contactContent.thankYouBody}
      </Typography>
    </Grid>
  </Grid>
);

export const Contact = () => {
  const theme = useTheme();
  const [formError, setFormError] = useState('');
  const [validating, setValidating] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    // Check if there's a recent message submission in this session
    const messageSentTime = sessionStorage.getItem('messageSentTime');
    if (messageSentTime) {
      const timeDiff = Date.now() - parseInt(messageSentTime);
      const fifteenMinutes = 15 * 60 * 1000;

      if (timeDiff < fifteenMinutes) {
        setShowThankYou(true);

        const remainingTime = fifteenMinutes - timeDiff;
        const timeout = setTimeout(() => {
          setShowThankYou(false);
          sessionStorage.removeItem('messageSentTime');
        }, remainingTime);

        return () => clearTimeout(timeout);
      } else {
        sessionStorage.removeItem('messageSentTime');
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

      // Store the submission time in session storage (clears on tab close)
      sessionStorage.setItem('messageSentTime', Date.now().toString());
      setShowThankYou(true);

      // Hide thank you message after 15 minutes
      setTimeout(() => {
        setShowThankYou(false);
        sessionStorage.removeItem('messageSentTime');
      }, 15 * 60 * 1000);
    } catch (error) {
      setFormError(error?.message || 'Failed to send message. Please try again.');
    } finally {
      setValidating(false);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        flex: 1,
        position: 'relative',
        pt: { xs: 2, md: 3 },
        borderTop: '1px solid rgba(148, 163, 184, 0.12)',
      }}
      spacing={4}
    >
      <Article item xs={12} md={6}>
        <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: '28px', backgroundColor: 'rgba(15, 20, 28, 0.78)' }}>
          <Grid container justifyContent="center" alignItems="center" sx={{ height: '100%', maxWidth: '560px' }}>
          {showThankYou ? (
            <ThankYouMessage />
          ) : (
            <>
              <Grid item xs={12} sx={{ marginBottom: 4 }}>
                <Typography variant="h2" component="h2">
                  Contact Me
                </Typography>
                <div>
                  <span style={{ ...line(theme), marginTop: '1.2rem' }}></span>
                </div>
              </Grid>
              <Grid item xs={12} sx={{ mb: 3 }}>
                <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                  {contactContent.intro}
                </Typography>
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
                            {contactContent.ctaLabel}
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
        </Paper>
      </Article>
      <Grid item xs={12} md={6}>
        <Stack spacing={3} alignItems="center">
          <Image src={'img/contact_me.png'} />
          <Paper elevation={0} sx={{ p: 3, borderRadius: '24px', width: '100%', maxWidth: '520px', backgroundColor: 'rgba(15, 20, 28, 0.7)' }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {contactContent.preferredTitle}
            </Typography>
            <Stack spacing={1.1}>
              {contactContent.preferredTopics.map(topic => (
                <Typography key={topic} sx={{ color: 'text.secondary', lineHeight: 1.75 }}>
                  {`• ${topic}`}
                </Typography>
              ))}
            </Stack>
          </Paper>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Contact;
