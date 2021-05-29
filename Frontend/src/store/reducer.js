const initialState = {
  auth: null, // change the default to null
  username: "",
  query: "",
  movie: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "False_Auth":
      return {
        ...state,
        auth: false,
        token: null
      };
    case "True_Auth":
      return {
        ...state,
        auth: true,
        token: action.token
      };
    case "Set_Username":
      return {
        ...state,
        username: action.username,
      };
    case "Set_Query":
      return {
        ...state,
        query: action.query,
      };
    case "Set_Movie":
      return {
        ...state,
        movie: action.movie,
      };
    default:
      return state;
  }
};

export default reducer;
