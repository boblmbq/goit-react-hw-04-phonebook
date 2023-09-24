import { useEffect, useState } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import css from './app.module.css';

const LIST_OF_CONTACTS = 'ListOfContacts';

export const App = () => {
  //набагато краще тут було б використовувати useReducer але спробував через useState
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const formSubmitData = data => {
    const ifSome = contacts.some(
      name => name.name.toLowerCase() === data.name.toLowerCase()
    );
    if (ifSome) {
      alert(`The contact with name "${data.name}" is already aded`);
      return;
    }
    setContacts(prev => {
      return [...prev, data];
    });
  };

  const onDeleteItem = name => {
    setContacts(prevContacts => {
      const updatedContacts = prevContacts.filter(item => item.name !== name);
      localStorage.setItem(LIST_OF_CONTACTS, JSON.stringify(updatedContacts));
      return updatedContacts;
    });
  };

  const onFilterChange = evt => {
    setFilter(evt.currentTarget.value);
  };

  useEffect(() => {
    const savedContactsList = localStorage.getItem(LIST_OF_CONTACTS);
    if (savedContactsList) setContacts(JSON.parse(savedContactsList));
  }, []);

  useEffect(() => {
    contacts.length &&
      localStorage.setItem(LIST_OF_CONTACTS, JSON.stringify(contacts));
  }, [contacts]);

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
