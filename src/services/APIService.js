import axios from './axios';

export const signup = ({ firstName, lastName, email, password }) => {
  return axios.post('auth/signup', {
    firstName,
    lastName,
    email,
    password,
  });
};

export const login = ({ email, password }) => {
  return axios.post('auth/login', {
    email,
    password,
  });
};

export const getNotes = (name) => {
  return axios.get('notes', {
    params: {
      name,
    },
  });
};

export const getNoteById = (id) => {
  return axios.get(`notes/${id}`);
};

export const updateNote = (id, note) => {
  return axios.put(`notes/${id}`, note);
};

export const createNote = (note) => {
  return axios.post(`notes`, note);
};

export const deleteNoteById = (id) => {
  return axios.delete(`notes/${id}`);
};

export const setBearer = (token) => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};
