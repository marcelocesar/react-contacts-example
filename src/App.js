import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import * as ContactAPI from './utils/ContactsAPI';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact'

class App extends Component {

  state = {
    contacts: [],
  }

  componentDidMount() {
    ContactAPI.getAll().then((contacts) => {
      this.setState({contacts})
    })
  }

  removeContact = (contact) => { 
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))

    ContactAPI.remove(contact)
  }


  createContact(contact) {
    ContactAPI.create(contact).then(contact => {
      this.setState(state => ({
        contacts: state.contacts.concat([ contact ])
      }))
    })
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <ListContacts 
            onDeleteContact={this.removeContact} 
            contacts={this.state.contacts} />
        )} />
        <Route path='/create'
           render={({ history }) => (
            <CreateContact 
              onCreateContact={(contact) => {
                this.createContact(contact);
                history.push('/');
              }}
            />
          )} />
      </div>
    )
  }
}

export default App;
