export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case 'GET_PROFILE_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case 'GET_ROLE_SUCCESS':
      return {
        ...state,
        user: {
          ...state.user,
          role: action.payload,
        },
      };
    case 'GET_USER_BY_ID_SUCCESS':
      return {
        ...state,
        user: action.payload,
      };
    case 'GET_ALL_USERS_SUCCESS':
      return {
        ...state,
        users: action.payload,
      };
    case 'UPDATE_USER_SUCCESS':
      return {
        ...state,
        user: action.payload,
      };
    case 'DELETE_USER_SUCCESS':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        users: [],
      };
    default:
      return state;
  }
};


// export const authReducer = (state, action) => {
//   switch (action.type) {
//     case 'LOGIN_SUCCESS':
//     case 'REGISTER_SUCCESS':
//       return {
//         ...state,
//         user: action.payload,
//         isAuthenticated: true,
//       };
//     case 'GET_PROFILE_SUCCESS':
//       return {
//         ...state,
//         user: action.payload,
//         isAuthenticated: true,
//       };
//     case 'LOGOUT':
//       return {
//         ...state,
//         user: null,
//         isAuthenticated: false,
//       };
//     default:
//       return state;
//   }
// };


// export const authReducer = (state, action) => {
//     switch (action.type) {
//       case 'LOGIN_SUCCESS':
//         return {
//           ...state,
//           user: action.payload,
//           isAuthenticated: true,
//         };
//       case 'LOGOUT':
//         return {
//           ...state,
//           user: null,
//           isAuthenticated: false,
//         };
//       default:
//         return state;
//     }
//   };
  