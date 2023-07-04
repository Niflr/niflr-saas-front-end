import React, { useState, useEffect } from 'react';
import { Button, Modal, TextField, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { connect } from 'react-redux';
import { makeStyles } from '@mui/styles';
import ModalWrapper from './modalWrapper';
// import Loader from './confirmationModal';
// import Loader from './confirmationModal';
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
// import ModalWrapper from './modalWrapper';

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

  const getEventIdsByStatus = (status, events) => {
    console.log("   inside getCheckedEventIds", events)
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

  const handleConfirmClick = () => {
    console.log('setting isloading');
    props.setModalState({
      visible: false,
      modalName: 'loading',
      // modalContent: props.product.products.updatedVariants,
      isLoading: false,
    });
  };
  // const events = getEventIdsByStatus('ADDED_TO_CART', props.event.events.events);
  // const sortedEvents = props.event.events.events
  //   .filter((event) => {
  //     if (Array.isArray(events)) {
  //       return events.includes(event.id) && event.status === 'ADDED_TO_CART';
  //     }
  //     return false;
  //   })
  //   .map((event) => ({ ...event, status: 'CONFIRMED' }));
  // console.log('setting isloading', isLoading);
  // props.eventsSaved();
  // if (sortedEvents.length > 0) {
  //   props.updateEventStatus({ status: 'CONFIRMED', event_ids: events });

  // props.createCart(props.ticket.ticket.id, { TicketId: props.ticket.ticket.id, cartItems: sortedCart });
  // }

  // setTimeout(() => {
  //   console.log('timeout working');
  //   loadModal(false);
  //   return true;
  // }, 5000);

  const loadModal = (state) => {
    console.log('loading modal state', state);
    props.setModalState({ visible: state, isLoading: state });
  };
  const handleConfirmButtonClick = async () => {
    props.setModalState({
      visible: true,
      modalName: 'loading',
      isLoading: true,
    });
    // setTimeout(() => {
    //   console.log('timeout working');
    //   props.setModalState({
    //     visible: false,
    //     modalName: 'loading',
    //     // modalContent: props.product.products.updatedVariants,
    //     isLoading: false,
    //   });
    //   // loadModal(false);
    //   return true;
    // }, 5000);
    try {
      // console.log('checking dummyevents', props.dummyEvent);
      const events = getEventIdsByStatus('ADDED_TO_CART', props.event.events.events);
      const dummyEvents = getEventIdsByStatus('ADDED_TO_CART', props.dummyEvent.dummyEvents.dummyEvents);
      const userCart = getEventIdsByStatus('ADDED_TO_CART', props.cart.cartItems);
      console.log("userCart", userCart)
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
          if (Array.isArray(userCart)) {
            console.log("finding user cart",event)
            return userCart.includes(event.id) && event.status === 'ADDED_TO_CART';
          }
          return false;
        })
        .map((event) => ({ ...event, status: 'CONFIRMED' }));
      console.log('sorted cart', sortedCart);
      props.cartconfirmed();

      if (sortedCart.length > 0) {

        props.createCart(props.ticket.ticket.id, { TicketId: props.ticket.ticket.id, cartItems: sortedCart });
            // const sortedCart = props.cart.cartItems.filter(item => item.status === "ADDED_TO_CART");
        const sortedOrder = [];

        sortedCart.forEach(item => {
          console.log("checking sorted order",item )
          sortedOrder.push({
            variantId: item.variantId,
            quantity: parseInt(item.quantity, 10)
          });
        });
        console.log("sorted order inplemented",sortedOrder)
        // calliing create oder request
        props.createUserOrder({userId:props.ticket.ticket.user_id, ticketId:props.ticket.ticket.id, items:sortedOrder})

    


    // props.createCart(props.ticket.ticket.id, { TicketId: props.ticket.ticket.id, cartItems: sortedCart });
      }
      console.log('handled confirm button');
      // setTimeout(() => {
      //   console.log('timeout working');
      props.setModalState({
        visible: true,
        modalName: 'loading',
        // modalContent: props.product.products.updatedVariants,
        isLoading: false,
      });
      // loadModal(false);
      // return true;
      // }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.paper}>
      {props.modal.isLoading ? (
        <ModalWrapper />
      ) : (
        <div>
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

          <div
            style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-evenly' }}
          >
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
        </div>
      )}
      {/* <Button onClick={handleClose}>X</Button> */}
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
