const initialState = {
  auth: null, // change the default to null
  username: "",
  query: "",
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
    default:
      return state;
  }
};

export default reducer;
