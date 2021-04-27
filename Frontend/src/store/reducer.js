const initialState = {
  auth: null, // change the default to null
  username: ''
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
      console.log(action);
      return{
        ...state,
        username: action.username
      };
    default:
      return state;
  }
};

export default reducer;
