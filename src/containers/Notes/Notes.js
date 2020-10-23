import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core';
import { AddCircle, Search } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CenterBox from '../../components/UI/CenterBox';
import * as ApiService from '../../services/APIService';
import { formatToDisplayDate } from '../../util/date';

const Notes = () => {
  const history = useHistory();
  const [searchText, setSearchText] = useState('');
  const createNoteClickHandler = () => {
    history.push('/notes/create');
  };

  const textChangeHandler = (event, id) => {
    setSearchText(event.target.value);
  };

  return (
    <Container maxWidth="lg">
      <Paper>
        <Box py={4} px={4}>
          <Grid container direction="column" alignItems="stretch" spacing={3}>
            <Grid
              item
              container
              spacing={2}
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="h4">
                  <strong>Notes</strong>
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<AddCircle />}
                  onClick={createNoteClickHandler}
                >
                  <Box px={2}>New Note</Box>
                </Button>
              </Grid>
            </Grid>

            <Grid item>
              <TextField
                label="Search Notes"
                variant="outlined"
                fullWidth
                value={searchText}
                onChange={(event) => textChangeHandler(event, '')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <NotesDataTable searchText={searchText} />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

const NotesDataTable = ({ searchText }) => {
  const [notes, setNotes] = useState([]);
  // const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    setError(null);

    const timer = setTimeout(() => {
      ApiService.getNotes(searchText)
        .then((response) => {
          setNotes(response.data.notes);
          // setTotal(response.data.total);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [searchText]);

  const viewButtonClickHandler = (id) => {
    history.push('/notes/' + id);
  };

  let body;

  if (loading || error) {
    body = (
      <CenterBox>
        {error ? (
          <Typography variant="h4">Error retrieving notes :(</Typography>
        ) : (
          <CircularProgress />
        )}
      </CenterBox>
    );
  } else {
    body = (
      <NotesTable notes={notes} onViewButtonClick={viewButtonClickHandler} />
    );
  }

  return body;
};

const NotesTable = ({ notes, onViewButtonClick }) => {
  let data;

  if (notes) {
    data = notes.map((note) => {
      return (
        <TableRow key={note.id}>
          <TableCell>{note.name}</TableCell>
          <TableCell>{formatToDisplayDate(note.createdAt)}</TableCell>
          <TableCell>{formatToDisplayDate(note.updatedAt)}</TableCell>
          <TableCell align="right">
            <Button
              variant="outlined"
              color="primary"
              onClick={(event) => onViewButtonClick(note.id)}
            >
              View
            </Button>
          </TableCell>
        </TableRow>
      );
    });
  }

  return (
    <Table style={{ minWidth: 600 }}>
      <TableHead>
        <TableRow>
          <TableCell>
            <strong>Name</strong>
          </TableCell>
          <TableCell>
            <strong>Created</strong>
          </TableCell>
          <TableCell>
            <strong>Updated</strong>
          </TableCell>
          <TableCell align="right">
            <strong>Actions</strong>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{data}</TableBody>
    </Table>
  );
};

export default Notes;
