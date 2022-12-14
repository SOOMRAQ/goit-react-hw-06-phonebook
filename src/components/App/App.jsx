import React from 'react';
import { nanoid } from 'nanoid';
import Form from 'components/Form';
import ContactsList from 'components/ContactsList';
import Filter from 'components/Filter';
import PhonebookSection from 'components/Section/Section';
import { StyledContainer } from './App.styled';
import { Notify } from 'notiflix';
import Modal from 'components/Modal/Modal';
import IconButton from 'components/IconButton';
import { ReactComponent as CloseIcon } from '../../icons/close.svg';
import { ReactComponent as AddIcon } from '../../icons/add.svg';
import { useState } from 'react';
import { useEffect } from 'react';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    parsedContacts && setContacts(parsedContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const formSubmitHandler = data => {
    const { name } = data;
    contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())
      ? Notify.failure(`${data.name} is already in contacts`)
      : setContacts([
          {
            id: nanoid(),
            ...data,
          },
          ...contacts,
        ]);
  };

  const filterChangeHandler = event => {
    const { value } = event.target;
    setFilter(value);
  };

  const filterResultsHandler = () => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const onDeleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  return (
    <>
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <IconButton
            onClick={toggleModal}
            aria-label="Close Modal"
            style={{ backgroundColor: 'transparent', alignSelf: 'flex-end' }}
          >
            <CloseIcon width="20" height="20" />
          </IconButton>
          <Form onSubmit={formSubmitHandler} />
        </Modal>
      )}
      <StyledContainer>
        <PhonebookSection title="Phonebook">
          <IconButton
            onClick={toggleModal}
            aria-label="Open Modal"
            style={{ backgroundColor: 'green' }}
          >
            <AddIcon width="20" height="20" fill="#fff" />
          </IconButton>
        </PhonebookSection>
        <PhonebookSection title="Contacts">
          <Filter value={filter} onChange={filterChangeHandler} />
          <ContactsList
            contacts={filterResultsHandler()}
            onDeleteContact={onDeleteContact}
          />
        </PhonebookSection>
      </StyledContainer>
    </>
  );
};

export default App;
