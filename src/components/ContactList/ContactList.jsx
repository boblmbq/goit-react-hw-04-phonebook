// import css from './ContactList.module.css';

const ContactList = props => {
  const { filteredContacts, onDeleteItem } = props;
  return (
    <ul>
      {filteredContacts.map(({ name, number }) => {
        return (
          <li key={name}>
            <p>
              {name}: {number}
            </p>
            <button
              type="button"
              onClick={() => {
                onDeleteItem(name);
              }}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default ContactList;
