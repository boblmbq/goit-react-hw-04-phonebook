// import css from './ContactList.module.css';

const ContactList = props => {
  const { filteredContacts, onDeleteItem } = props;
  return (
    <ul>
      {filteredContacts.map(({ name, number, id }) => {
        return (
          <li key={id}>
            <p>
              {name}: {number}
            </p>
            <button
              type="button"
              onClick={() => {
                onDeleteItem(id);
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
