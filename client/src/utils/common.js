// return the user data from the session storage
export const getUser = () => {
  const userStr = sessionStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  else return null;
};

// return the token from the session storage
export const getToken = () => {
  return sessionStorage.getItem('access-token') || null;
};

// remove the token and user from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem('access-token');
  sessionStorage.removeItem('user');
};

// set the token and user from the session storage
export const setUserSession = (token, user) => {
  sessionStorage.setItem('access-token', token);
  sessionStorage.setItem('user', JSON.stringify(user));
};
