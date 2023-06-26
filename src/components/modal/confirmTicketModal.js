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
    setStatus('');
    setWeightChangeEvent('');
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
    // add all dummy events to db
    console.log('checking dummyevents', props.dummyEvent);
    props.createDummyEvents(props.ticket.ticket.id, {
      ticket_id: props.ticket.ticket.id,
      dummyEvents: props.dummyEvent.dummyEvents.dummyEvents,
    });
    const order = ordercreator();
    console.log('checking order', order);
    // create an order for the cart
    props.createUserOrder(props.ticket.ticket.user_id, {
      items: order,
      addressId: props.ticket.ticket.store_Id,
    });

    // confirm the order
    // props.confirmUserOrder()
    // updating tikcet status

    props.updateTicketStatus(props.ticket.ticket.id, { status: 'confirmed', ticket_id: props.ticket.ticket.id });

    // update event status in db

    const events = getEventIdsByStatus('saved', props.event.events.events);
    props.updateEventStatus({ status: 'confirmed', event_ids: events });

    // props.updateDummyEventStatus({"status":"confirmed", "event_ids":dummyEvents})
    // console.log("updating cart item status")
    // update cart item status in db
    props.updateCartItemStatus(props.ticket.ticket.id, { status: 'confirmed', TicketId: props.ticket.ticket.id });
    // update event status in state
    props.confirmEvents();
    // update cart item status in state
    props.cartconfirmed();
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
          justifyContent: 'space-between',
          alignItems: 'center' 
        }}
        >
        <h2 
        className={classes.header} 
        // style={{ alignSelf: 'center' }}
        >
          Confirm Ticket
        
        </h2>
        <IconButton
                                        style={{
                                            borderRadius: '50%',
                                            backgroundColor: '#ffffff',
                                            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                                            
                                        }}
                                        // onClick={}
                                        >
                                <Close />
                            </IconButton>
        </div>
      

      <form  className={classes.form}>
      {/* <TextField label="ID" value={id} disabled fullWidth />
          alignItems: 'center',
          padding: '10px',
        }}
      >
        <h2
          className={classes.header}
          // style={{ alignSelf: 'center' }}
        >
          Confirm Ticket
        </h2>
        <IconButton
          style={{
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      </div>

      <form className={classes.form}>
        {/* <TextField label="ID" value={id} disabled fullWidth />
        <TextField label="Machine ID" value={machineId} disabled fullWidth />
        <TextField label="Scale ID" value={scaleId} disabled fullWidth />
        <TextField label="Ticket ID" value={ticketId} disabled fullWidth />
      <TextField label="Status" value={status} disabled fullWidth/> */}
        {/* <br /> */}
        {/* <TextField
        label="Weight Change Event"
        value={weightChange}
        onChange={(e) => setWeightChangeEvent(e.target.value)}
      /> */}
        {/* <br />
      <br /> */}
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
      </form>
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
})(AddConfirmTicketModal);
