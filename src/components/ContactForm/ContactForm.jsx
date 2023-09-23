import { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';


class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  nameId = nanoid();
  numberId = nanoid();

  onInputChange = evt => {
    const { name, value } = evt.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  onFormSubmit = e => {
    e.preventDefault();
    this.props.submitHandler(this.state);
     this.reset()
  };

  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <label htmlFor={this.nameId}>Name</label>
        <input className={css.input}
          value={this.state.name}
          onChange={this.onInputChange}
          id={this.nameId}
          type="text"
          name="name"
          // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <label htmlFor={this.numberId}>Number</label>
        <input
          value={this.state.number}
          onChange={this.onInputChange}
          id={this.numberId}
          type="tel"
          name="number"
          // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <button type="submit" className={css.button}>Add contact</button>
      </form>
    );
  }
}

export default ContactForm;
