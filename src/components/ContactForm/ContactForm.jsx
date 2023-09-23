import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';
import { useReducer } from 'react';
import { CHANGING, RESETING, formReducer } from './formReducer';

const INITIAL_INPUTS = {
  name: '',
  number: '',
};
const LABEL_IDS = {
  nameId: nanoid(),
  numberId: nanoid(),
};
const { nameId, numberId } = LABEL_IDS;

const ContactForm = ({ submitHandler }) => {
  const [userInfo, dispatch] = useReducer(formReducer, INITIAL_INPUTS);

  const handelInputChange = evt => {
    dispatch({
      type: CHANGING,
      payload: { name: evt.target.name, value: evt.target.value },
    });
  };

  const onFormSubmit = e => {
    e.preventDefault();
    submitHandler(userInfo);
    reset();
  };

  function reset() {
    dispatch({
      type: RESETING,
      payload: { ...INITIAL_INPUTS },
    });
  }

  // здається більш краще буде тут їх тут деструктуризувати тут щоб вище очі не розбігались
  const { name, number } = userInfo;

  return (
    <form onSubmit={onFormSubmit}>
      <label htmlFor={nameId}>Name</label>
      <input
        className={css.input}
        value={name}
        onChange={handelInputChange}
        id={nameId}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <label htmlFor={numberId}>Number</label>
      <input
        value={number}
        onChange={handelInputChange}
        id={numberId}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button type="submit" className={css.button}>
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
