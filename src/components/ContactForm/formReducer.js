export const CHANGING = 'CHANGING';
export const RESETING = 'RESETING';

export const formReducer = (prevState, action) => {
  switch (action.type) {
    case CHANGING:
      return {
        ...prevState,
        [action.payload?.name]: action.payload?.value,
      };
    case RESETING:
      return {
        ...action.payload,
      };
    default:
      return prevState;
  }
};
