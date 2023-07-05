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
  dummyEventAddToCart,
  // confirmUserOrder,
} from '../../actions/index';

const useStyles = makeStyles(() => ({
  paper: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    height: '80%',
    width: '100%',
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
  },
  header: {
    paddingLeft: '5px',
    // textAlign: 'center',
    // alignSelf: 'center'
  },
}));

const generateRandomId = () => {
  return Math.floor(Math.random() * 10000000000);
};

const DummyAddToCartModal = (props) => {
  const classes = useStyles();
  const [status, setStatus] = useState('processing');
  const [weightChange, setWeightChangeEvent] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  console.log('ADD DUMMY TO CART PROPS: ', props);
  // const id = props.event.events.events.id;

  const machineId = generateRandomId();
  const scaleId = generateRandomId();
  const [ticketId, setTicketID] = useState(props.ticketId);
  // const [selectedEvents, setSelectedEvents] = useState([]);

  const handleClose = () => {
    setStatus('');
    setWeightChangeEvent('');
    props.closeModal();
  };
  const handleCheckboxChange = () => {
    // props.eventChecked(id);
    setIsChecked(!isChecked);
  };

  const handleEventSelection = (eventId) => {
    const updatedSelectedEvents = [...props.selectedEvents];

    if (updatedSelectedEvents.includes(eventId)) {
      // Deselect event
      const index = updatedSelectedEvents.indexOf(eventId);
      updatedSelectedEvents.splice(index, 1);
    } else {
      // Select event
      updatedSelectedEvents.push(eventId);
    }

    // setSelectedEvents(updatedSelectedEvents);
  };

  const handleDummyConfirmButtonClick = () => {
    // Add selected events to the cart
    // You can implement the logic to add the events to the cart
    // using the selectedEvents array

    // ... implement the logic to add events to the cart ...

    console.log('reviewing modal conent props', props.selectedEvents);
    // Close the modal
    props.dummyEventAddToCart();

    if (props.selectedEvents.length > 0) {
      console.log('makging db sync');
      props.createDummyEvents(props.ticket.ticket.id, {
        ticket_id: props.ticket.ticket.id,
        dummyEvents: props.selectedEvents,
      });
      handleClose();
    }
  };

  console.log('Selected Events:', props.selectedEvents);
  return (
    <div className={classes.paper}>
      <div
        style={{
          width: '400px',
          height: '40%',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          marginTop: '20px',
          paddingLeft: '10px',
        }}
      >
        <h4 className={classes.header}>Are you sure you want to add these to cart?</h4>
      </div>
      {props.selectedEvents.map((selectedEvent) => {
        return (
          <div style={{ padding: '20px', fontSize: '1em' }}>
            <ul style={{ width: '100%' }}>
              <li style={{ display: 'flex', justifyContent: 'space-around' }}>
                {' '}
                {/* <Checkbox checked={isChecked} onChange={handleCheckboxChange} /> */}
                <div style={{ fontWeight: 'bold' }}>{selectedEvent.variantName}</div>
                <div>{selectedEvent.quantity}</div>
              </li>
            </ul>
          </div>
        );
      })}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
        <div
          style={{
            height: '50%',
            padding: '10px',
          }}
        >
          <Button variant="contained" color="primary" onClick={handleDummyConfirmButtonClick}>
            Confirm
          </Button>
        </div>
        <div
          style={{
            height: '50%',
            padding: '10px',
          }}
        >
          <Button variant="contained" color="primary" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </div>
      {/* <form className={classes.form}>

        <div
          style={{
            width: '100%',
            height: '50%',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px',
          }}
        >
          <Button variant="contained" color="primary" onClick={handleConfirmButtonClick}>
            Confirm
          </Button>
        </div>
      </form> */}
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
  dummyEventAddToCart,
  createUserOrder,
  createCart,
  // confirmUserOrder,
})(DummyAddToCartModal);
