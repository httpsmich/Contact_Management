import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Contact {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
}

interface ContactContextType {
  contacts: Contact[];
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
  addContact: (contact: Omit<Contact, 'id'>) => void;
  deleteContact: (contactId: string) => void;
  deletedContacts: Contact[];
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export const useContactContext = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContactContext must be used within a ContactProvider');
  }
  return context;
};

interface ContactProviderProps {
  children: ReactNode;
}

export const ContactProvider: React.FC<ContactProviderProps> = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [deletedContacts, setDeletedContacts] = useState<Contact[]>([]);

  const addContact = (contact: Omit<Contact, 'id'>) => {
    const newContact = { ...contact, id: Math.random().toString(36).substr(2, 9) };
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const deleteContact = (contactId: string) => {
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== contactId));
    const deletedContact = contacts.find((contact) => contact.id === contactId);
    if (deletedContact) {
      setDeletedContacts((prevDeletedContacts) => [...prevDeletedContacts, deletedContact]);
    }
  };

  return (
    <ContactContext.Provider value={{ contacts, setContacts, addContact, deleteContact, deletedContacts }}>
      {children}
    </ContactContext.Provider>
  );
};
