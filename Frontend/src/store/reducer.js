const initialState = {
  auth: null, // change the default to null
  username: "",
  query: "",
<<<<<<< HEAD
=======
  movie: "",
>>>>>>> bc7ec5e6cd585cb1545d92b748a46d91fb39db50
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "False_Auth":
      return {
        ...state,
        auth: false,
      };
    case "True_Auth":
      return {
        ...state,
        auth: true,
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
<<<<<<< HEAD
=======
    case "Set_Movie":
      return {
        ...state,
        movie: action.movie,
      };
>>>>>>> bc7ec5e6cd585cb1545d92b748a46d91fb39db50
    default:
      return state;
  }
};

export default reducer;
