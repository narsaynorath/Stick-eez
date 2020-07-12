import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { useFormInput } from '../utils/form';
import { getToken } from '../utils/common';

function Note({ id, style, notes, setNotes, setAddingNote }) {
  const title = useFormInput('');
  const text = useFormInput('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // handle button click of login form
  const handleSubmit = e => {
    e.preventDefault();

    if (!title.value && !text.value) {
      setAddingNote(false);
      return;
    }

    setError(null);
    setLoading(true);
    fetch('http://localhost:5000/api/v1/notes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        title: title.value,
        text: text.value,
      }),
    })
      .then(response => response.json())
      .then(newNote => {
        setLoading(false);
        setNotes([...notes, newNote]);
        setAddingNote(false);
      })
      .catch(error => {
        // console.log(error);
        // debugger;
        setLoading(false);
        // if (error.status === 401) {
        //   setError(error.data.message);
        // } else {
        setError('Something went wrong. Please try again later.');
        // }
      });
  };

  return (
    <Card style={{ height: '100%', width: '100%', ...style }}>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <header>
            <TextField
              style={{ width: '100%' }}
              variant="outlined"
              placeholder="Title"
              disabled={loading}
              {...title}
            />
          </header>
          <Divider style={{ margin: '12px 0' }} />
          <main>
            <TextField
              variant="outlined"
              style={{ width: '100%', marginBottom: '12px' }}
              rows={3}
              multiline
              placeholder="Take a note..."
              autoFocus
              disabled={loading}
              {...text}
            />
          </main>
          <footer style={{ display: 'flex', justifyContent: 'right' }}>
            <Button
              type="submit"
              variant="contained"
              style={{ backgroundColor: 'rgb(244, 181, 6)' }}
              disabled={loading}
            >
              {title.value || text.value ? 'Save' : 'Close'}
            </Button>
          </footer>
        </form>
      </CardContent>
    </Card>
  );
}

export default Note;
