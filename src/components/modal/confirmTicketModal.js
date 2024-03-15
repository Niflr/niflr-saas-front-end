import React, { useState, useEffect } from 'react';
import { Button, Modal, TextField, IconButton } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';
import { makeStyles } from '@mui/styles';
import ModalWrapper from './modalWrapper';

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
  // confirmUserOrder,
  dummyEventsSaved,
  eventsSaved,
  createCart,
  updateDummyEventStatus,
  setModalState,
} from '../../actions/index';

const useStyles = makeStyles(() => ({
  paper: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    width: 'auto',
    height: 'auto', 
    padding: '10px', 
    maxWidth: '100%', 
    maxHeight: '90vh', 
    overflow: 'auto', 
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
  cartItem: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'space-between',
    padding: '10px 0',
  },
}));


const AddConfirmTicketModal = (props) => {
  console.log("confirm tkt props", props);
  const navigate = useNavigate();

  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(props.modal.isLoading);
  }, [props.modal.isLoading]);

  useEffect(() => {
    console.log('checking isloading', isLoading);
    // setIsLoading(props.modal.isLoading);
  }, [isLoading]);

  const handleClose = () => {
    // setStatus('');
    // setWeightChangeEvent('');
    props.closeModal();
  };

  const getEventPrice = (eventId) => {
    const event = props?.event?.events?.events?.find((event) => event.id === eventId);
    const dummyEvent = props.dummyEvent.dummyEvents.dummyEvents.find((dummyEvent) => dummyEvent.id === eventId);
    if (event && event.events_status) {
        return event.price;
      }
    return dummyEvent && dummyEvent.price ? dummyEvent.price : null;
  };

  const getEventIdsByStatus = (status, events) => {
    console.log('   inside getCheckedEventIds', events);
    const checkedEvents = events.filter((event) => event.status === status);
    const checkedEventIds = checkedEvents.map((event) => event.id);
    return checkedEventIds;
  };

  const handleConfirmButtonClick = async () => {
    props.setModalState({
      visible: true,
      modalName: 'loading',
      isLoading: true,
    });

    try {
      // console.log('checking dummyevents', props.dummyEvent);
      const events = getEventIdsByStatus('ADDED_TO_CART', props.event.events.events);
      const dummyEvents = getEventIdsByStatus('ADDED_TO_CART', props.dummyEvent.dummyEvents.dummyEvents);
      console.log('user dummy events', dummyEvents);
      const userCart = getEventIdsByStatus('ADDED_TO_CART', props.cart.cartItems);
      console.log('userCart', userCart);

      const sortedEvents = props.event.events.events
        .filter((event) => {
          if (Array.isArray(events)) {
            return events.includes(event.id) && event.status === 'ADDED_TO_CART';
          }
          return false;
        })
        .map((event) => ({ ...event, status: 'CONFIRMED' }));
      console.log('sorted  events', sortedEvents);
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
        props.updateDummyEventStatus({ status: 'CONFIRMED', event_id: dummyEvents });
        // props.createCart(props.ticket.ticket.id, { TicketId: props.ticket.ticket.id, cartItems: sortedCart });
      }

      const sortedCart = props.cart.cartItems
        .filter((event) => {
          if (Array.isArray(userCart)) {
            console.log('finding user cart', event);
            return userCart.includes(event.id) && event.status === 'ADDED_TO_CART';
          }
          return false;
        })
        .map((event) => ({ ...event, status: 'CONFIRMED' }));
      console.log('sorted cart', sortedCart);
      props.cartconfirmed();

      if (sortedCart.length > 0) {
        props.createCart(props.ticket.ticket.id, { ticketId: props.ticket.ticket.id, cartItems: sortedCart });
        // const sortedCart = props.cart.cartItems.filter(item => item.status === "ADDED_TO_CART");
        const sortedOrder = [];

        sortedCart.forEach((item) => {
          console.log('checking sorted order', item);
          sortedOrder.push({
            variantId: item.variantId,
            qty: parseInt(item.quantity, 10),
            variantName: item.variantName,
          });
        });
        console.log('sorted order inplemented', sortedOrder);
        // calliing create oder request
        props.createUserOrder({
          userId: props.ticket.ticket.user_id,
          ticketId: props.ticket.ticket.id,
          items: sortedOrder,
          storeId: props.ticket.ticket.storeId,
        });

        // props.createCart(props.ticket.ticket.id, { TicketId: props.ticket.ticket.id, cartItems: sortedCart });
      }
      console.log('handled confirm button');

      await props.setModalState({
        visible: true,
        modalName: 'loading',
        // modalContent: props.product.products.updatedVariants,
        isLoading: false,
      });
      setTimeout(() => navigate("/dashboard/tickets"), 3000);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("props.cartItems", props.cartItems)
  return (
    <div className={classes.paper}>
      {props.modal.isLoading ? (
        <ModalWrapper />
      ) : (
        <div className={classes.paper}>
        <div
          style={{
            marginBottom: '20px', 
          }}
        >
          <h4 className={classes.header}>Are you sure you want to confirm this order?</h4>
        </div>
        {props.cartItems.filter(item => item.ticketId === props.cart.ticketId).map((cartItem) => (
          <div key={cartItem.id} className={classes.cartItem}>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <img height="50px" width="50px" src={cartItem.variantImage} alt="" />
            <div>{cartItem.variantName} x <strong>{cartItem.quantity}</strong></div>
            </div>
            <div> <strong>{getEventPrice(cartItem.id)}</strong> </div>
            {/* <div>{cartItem.quantity}</div> */}
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
      )}
    </div>
  );
};

const mapStateToProps = ({ cart, dummyEvent, event, ticket, order, modal }) => ({
  cart,
  dummyEvent,
  event,
  ticket,
  order,
  modal,
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
  // confirmUserOrder,
  dummyEventsSaved,
  eventsSaved,
  createCart,
  updateDummyEventStatus,
  setModalState,
})(AddConfirmTicketModal);
