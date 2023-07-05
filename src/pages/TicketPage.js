import { useEffect, useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  box,
  Grid,
  Paper,
  Typography,
  Container,
  CardMedia,
  CardContent,
  Card,
  Button,
  IconButton,
} from '@mui/material';
import { Add, AbcRounded, Clear } from '@mui/icons-material';
import { connect } from 'react-redux';
import AddToCartModal from '../components/modal/addToCartModal';

import EventContainer from '../components/events/EventContainer/eventContainer';
import CartContainer from '../components/cart/CartContainer/cartContainer';
import DummyEventContainer from '../components/dummyEvents/EventContainer/eventContainer';
import { useStyles } from './styles';
import VideoSlider from '../components/videoSlider/videoSlider';
import ModalWrapper from '../components/modal/modalWrapper';

// actions
import {
  fetchEventList,
  fetchCartList,
  fetchVideoList,
  cartSaved,
  cartCleared,
  setModalState,
  updateCartTicket,
  eventsSaved,
  ticketConfirmed,
  resetEvents,
  updateTicketStatus,
  updateEventStatus,
  createCart,
  addToCart,
  resetDummyEvents,
  updateCartItemStatus,
  deleteCartItems,
  confirmEvents,
  cartconfirmed,
  dummyEventsSaved,
  fetchStoreProductsList,
  eventAddToCart,
  dummyEventAddToCart,
  updateDummyEventStatus,
  createDummyEvents,
  fetchDummyEventList,
} from '../actions';

const TicketPage = (props) => {
  // console.log(ticketId, 'ticket_id');
  const classes = useStyles();
  const [events, setEvents] = useState([]);
  const [dummyEvents, setDummyEvents] = useState([]);
  const [cart, setCart] = useState([]);
  const [videos, setVideos] = useState([]);
  const [products, setProducts] = useState(null);

  const [selectedEvents, setSelectedEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeletingCart, setIsDeletingCart] = useState(false);
  const [isAddingVariant, setIsAddingVariant] = useState(false);

  const [areAllItemsConfirmed, setAreAllItemsConfirmed] = useState(false);
  const isOrderGenerated = props.ticket.ticket.order_id;
  // const [isSaved,setIsSaved]= useState([]);
  // const updatedCartItems = props.cart.cartItems.map((item) => {
  //   const event = props.event.events.events.find((event) => event.id === item.event_id);
  //   return {
  //     ...item,
  //     variant_name: event ? event.variant_name : '',
  //   };
  // });

  // // Now the updatedCartItems array contains the variant_name field
  // console.log('UPDATED CART ITEMS: ', updatedCartItems);
  useEffect(() => {
    const url = `tickets/${props.ticket.ticket.id}`;
    window.history.pushState(null, null, url);
    return () => {
      window.history.pushState(null, null, '/dashboard/tickets');
    };
  }, []); // Empty dependency array ensures that the effect runs only once

  useEffect(() => {
    props.fetchVideoList(props.ticket.ticket.video);
    props.fetchEventList(props.ticket.ticket.weight_change_events);
    props.fetchDummyEventList([props.ticket.ticket.id]);
    props.fetchCartList(props.ticket.ticket.id);
  }, [props.ticket]);
  console.log('FETCHING CART LIST: ', props.ticket.ticket.id);
  useEffect(() => {
    // console.log("props.ticketsupdated:", props.event);
    setEvents(props.event.events);
  }, [props.event]);
  console.log('EVENTS: ', events);
  useEffect(() => {
    console.log('dummy events updated:', props.dummyEvent);
    setDummyEvents(props.dummyEvent.dummyEvents);
  }, [props.dummyEvent]);

  useEffect(() => {
    // console.log("props.cart updated:", props.cart);
    setCart(props.cart.cartItems);
    const allConfirmed = props.cart.cartItems.every((item) => item.status === 'CONFIRMED');
    setAreAllItemsConfirmed(allConfirmed);
  }, [props.cart]);

  useEffect(() => {
    console.log('UPDATING props.video updated:', props.video);
    setVideos(props.video.videos);
  }, [props.video]);

  // useEffect(() => {
  //     console.log("props.isSaved updated:", props.cart.isSaved);
  //     setVideos(props.cart.isSaved);
  //   }, [props.cart]);

  // const renderVideoSlider =(videos)=>{
  //     console.log("inside render video slider",videos)
  //     return <VideoSlider videos ={videos} handleAddEvent={handleDummyEvents}/>
  // }

  const handleSaveButtonClick = () => {
    props.setModalState({
      visible: true,
      modalName: 'addToCart',
      // modalContent: props.ticket.ticket.id
    });
    // props.eventSaved()
    // props.ticketSaved()
    // const events = getEventIdsByStatus('checked', props.event.events.events);
    // props.cartSaved();
    // const cart = props.cart.cartItems;
    // props.updateEventStatus({ status: 'saved', event_ids: events });
    // props.createCart(props.ticket.ticket.id, { TicketId: props.ticket.ticket.id, cartItems: cart });
    // props.updateDummyEventStatus({"status":"saved", "event_ids":events})
    // props.updateCartItemStatus()
    // props.dummyEventsSaved();
    // props.eventsSaved();
    // console.log("handledd save button")
  };

  const getEventIdsByStatus = (status, events) => {
    // console.log("   inside getCheckedEventIds", status)
    const checkedEvents = events.filter((event) => event.status === status);
    const checkedEventIds = checkedEvents.map((event) => event.id);
    return checkedEventIds;
  };

  const getEventNameByStatus = (status, events) => {
    const checkedEvents = events.filter((event) => event.status === status);
    const checkedEventNameAndId = checkedEvents.map((event) => ({
      id: event.id,
      name: event.variant_name,
    }));
    console.log('CHECKED EVENT NAMES AND IDS: ', checkedEventNameAndId);
    return checkedEventNameAndId;
  };

  const getDummyEventNameByStatus = (status, events) => {
    const checkedEvents = events.filter((event) => event.status === status);
    const checkedEventNameAndId = checkedEvents.map((event) => ({
      id: event.id,
      name: event.variantName,
    }));
    console.log('CHECKED DUMMY EVENTS: ', checkedEventNameAndId);
    return checkedEventNameAndId;
  };

  const handleConfirmButtonClick = () => {
    console.log('CART ITEMS: ', props.cart.cartItems);
    if (props.cart.cartItems.length === 0) {
      alert('Error: Empty Cart!');
    } else {
      // setIsLoading(true);
      props.setModalState({
        visible: true,
        modalName: 'confirmTicket',
        isLoading: false,
        // modalContent: props.ticket.ticket.id
      });

      // const events=getEventIdsByStatus("saved",props.event.events.events)
      // props.updateEventStatus({"status":"confirmed", "event_ids":events})
      // // props.updateDummyEventStatus({"status":"confirmed", "event_ids":dummyEvents})
      // console.log("updating cart item status")
      // props.updateCartItemStatus(props.ticket.ticket.id,{"status":"confirmed","TicketId":props.ticket.ticket.id})
      // props.updateTicketStatus( props.ticket.ticket.id,
      //     {"status": "confirmed",
      //     "ticket_id": props.ticket.ticket.id}
      //      )
      // props.confirmEvents()
      // props.cartconfirmed()

      console.log('handled confirm button');
      // setIsLoading(false);
    }
  };

  // const handleSaveButtonClick =()=>{

  // }

  const handleEventSaveButtonClick = () => {
    const events = getEventNameByStatus('checked', props.event.events.events);
    console.log('CHECKED EVENTS: ', events);
    if (events.length > 0) {
      setSelectedEvents(events);

      props.setModalState({
        visible: true,
        modalName: 'eventAddToCart',
        modalContent: events,
      });

      // props.eventAddToCart();
      props.updateEventStatus({ status: 'ADDED_TO_CART', event_ids: events.map((event) => event.id) });
      // props.addToCart()
    } else {
      alert('Please select some events first!');
      // Display an error message or take any appropriate action
    }
    // props.addToCart()
  };

  const handleDummyEventSaveButtonClick = () => {
    const events = getEventIdsByStatus('checked', props.dummyEvent.dummyEvents.dummyEvents);
    const sortedEvents = props.dummyEvent.dummyEvents.dummyEvents
      .filter((event) => {
        if (Array.isArray(events)) {
          return events.includes(event.id) && event.status === 'checked';
        }
        return false;
      })
      .map((event) => ({ ...event, status: 'ADDED_TO_CART' }));

    // console.log('CHECKED DUMMY EVENTS: ', events);
    if (sortedEvents.length > 0) {
      // setSelectedEvents(events);
      props.setModalState({
        visible: true,
        modalName: 'dummyEventAddToCart',
        modalContent: sortedEvents,
      });
      // props.updateDummyEventStatus({ status: 'ADDED_TO_CART', event_ids: events.map((event) => event.id) });
    } else {
      alert('Please select some dummy events first!');
    }
    // const sortedEvents = props.dummyEvent.dummyEvents.dummyEvents
    //   .filter((event) => {
    //     if (Array.isArray(events)) {
    //       return events.includes(event.id) && event.status === 'checked';
    //     }
    //     return false;
    //   })
    //   .map((event) => ({ ...event, status: 'ADDED_TO_CART' }));
    // console.log('sorted events', sortedEvents);
    // props.dummyEventAddToCart();
  };

  const handleClearButtonClick = () => {
    setIsDeletingCart(true);
    const events = getEventIdsByStatus('ADDED_TO_CART', props.event.events.events);
    const dummyEvents = getEventIdsByStatus('ADDED_TO_CART', props.dummyEvent.dummyEvents.dummyEvents);
    if (events.length === 0 && dummyEvents.length === 0) {
      alert('No events to delete!');
    } else {
      // re setting events in backend db
      props.updateEventStatus({ status: 'processing', event_ids: events });
      props.updateDummyEventStatus({ status: 'processing', event_ids: dummyEvents });
      // props.deleteCartItems(props.ticket.ticket.id);
      // clearing cart in global state

      props.cartCleared();
      // clearing events and dummy events in global state
      props.resetEvents();
      props.resetDummyEvents();
      alert('Cart Items Deleted Successfully!');
    }
    setIsDeletingCart(false);
  };

  const handleDummyEvents = async () => {
    setIsAddingVariant(true);
    console.log('store ID', props.ticket.ticket.store_Id);
    await props.fetchStoreProductsList({ machineId: props.ticket.ticket.machine_id });
    setIsAddingVariant(false);
  };

  useEffect(() => {
    if (props.product.products.updatedVariants) {
      props.setModalState({
        visible: true,
        modalName: 'viewStoreProducts',
        modalContent: props.product.products.updatedVariants,
      });
    }
  }, [props.product]);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to /dashboard/tickets when going back to this page
    const handlePopState = () => {
      navigate('/dashboard/tickets');
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
  console.log('TICKET PAGE PROPS: ', props);
  console.log('SELECTED EVENTS: ', selectedEvents);
  console.log('props.eventAddToCart', props.eventAddToCart);
  // console.log("inside video page")
  console.log('CART', cart);
  console.log('VIDEOS: ', videos);
  return (
    <Container maxWidth={false} className={classes.pageContainer}>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={6} md={8} className={classes.leftContainer}>
          <Paper className={classes.videoContainer}>
            {props.video.count > 0 ? (
              <VideoSlider videos={videos} handleAddEvent={handleDummyEvents} />
            ) : (
              <span
                style={{
                  display: 'flex',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'black',
                }}
              >
                No Video Available
              </span>
            )}
          </Paper>

          <Typography
            variant="h6"
            gutterBottom
            className={classes.header}
            style={{ alignSelf: 'flex-start', marginTop: '10px', fontSize: '1.5rem', width: '20%' }}
          >
            User Cart
          </Typography>
          <div className={classes.cartScroller}>
            <Paper className={classes.cartContainer}>
              {/* <div className={classes.cartDivs}> */}
              {cart && cart.length > 0 ? (
                <CartContainer />
              ) : (
                <span
                  style={{
                    display: 'flex',
                    height: '100%',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'black',
                  }}
                >
                  No items added to Cart yet
                </span>
              )}
              {/* </div> */}
            </Paper>
            {/* <div className={classes.cartButtons}>
       
              <IconButton
                style={{
                  // position: 'absolute',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                }}
                onClick={() => {
                  if (areAllItemsConfirmed) {
                    return alert('Cannot remove confirmed items from cart!');
                  }

                  return handleClearButtonClick;
                }}
              >
                <Clear />
              </IconButton>
            </div> */}
          </div>
        </Grid>

        <Grid item xs={12} sm={6} md={4} className={classes.rightContainer}>
          <Typography variant="h6" gutterBottom className={classes.header}>
            Events
          </Typography>
          <div className={classes.eventScroller}>
            <Paper className={classes.eventContainer}>
              {events ? (
                <div>
                  <EventContainer />
                </div>
              ) : (
                <span
                  style={{
                    display: 'flex',
                    height: '100%',
                    width: '100%',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    color: 'black',
                  }}
                >
                  No Events
                </span>
              )}
            </Paper>
          </div>
          {isOrderGenerated ? null : (
            <div className={classes.eventButtons} style={{ backgroundColor: 'white' }}>
              <div
                style={{
                  position: 'absolute',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                }}
              >
                <Button variant="contained" color="primary" onClick={handleEventSaveButtonClick}>
                  Review & Add To Cart
                </Button>
              </div>
            </div>
          )}
          <div style={{ marginTop: '10px', height: '100%', maxHeight: '35vh' }}>
            <Typography variant="h6" gutterBottom className={classes.header}>
              Dummy Events
            </Typography>
            <div className={classes.eventScroller}>
              <Paper className={classes.eventContainer}>
                <div>
                  {props.dummyEvent.count > 0 ? (
                    <DummyEventContainer />
                  ) : (
                    <Typography>No Dummy Events Available</Typography>
                  )}
                </div>
              </Paper>
              {isOrderGenerated ? null : (
                <div className={classes.eventButtons} style={{ backgroundColor: 'white' }}>
                  <div
                    style={{
                      position: 'relative',
                      borderRadius: '4px',
                      backgroundColor: '#ffffff',
                      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    }}
                  >
                    <Button variant="contained" color="primary" onClick={handleDummyEvents} disabled={isAddingVariant}>
                      {isAddingVariant ? 'Hold on..' : 'Add Variant'}
                    </Button>
                  </div>

                  <div
                    style={{
                      position: 'relative',
                      borderRadius: '50%',
                      backgroundColor: '#ffffff',
                      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    }}
                  >
                    <Button variant="contained" color="primary" onClick={handleDummyEventSaveButtonClick}>
                      Add To Cart
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <Paper className={classes.buttonContainer}>
            <Button
              variant="contained"
              color="success"
              style={{ color: 'white', height: '3rem' }}
              onClick={handleConfirmButtonClick}
              disabled={isOrderGenerated}
            >
              {isOrderGenerated ? 'Order Already Generated' : 'Confirm Order'}
            </Button>
            {isOrderGenerated ? null : (
              <Button
                variant="contained"
                color="error"
                style={{ color: 'white', height: '3rem' }}
                onClick={handleClearButtonClick}
                disabled={isDeletingCart}
              >
                {isDeletingCart ? 'Clearing..' : 'Clear Cart'}
              </Button>
            )}
          </Paper>
        </Grid>
      </Grid>
      {(isDeletingCart || isAddingVariant) && <div className={classes.overlay} />}
      {props.modal.visible && props.modal.modalName === 'eventAddToCart' ? (
        <ModalWrapper modalContent={selectedEvents} addToCartAction={props.eventAddToCart} />
      ) : props.modal.visible ? (
        <div>
          <ModalWrapper />
        </div>
      ) : (
        console.log('null condition')
      )}
    </Container>
  );
};

const mapStateToProps = ({ event, isloading, cart, video, ticket, modal, dummyEvent, product }) => ({
  event,
  isloading,
  cart,
  video,
  ticket,
  modal,
  dummyEvent,
  product,
});

export default connect(mapStateToProps, {
  fetchEventList,
  fetchVideoList,
  cartSaved,
  cartCleared,
  setModalState,
  updateCartTicket,
  eventsSaved,
  ticketConfirmed,
  resetEvents,
  updateTicketStatus,
  updateEventStatus,
  createCart,
  fetchCartList,
  resetDummyEvents,
  updateCartItemStatus,
  deleteCartItems,
  confirmEvents,
  cartconfirmed,
  dummyEventsSaved,
  fetchStoreProductsList,
  eventAddToCart,
  addToCart,
  dummyEventAddToCart,
  updateDummyEventStatus,
  createDummyEvents,
  fetchDummyEventList,
})(TicketPage);
