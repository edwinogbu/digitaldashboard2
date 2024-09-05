import React, { createContext, useReducer, useContext, useEffect } from 'react';
import axios from 'axios';
import { authReducer } from './authReducer'; // Update the import path if needed

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: !!localStorage.getItem('token'),
    users: JSON.parse(localStorage.getItem('users')) || [],
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    }
  }, []);

  // Create a custom axios instance with default headers
  const api = axios.create({
    // baseURL: 'https://www.digitalspayout.com/api/auth',
    baseURL: 'http://localhost:3005/api/auth/',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include your authorization token here
    },
  });

  const login = async (formData) => {
    try {
      const response = await api.post('/login', formData);
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const register = async (formData) => {
    try {
      const response = await api.post('/register', formData);
      dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      throw new Error('Registration failed');
    }
  };

  const getProfile = async () => {
    try {
      const response = await api.get('/profile');
      dispatch({ type: 'GET_PROFILE_SUCCESS', payload: response.data });
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
      throw new Error('Failed to get profile');
    }
  };

  const getRole = () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.role) {
        dispatch({ type: 'GET_ROLE_SUCCESS', payload: user.role });
      } else {
        throw new Error('Role not found in local storage');
      }
    } catch (error) {
      console.error('Failed to get role:', error);
    }
  };

  const getUserById = async (id) => {
    try {
      const response = await api.get(`/view/${id}`);
      dispatch({ type: 'GET_USER_BY_ID_SUCCESS', payload: response.data });
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
      throw new Error('Failed to get user by ID');
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await api.get('/users');
      dispatch({ type: 'GET_ALL_USERS_SUCCESS', payload: response.data });
      localStorage.setItem('users', JSON.stringify(response.data));
    } catch (error) {
      throw new Error('Failed to get all users');
    }
  };

  const updateUser = async (id, formData) => {
    try {
      const response = await api.put(`/update/${id}`, formData);
      dispatch({ type: 'UPDATE_USER_SUCCESS', payload: response.data });

      const updatedUsers = state.users.map(user => user.id === id ? response.data : user);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      if (state.user.id === id) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
    } catch (error) {
      throw new Error('Failed to update user');
    }
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(`/delete/${id}`);
      dispatch({ type: 'DELETE_USER_SUCCESS', payload: id });

      const updatedUsers = state.users.filter(user => user.id !== id);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      if (state.user.id === id) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    } catch (error) {
      throw new Error('Failed to delete user');
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  };

  return (
    <AuthContext.Provider value={{ state, login, register, logout, getProfile, getRole, getUserById, getAllUsers, updateUser, deleteUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };



// import React, { createContext, useReducer, useContext, useEffect } from 'react';
// import axios from 'axios';
// import { authReducer } from './authReducer'; // Update the import path if needed

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, {
//     user: JSON.parse(localStorage.getItem('user')) || null,
//     isAuthenticated: !!localStorage.getItem('token'),
//     users: JSON.parse(localStorage.getItem('users')) || [],
//   });

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     if (user) {
//       dispatch({ type: 'LOGIN_SUCCESS', payload: user });
//     }
//   }, []);

//   // Create a custom axios instance with default headers
//   const api = axios.create({
//     baseURL: 'https://digitalspayout.com/api/auth',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include your authorization token here
//     },
//   });

//   const login = async (formData) => {
//     try {
//       const response = await api.post('/login', formData);
//       dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
//       localStorage.setItem('user', JSON.stringify(response.data));
//       localStorage.setItem('token', response.data.token);
//     } catch (error) {
//       throw new Error('Login failed');
//     }
//   };

//   const register = async (formData) => {
//     try {
//       const response = await api.post('/register', formData);
//       dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
//       localStorage.setItem('user', JSON.stringify(response.data));
//       localStorage.setItem('token', response.data.token);
//     } catch (error) {
//       throw new Error('Registration failed');
//     }
//   };

//   const getProfile = async () => {
//     try {
//       const response = await api.get('/profile');
//       dispatch({ type: 'GET_PROFILE_SUCCESS', payload: response.data });
//       localStorage.setItem('user', JSON.stringify(response.data));
//     } catch (error) {
//       throw new Error('Failed to get profile');
//     }
//   };

//   const getRole = () => {
//     try {
//       const user = JSON.parse(localStorage.getItem('user'));
//       if (user && user.role) {
//         dispatch({ type: 'GET_ROLE_SUCCESS', payload: user.role });
//       } else {
//         throw new Error('Role not found in local storage');
//       }
//     } catch (error) {
//       console.error('Failed to get role:', error);
//     }
//   };

//   const getUserById = async (id) => {
//     try {
//       const response = await api.get(`/view/${id}`);
//       dispatch({ type: 'GET_USER_BY_ID_SUCCESS', payload: response.data });
//       localStorage.setItem('user', JSON.stringify(response.data));
//     } catch (error) {
//       throw new Error('Failed to get user by ID');
//     }
//   };

//   const getAllUsers = async () => {
//     try {
//       const response = await api.get('/users');
//       dispatch({ type: 'GET_ALL_USERS_SUCCESS', payload: response.data });
//       localStorage.setItem('users', JSON.stringify(response.data));
//     } catch (error) {
//       throw new Error('Failed to get all users');
//     }
//   };

//   const updateUser = async (id, formData) => {
//     try {
//       const response = await api.put(`/update/${id}`, formData);
//       dispatch({ type: 'UPDATE_USER_SUCCESS', payload: response.data });
//       localStorage.setItem('user', JSON.stringify(response.data));
//     } catch (error) {
//       throw new Error('Failed to update user');
//     }
//   };

//   const deleteUser = async (id) => {
//     try {
//       await api.delete(`/delete/${id}`);
//       dispatch({ type: 'DELETE_USER_SUCCESS', payload: id });
//       const updatedUsers = state.users.filter(user => user.id !== id);
//       localStorage.setItem('users', JSON.stringify(updatedUsers));
//     } catch (error) {
//       throw new Error('Failed to delete user');
//     }
//   };

//   const logout = () => {
//     dispatch({ type: 'LOGOUT' });
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//     localStorage.removeItem('users');
//   };

//   return (
//     <AuthContext.Provider value={{ state, login, register, logout, getProfile, getRole, getUserById, getAllUsers, updateUser, deleteUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// const useAuth = () => useContext(AuthContext);

// export { AuthProvider, useAuth };



// import React, { createContext, useReducer, useContext, useEffect } from 'react';
// import axios from 'axios';
// import { authReducer } from './authReducer'; // Update the import path if needed

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, {
//     user: null,
//     isAuthenticated: false,
//   });

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     if (user) {
//       dispatch({ type: 'LOGIN_SUCCESS', payload: user });
//     }
//   }, []);

//   // Create a custom axios instance with default headers
//   const api = axios.create({
//     baseURL: 'https://digitalspayout.com/api/auth',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include your authorization token here
//     },
//   });

//   const login = async (formData) => {
//     try {
//       const response = await api.post('/login', formData);
//       dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
//       localStorage.setItem('user', JSON.stringify(response.data));
//       localStorage.setItem('token', response.data.token);
//     } catch (error) {
//       throw new Error('Login failed');
//     }
//   };

//   const register = async (formData) => {
//     try {
//       const response = await api.post('/register', formData);
//       dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
//       localStorage.setItem('user', JSON.stringify(response.data));
//       localStorage.setItem('token', response.data.token);
//     } catch (error) {
//       throw new Error('Registration failed');
//       console.error('Signup failed:', error);
//       console.error('Response data:', error.response ? error.response.data : null);
//       console.error('Status code:', error.response ? error.response.status : null);

//     }
//   };

//   const getProfile = async () => {
//     try {
//       const response = await api.get('/profile');
//       dispatch({ type: 'GET_PROFILE_SUCCESS', payload: response.data });
//     } catch (error) {
//       throw new Error('Failed to get profile');
//     }
//   };

//   const logout = () => {
//     dispatch({ type: 'LOGOUT' });
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//   };

//   return (
//     <AuthContext.Provider value={{ state, login, register, logout, getProfile }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// const useAuth = () => useContext(AuthContext);

// export { AuthProvider, useAuth };
