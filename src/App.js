import './App.scss';
import Header from './components/Header';
import ModalAddNew from './components/ModalAddNew';
import TableUsers from './components/TableUsers';
import Container from 'react-bootstrap/Container'
// import { Row } from 'react-bootstrap';
import { useState } from 'react';

function App() {

  
  return (
    <div className='app-container'>
      <Header />
      <Container>
        <TableUsers />
      </Container>
      <ModalAddNew 
      />
    </div>
  );
}

export default App;
