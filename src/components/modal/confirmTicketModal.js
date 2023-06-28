import React, { useState } from 'react';
import { Button, Modal, TextField, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { connect } from 'react-redux';
import { makeStyles } from '@mui/styles';
import {
  addDummyEvent,
  updateEventStatus,
  createDummyEvents,
  updateCartItemStatus,
  updateTicketStatus,
  confirmEvents,
  cartconfirmed,
  cartCleared,
  createUserOrder,
  confirmUserOrder,
  dummyEventsSaved,
  eventsSaved,
  createCart,
  updateDummyEventStatus,
} from '../../actions/index';

const useStyles = makeStyles(() => ({
  paper: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    height: '150px',
    width: '300px',
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
  },
  header: {
    // textAlign: 'center',
    // alignSelf: 'center'
  },
  form: {
    width: '100%',
    height: '50%',
    display: 'flex',
    justifyContent: 'center',
    // alignItems: 'center',
  },
}));

const generateRandomId = () => {
  return Math.floor(Math.random() * 10000000000);
};

const AddConfirmTicketModal = (props) => {
  const classes = useStyles();
  const [status, setStatus] = useState('processing');
  const [weightChange, setWeightChangeEvent] = useState('');
  const id = generateRandomId();
  const machineId = generateRandomId();
  const scaleId = generateRandomId();
  const [ticketId, setTicketID] = useState(props.ticketId);
  const [cartItems, setCartItems] = useState(props.cart.cartItems);
  const handleClose = () => {
    // setStatus('');
    // setWeightChangeEvent('');
    props.closeModal();
  };

  const getEventIdsByStatus = (status, events) => {
    // console.log("   inside getCheckedEventIds", status)
    const checkedEvents = events.filter((event) => event.status === status);
    const checkedEventIds = checkedEvents.map((event) => event.id);
    return checkedEventIds;
  };
  const ordercreator = () => {
    console.log('inside order creator', cartItems);
    const newList = cartItems.map(({ variantId, quantity }) => ({
      variantId,
      qty: quantity,
    }));
    return newList;
  };

  const handleConfirmButtonClick = () => {
    console.log('checking dummyevents', props.dummyEvent);
    const events = getEventIdsByStatus('ADDED_TO_CART', props.event.events.events);
    const dummyEvents = getEventIdsByStatus('ADDED_TO_CART', props.dummyEvent.dummyEvents.dummyEvents);
    const cart = getEventIdsByStatus('ADDED_TO_CART', props.cart.cartItems);
    const sortedEvents = props.event.events.events
      .filter((event) => {
        if (Array.isArray(events)) {
          return events.includes(event.id) && event.status === 'ADDED_TO_CART';
        }
        return false;
      })
      .map((event) => ({ ...event, status: 'CONFIRMED' }));
    console.log('sorted dummy events', sortedEvents);
    props.eventsSaved();
    if (sortedEvents.length > 0) {
      props.updateEventStatus({ status: 'CONFIRMED', event_ids: events });

      // props.createCart(props.ticket.ticket.id, { TicketId: props.ticket.ticket.id, cartItems: sortedCart });
    }
    const sortedDummyEvents = props.dummyEvent.dummyEvents.dummyEvents
      .filter((event) => {
        if (Array.isArray(dummyEvents)) {
          return dummyEvents.includes(event.id) && event.status === 'ADDED_TO_CART';
        }
        return false;
      })
      .map((event) => ({ ...event, status: 'CONFIRMED' }));
    console.log('sorted dummy events', sortedDummyEvents);
    props.dummyEventsSaved();
    if (sortedDummyEvents.length > 0) {
      console.log('sorting dummy events');
      props.updateDummyEventStatus({ status: 'CONFIRMED', event_ids: dummyEvents });
      // props.createCart(props.ticket.ticket.id, { TicketId: props.ticket.ticket.id, cartItems: sortedCart });
    }

    const sortedCart = props.cart.cartItems
      .filter((event) => {
        if (Array.isArray(cart)) {
          return cart.includes(event.id) && event.status === 'ADDED_TO_CART';
        }
        return false;
      })
      .map((event) => ({ ...event, status: 'CONFIRMED' }));
    console.log('sorted cart', sortedCart);
    props.cartconfirmed();

    if (sortedCart.length > 0) {
      props.createCart(props.ticket.ticket.id, { TicketId: props.ticket.ticket.id, cartItems: sortedCart });
    }

    // props.updateDummyEventStatus({"status":"confirmed", "event_ids":dummyEvents})
    // console.log("updating cart item status")
    // update cart item status in db
    // props.updateCartItemStatus(props.ticket.ticket.id, { status: 'confirmed', TicketId: props.ticket.ticket.id });
    // update event status in state
    // props.confirmEvents();
    // update cart item status in state

    // props.cartCleared()
    // add dummy events to db status "confirmed"
    // add cart items to db if not already added chec kby ticekt id and variant id
    // clear cart state
    console.log('handled confirm button');
  };

  return (
    <div className={classes.paper}>
      <div
        style={{
          width: '100%',
          height: '50%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      >
        <h2
          className={classes.header}

          // style={{ alignSelf: 'center' }}
        >
          Confirm Ticket?
        </h2>
        {/* <IconButton
          style={{
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          }}
          // onClick={}
        >
          <Close />
        </IconButton> */}
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-evenly' }}>
        <div
          style={{
            height: '50%',
            padding: '10px',
          }}
        >
          <Button variant="contained" color="primary" onClick={handleConfirmButtonClick}>
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

      {/* <Button onClick={handleClose}>X</Button> */}
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
  confirmUserOrder,
  dummyEventsSaved,
  eventsSaved,
  createCart,
  updateDummyEventStatus,
})(AddConfirmTicketModal);
