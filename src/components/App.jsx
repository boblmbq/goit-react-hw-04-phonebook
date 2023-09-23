import { Component } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import css from './app.module.css';

const LIST_OF_CONTACTS = 'ListOfContacts';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  formSubmitData = data => {
    const ifSome = this.state.contacts.some(
      name => name.name.toLowerCase() === data.name.toLowerCase()
    );
    if (ifSome) {
      alert(`The contact with name "${data.name}" is already aded`);
      return;
    }
    this.setState(prev => ({
      contacts: [...prev.contacts, data],
    }));
  };

  onDeleteItem = name => {
    this.setState({
      contacts: this.state.contacts.filter(item => item.name !== name),
    });
  };

  onFilterChange = evt => {
    this.setState({
      filter: evt.currentTarget.value,
    });
  };

  getFilteredContacts = () => {
    return this.state.contacts.filter(el =>
      el.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  componentDidMount() {
    const savedContactsList = localStorage.getItem(LIST_OF_CONTACTS);

    if (savedContactsList) {
      const parsedConatctsList = JSON.parse(savedContactsList);

      this.setState({
        contacts: parsedConatctsList,
      });
    }
  }

  componentDidUpdate(_, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (prevContacts !== nextContacts) {
      localStorage.setItem(LIST_OF_CONTACTS, JSON.stringify(nextContacts));
    }
  }

  render() {
    return (
      <div className={css.div}>
        <h1>Phonebook</h1>
        <ContactForm submitHandler={this.formSubmitData} />

        <h2>Contacts</h2>
        <Filter
          onFilterChange={this.onFilterChange}
          filterInput={this.state.filter}
        />
        <ContactList
          filteredContacts={this.getFilteredContacts()}
          onDeleteItem={this.onDeleteItem}
        />
      </div>
    );
  }
}


// export const App = () => {
//   const [contacts, setContacts] = useState([]);
//   const [filter, setFilter] = useState('');

//   const formSubmitData = data => {
//     const ifSome = this.state.contacts.some(
//       name => name.name.toLowerCase() === data.name.toLowerCase()
//     );
//     if (ifSome) {
//       alert(`The contact with name "${data.name}" is already aded`);
//       return;
//     }
//     this.setState(prev => ({
//       contacts: [...prev.contacts, data],
//     }));
//   };

//   const onDeleteItem = name => {
//     this.setState({
//       contacts: this.state.contacts.filter(item => item.name !== name),
//     });
//   };

//   const onFilterChange = evt => {
//     this.setState({
//       filter: evt.currentTarget.value,
//     });
//   };

//   const getFilteredContacts = () => {
//     return this.state.contacts.filter(el =>
//       el.name.toLowerCase().includes(this.state.filter.toLowerCase())
//     );
//   };

//   // componentDidMount() {
//   //   const savedContactsList = localStorage.getItem(LIST_OF_CONTACTS);

//   //   if (savedContactsList) {
//   //     const parsedConatctsList = JSON.parse(savedContactsList);

//   //     this.setState({
//   //       contacts: parsedConatctsList,
//   //     });
//   //   }
//   // }

//   // componentDidUpdate(_, prevState) {
//   //   const nextContacts = this.state.contacts;
//   //   const prevContacts = prevState.contacts;

//   //   if (prevContacts !== nextContacts) {
//   //     localStorage.setItem(LIST_OF_CONTACTS, JSON.stringify(nextContacts));
//   //   }
//   // }

//   return (
//     <div className={css.div}>
//       <h1>Phonebook</h1>
//       <ContactForm submitHandler={formSubmitData} />

//       <h2>Contacts</h2>
//       <Filter onFilterChange={onFilterChange} filterInput={filter} />
//       <ContactList
//         filteredContacts={getFilteredContacts()}
//         onDeleteItem={onDeleteItem}
//       />
//     </div>
//   );
// };
