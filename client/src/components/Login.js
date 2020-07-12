import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import { setUserSession } from '../utils/common';
import { useFormInput } from '../utils/form';

import { ReactComponent as LoginSVG } from '../assets/login.svg';

function Login({ setUser }) {
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    fetch('http://localhost:5000/api/v1/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    })
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        setUserSession(data.access_token, data.user);
        setUser(data.user);
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
    <Paper
      elevation={0}
      style={{
        height: '500px',
        width: '500px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
      }}
    >
      <LoginSVG style={{ margin: '20px' }} />
      <TextField
        variant="outlined"
        type="text"
        {...username}
        autoComplete="new-password"
        label="Username"
        style={{ marginBottom: '12px' }}
      />
      <TextField
        variant="outlined"
        type="password"
        {...password}
        autoComplete="new-password"
        label="Password"
      />
      {error && (
        <>
          <small style={{ color: 'red' }}>{error}</small>
          <br />
        </>
      )}
      <Button
        type="button"
        variant="contained"
        color="primary"
        onClick={handleLogin}
        disabled={loading}
        style={{ margin: '12px' }}
      >
        {loading ? 'Loading...' : 'Login'}
      </Button>
    </Paper>
  );
}

export default Login;
