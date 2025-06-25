// Utility functions for authentication: storing, retrieving, and removing JWT tokens

export const setToken = (token: string) => {
  localStorage.setItem('jwt_token', token);
};

export const getToken = (): string | null => {
  return localStorage.getItem('jwt_token');
};

export const removeToken = () => {
  localStorage.removeItem('jwt_token');
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};
