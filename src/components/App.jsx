import { useEffect, useState } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import css from './app.module.css';

const LIST_OF_CONTACTS = 'ListOfContacts';

export const App = () => {
  const [contacts, setContacts] = useState(storagedValue());
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(LIST_OF_CONTACTS, JSON.stringify(contacts));
  }, [contacts]);

  function storagedValue() {
    const savedContactsList = localStorage.getItem(LIST_OF_CONTACTS);
    if (savedContactsList) return JSON.parse(savedContactsList);
    return [];
  }

  const formSubmitData = data => {
    const ifSome = contacts.some(
      id => id.id.toLowerCase() === data.id.toLowerCase()
    );
    if (ifSome) {
      alert(`The contact with name "${data.name}" is already aded`);
      return;
    }
    setContacts(prev => {
      return [...prev, data];
    });
  };

  const onDeleteItem = id => {
    setContacts(prevContacts => {
      return prevContacts.filter(item => item.id !== id);
    });
  };

  const onFilterChange = evt => {
    setFilter(evt.currentTarget.value);
  };

  const getFilteredContacts = () => {
    return contacts.filter(el =>
      el.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div className={css.div}>
      <h1>Phonebook</h1>
      <ContactForm submitHandler={formSubmitData} />

      <h2>Contacts</h2>
      <Filter onFilterChange={onFilterChange} filterInput={filter} />
      <ContactList
        filteredContacts={getFilteredContacts()}
        onDeleteItem={onDeleteItem}
      />
    </div>
  );
};
