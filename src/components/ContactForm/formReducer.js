import { customAlphabet } from 'nanoid';

const id = customAlphabet("1234567890", 4)

export const CHANGING = 'CHANGING';
export const RESETING = 'RESETING';

export const formReducer = (prevState, action) => {
  switch (action.type) {
    case CHANGING:
      return {
        ...prevState,
        [action.payload?.name]: action.payload?.value,
        id: id(),
      };
    case RESETING:
      return {
        ...action.payload,
      };
    default:
      return prevState;
  }
};
