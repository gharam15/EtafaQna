import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const logout = () => {
  cookies.remove('Bearer', { path: '/' });
  window.location.href = '/login'; // Redirect to login page after logout
};
