import React, { useState } from 'react';

import Paper from '@material-ui/core/Paper';

import { setUserSession } from '../utils/common';

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
        setUserSession(data.access_token, data.username);
        setUser(data.username);
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
      Login
      <br />
      <br />
      <div>
        Username
        <br />
        <input type="text" {...username} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password
        <br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {error && (
        <>
          <small style={{ color: 'red' }}>{error}</small>
          <br />
        </>
      )}
      <br />
      <input
        type="button"
        value={loading ? 'Loading...' : 'Login'}
        onClick={handleLogin}
        disabled={loading}
      />
      <br />
    </Paper>
  );
}

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
}

export default Login;
