import React, { useCallback, useState, useMemo, useEffect } from 'react';
import clsx from 'clsx';
import { CircularProgress, Box, Fab, Grid, Typography } from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/storage';
import { useMutation } from '@apollo/client';

import { EmptyContainer } from 'app/components/shared/EmptyContainer';
import { useDropzone } from 'react-dropzone';

import { makeStyles, darken } from '@material-ui/core/styles';
import { CloudUpload } from '@material-ui/icons';
import { CONTROLS, UPLOAD_CONTROLS } from '../../graph/standard';

// Create the dashboard screen styles
export const useStyles = makeStyles(theme => ({
  avatar: {
    width: 100,
  },
  container: {
    height: 800,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    transition: 'border .3s ease-in-out',
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
    flex: 1,
  },
  detail: {},
  box: {
    height: '100%',
    width: '100%',
  },
}));

const baseStyle = {};

const activeStyle = {
  borderWidth: 2,
  borderRadius: 2,
  borderStyle: 'dashed',
  color: '#bdbdbd',
  borderColor: '#2f4f4f',
  backgroundColor: darken('#fff', 0.1),
};

export const UploadControls = ({ user, standard, standardId }) => {
  const classes = useStyles();
  const [progress, setProgress] = useState(false);
  const [uploadControls, { data, error, loading }] = useMutation(UPLOAD_CONTROLS, {
    update: (cache, { data: { uploadControls } }) => {
      const data = cache.readQuery({
        query: CONTROLS,
        variables: { standardId },
      });
      cache.writeQuery({
        query: CONTROLS,
        variables: { standardId },
        data: { controls: { ...data.controls, controls: uploadControls } },
      });
    },
  });

  useEffect(() => {
    if (!error && data) {
      setProgress(100);
    }
  }, [data]);

  const uploadFile = file => {
    // Initialize the upload process
    setProgress(0);

    // Get the firebase storage ref
    const storageRef = firebase.storage().ref();

    // Create the upload task
    const uploadTask = storageRef.child('uploads/' + file.name).put(file, { contentType: file.type });

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
        // // A full list of error codes is available at
        // // https://firebase.google.com/docs/storage/web/handle-errors
        // switch (error.code) {
        //   case 'storage/unauthorized':
        //     // User doesn't have permission to access the object
        //     break;
        //   case 'storage/canceled':
        //     // User canceled the upload
        //     break;

        //   // ...

        //   case 'storage/unknown':
        //     // Unknown error occurred, inspect error.serverResponse
        //     break;
        // }
      },
      () => {
        // Upload completed successfully, now we can process the controls
        uploadControls({
          variables: {
            standardId,
            bucket: uploadTask.snapshot.ref.bucket,
            file: `uploads/${uploadTask.snapshot.ref.name}`,
          },
        });
      }
    );
  };

  const onDrop = useCallback(([file]) => {
    uploadFile(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
    }),
    [isDragActive]
  );

  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  const handleChange = event => {
    const [file] = Array.from(event.target.files);
    uploadFile(file);
  };

  const hiddenFileInput = React.useRef(null);

  return (
    <Grid container justify="center" {...getRootProps({ style })} onClick={() => {}}>
      {progress === false ? (
        <Grid item xs={12}>
          <input {...getInputProps()} />
          <EmptyContainer
            image="img/empty-documents.png"
            label={
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography varian="subtitle1">No Controls Added</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" classes={{ caption: classes.caption }}>
                    Drag-and-Drop your Files or
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Fab component="span" variant="extended" color="primary" onClick={handleClick}>
                    <CloudUpload />
                    Import
                    <input onChange={handleChange} ref={hiddenFileInput} type="file" style={{ display: 'none' }} />
                  </Fab>
                </Grid>
              </Grid>
            }
          />
        </Grid>
      ) : (
        <Grid item xs={12}>
          <Grid container spacing={2} classes={{ root: classes.box }} justify="center" direction="column">
            <Grid item>
              <Typography variant="h5" component="div" align="center">
                Uploading Controls...
              </Typography>
            </Grid>
            <Grid item>
              <Box position="relative" display="inline-flex" alignItems="center" justifyContent="center" classes={{ root: classes.box }}>
                <CircularProgress variant="determinate" value={progress} size={150} />
                <Box top={0} left={0} bottom={0} right={0} position="absolute" display="flex" alignItems="center" justifyContent="center">
                  <Typography variant="h5" component="div" color="textSecondary">{`${Math.round(progress)}%`}</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};
