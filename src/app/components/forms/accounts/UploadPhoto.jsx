import React, { useState } from 'react';
import { LinearProgress, Box, Grid, Typography, Button } from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/storage';

import { makeStyles } from '@material-ui/core/styles';
import { CloudUpload } from '@material-ui/icons';

// Create the dashboard screen styles
export const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(1),

    '& img:hover': {
      cursor: 'pointer',
    },
  },
  avatar: {
    width: 100,
  },
  caption: {
    marginRight: theme.spacing(2),
  },
  list: {
    flex: 1,
  },
  noFiles: {
    justifyContent: 'center',
  },
  label: {
    fontWeight: 700,
  },
  detail: {},
  box: {
    height: '100%',
    width: '100%',
  },
}));

export const UploadPhoto = ({ setProfileImage }) => {
  const classes = useStyles();
  const [progress, setProgress] = useState(false);
  const [preview, setPreview] = useState(false);

  const uploadFile = file => {
    // Get the firebase storage ref
    const storageRef = firebase.storage().ref();

    // Create the upload task
    const uploadTask = storageRef.child('profiles/' + file.name).put(file, { contentType: file.type });

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      snapshot => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        let updatedProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 75;

        // Set the progress
        setProgress(parseInt(updatedProgress));

        // Handle state changes
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      },
      error => {
        console.log(error);
      },
      () => {
        setProgress(100);

        // Upload completed successfully, now we can process the controls
        uploadTask.snapshot.ref.getDownloadURL().then(url => {
          setProgress(0);
          setPreview(url);
          setProfileImage(url);
        });
      }
    );
  };

  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  const handleChange = event => {
    // Initialize the upload process
    setProgress(0);

    const [file] = Array.from(event.target.files);
    uploadFile(file);
  };

  const hiddenFileInput = React.useRef(null);

  return (
    <Grid container direction="column" onClick={() => {}} classes={{ root: classes.container }}>
      <input onChange={handleChange} ref={hiddenFileInput} type="file" accept="image/*" style={{ display: 'none' }} />
      {progress === false && !preview ? (
        <Grid item xs={12}>
          <Button fullWidth color="primary" onClick={handleClick} endIcon={<CloudUpload />}>
            Upload Image
          </Button>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <Grid container classes={{ root: classes.box }} justify="center" direction="column">
            {Boolean(progress) && (
              <React.Fragment>
                <Grid item>
                  <Typography variant="subtitle2" component="div" align="center">
                    Uploading Profile Image...
                  </Typography>
                </Grid>
                <Grid item>
                  <Box display="flex" alignItems="center">
                    <Box width="100%" mr={1}>
                      <LinearProgress variant="determinate" value={progress} />
                    </Box>
                    <Box minWidth={35}>
                      <Typography variant="body2" color="textSecondary">{`${Math.round(progress)}%`}</Typography>
                    </Box>
                  </Box>
                </Grid>
              </React.Fragment>
            )}
            {Boolean(preview) && (
              <React.Fragment>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" component="div" classes={{ root: classes.label }}>
                    Preview
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <img src={preview} height={36} width={80} onClick={handleClick} />
                </Grid>
              </React.Fragment>
            )}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};
