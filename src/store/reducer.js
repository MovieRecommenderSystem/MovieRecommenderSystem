const initialState = {
  auth: null, // change the default to null
  error: null,
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
    case "False_Error":
      return {
        ...state,
        auth: false,
      };
    case "True_Error":
      return {
        ...state,
        auth: true,
      };
    default:
      return state;
  }
};

export default reducer;
