import React, { useState } from 'react';
import { Button, Modal, TextField, IconButton, Checkbox } from '@mui/material';
import { Close } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import Typography from '../../theme/typography';

import {
  addDummyEvent,
  updateEventStatus,
  createDummyEvents,
  updateCartItemStatus,
  updateTicketStatus,
  confirmEvents,
  cartconfirmed,
  cartCleared,
  createCart,
  createUserOrder,
} from '../../actions/index';

const useStyles = makeStyles(() => ({
  paper: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    width: 'auto',
    height: 'auto', 
    padding: '20px', 
    maxWidth: '90%', 
    maxHeight: '90vh', 
    overflow: 'auto', 
  },
  header: {
    paddingLeft: '5px',
  },
  eventItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
  },
}));


const generateRandomId = () => {
  return Math.floor(Math.random() * 10000000000);
};

const AddToCartModal = (props) => {
  const classes = useStyles();
  const [status, setStatus] = useState('processing');
  const [weightChange, setWeightChangeEvent] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleClose = () => {
    setStatus('');
    setWeightChangeEvent('');
    props.closeModal();
  };

  const handleConfirmButtonClick = () => {
    props.eventAddToCart();
    handleClose();
  };

  return (
    <div className={classes.paper}>
      <div
        style={{
          marginBottom: '20px', // Add margin for spacing
        }}
      >
        <h4 className={classes.header}>Are you sure you want to add these to cart?</h4>
      </div>
      {props.selectedEvents.map((selectedEvent) => (
        <div key={selectedEvent.id} className={classes.eventItem}>
          <div>{selectedEvent.name}</div>
          <div>{selectedEvent.quantity}</div>
        </div>
      ))}
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        <Button variant="contained" color="primary" onClick={handleConfirmButtonClick}>
          Confirm
        </Button>
        <Button variant="contained" color="primary" onClick={handleClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ cart, dummyEvent, event, ticket, order }) => ({
  cart,
  dummyEvent,
  event,
  ticket,
  order,
});

export default connect(mapStateToProps, {
  addDummyEvent,
  updateEventStatus,
  updateCartItemStatus,
  updateTicketStatus,
  confirmEvents,
  cartconfirmed,
  cartCleared,
  createDummyEvents,
  createUserOrder,
  createCart,
})(AddToCartModal);
