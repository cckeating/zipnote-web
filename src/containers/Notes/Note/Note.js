import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { Delete, Save } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import CenterBox from '../../../components/UI/CenterBox';
import * as ApiService from '../../../services/APIService';

const Note = ({ create }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [note, setNote] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const history = useHistory();
  useEffect(() => {
    // ID param set, editing note
    if (!create) {
      setLoading(true);
      setError(null);

      ApiService.getNoteById(id)
        .then((response) => {
          const { data } = response;
          setNote({
            name: {
              value: data.name,
            },
            data: {
              value: data.data,
            },
          });
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => setLoading(false));
    } else {
      setNote({
        name: {
          value: '',
        },
        data: {
          value: '',
        },
      });
    }
  }, [id, create]);

  const deleteButtonClickHandler = () => {
    setDialogOpen(true);
  };

  const closeDialogHandler = () => {
    setDialogOpen(false);
  };

  const confirmDeleteButtonClickHandler = () => {
    setLoading(true);

    ApiService.deleteNoteById(id)
      .then((response) => {
        history.replace('/notes');
      })
      .catch((err) => {
        setError(null);
      });
  };

  const textChangeHandler = (event, id) => {
    const state = {
      ...note,
      [id]: {
        value: event.target.value,
      },
    };

    setNote(state);
  };

  const saveButtonClickHandler = () => {
    const state = { ...note };
    let hasError;

    if (!state.name.value) {
      hasError = true;
      state.name.error = true;
    }

    if (hasError) {
      return setNote(state);
    }

    setLoading(true);

    if (id) {
      ApiService.updateNote(id, {
        name: state.name.value,
        data: state.data.value,
      })
        .then((response) => {
          history.replace('/notes');
        })
        .catch((err) => {
          setError(err);
        });
    } else {
      ApiService.createNote({
        name: state.name.value,
        data: state.data.value,
      })
        .then((response) => {
          history.replace('/notes');
        })
        .catch((err) => {
          setError(err);
        });
    }
  };

  let body;

  if (loading || !note || error) {
    body = (
      <CenterBox>
        {error ? (
          <Typography variant="h4">Error Occurred :(</Typography>
        ) : (
          <CircularProgress />
        )}
      </CenterBox>
    );
  } else {
    body = (
      <Grid container direction="column" spacing={3} alignItems="stretch">
        <Grid item>
          <Typography variant="h4">
            <strong>{id ? 'Edit' : 'Create'} Note</strong>
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            error={note.name.error}
            value={note.name.value}
            onChange={(event) => textChangeHandler(event, 'name')}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Body"
            multiline
            rows={10}
            variant="outlined"
            fullWidth
            value={note.data.value}
            onChange={(event) => textChangeHandler(event, 'data')}
          />
        </Grid>
        <Grid item container justify="flex-end" spacing={3}>
          {!create && (
            <Grid item>
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                startIcon={<Delete />}
                onClick={deleteButtonClickHandler}
              >
                <Box px={1}>Delete</Box>
              </Button>
            </Grid>
          )}
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<Save />}
              onClick={saveButtonClickHandler}
            >
              <Box px={3}>Save</Box>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  return (
    <Container maxWidth="lg">
      <Paper>
        <Box py={4} px={4}>
          {body}
        </Box>
      </Paper>
      <Dialog open={dialogOpen} onClose={closeDialogHandler}>
        <DialogTitle>Delete Note</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this note?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={closeDialogHandler}>
            Cancel
          </Button>
          <Button color="primary" onClick={confirmDeleteButtonClickHandler}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Note;
