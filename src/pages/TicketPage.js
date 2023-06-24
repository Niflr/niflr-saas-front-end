import { useEffect, useState, memo } from 'react';
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
import { Add, AbcRounded } from '@mui/icons-material';
import { connect } from 'react-redux';
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
  resetDummyEvents,
  updateCartItemStatus,
  deleteCartItems,
  confirmEvents,
  cartconfirmed,
  dummyEventsSaved,
  fetchStoreProductsList,
} from '../actions';

const TicketPage = (props) => {
  const classes = useStyles();
  const [events, setEvents] = useState([]);
  const [dummyEvents, setDummyEvents] = useState([]);
  const [cart, setCart] = useState([]);
  const [videos, setVideos] = useState([]);
  const [products, setProducts] = useState(null);
  // const [isSaved,setIsSaved]= useState([]);
  useEffect(() => {
    // console.log("calling ticket use effect", props.ticket.ticket.video)
    window.history.pushState(null, null, `/tickets/${props.ticket.ticket.id}`);
    props.fetchVideoList(props.ticket.ticket.video);
    props.fetchEventList(props.ticket.ticket.weight_change_events);
    props.fetchCartList(props.ticket.ticket.id);
  }, [props.ticket]);

  useEffect(() => {
    // console.log("props.ticketsupdated:", props.event);
    setEvents(props.event.events);
  }, [props.event]);

  useEffect(() => {
    // console.log("props.dummy events updated:", props.dummyEvent);
    setDummyEvents(props.dummyEvent.dummyEvents);
  }, [props.dummyEvent]);

  useEffect(() => {
    // console.log("props.cart updated:", props.cart);
    setCart(props.cart.cartItems);
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
    // props.eventSaved()
    // props.ticketSaved()
    const events = getEventIdsByStatus('checked', props.event.events.events);
    props.cartSaved();
    const cart = props.cart.cartItems;
    props.updateEventStatus({ status: 'saved', event_ids: events });
    props.createCart(props.ticket.ticket.id, { TicketId: props.ticket.ticket.id, cartItems: cart });
    // props.updateDummyEventStatus({"status":"saved", "event_ids":events})
    // props.updateCartItemStatus()
    props.dummyEventsSaved();
    props.eventsSaved();
    // console.log("handledd save button")
  };

  const getEventIdsByStatus = (status, events) => {
    // console.log("   inside getCheckedEventIds", status)
    const checkedEvents = events.filter((event) => event.status === status);
    const checkedEventIds = checkedEvents.map((event) => event.id);
    return checkedEventIds;
  };

  const handleConfirmButtonClick = () => {
    props.setModalState({
      visible: true,
      modalName: 'confirmTicket',
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
  };

  // const handleSaveButtonClick =()=>{

  // }

  const handleClearButtonClick = () => {
    props.deleteCartItems(props.ticket.ticket.id);
    const events = getEventIdsByStatus('saved', props.event.events.events);
    props.updateEventStatus({ status: 'processing', event_ids: events });
    props.cartCleared();
    props.resetEvents();
    props.resetDummyEvents();

    console.log('handled Clear button');
  };

  const handleDummyEvents = async () => {
    console.log('store ID', props.ticket.ticket.store_Id);
    await props.fetchStoreProductsList({ locationId: props.ticket.ticket.store_Id });
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
  // console.log("inside video page")
  return (
    <Container maxWidth={false} className={classes.pageContainer}>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={6} md={8} className={classes.leftContainer}>
          <Paper className={classes.videoContainer}>
            {props.video.status === 'fetched' ? (
              <VideoSlider
                // videos={videos}
                handleAddEvent={handleDummyEvents}
              />
            ) : (
              <span
                style={{
                  display: 'flex',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                }}
              >
                No Video Available
              </span>
            )}
          </Paper>

          <div className={classes.cartScroller}>
            <Typography
              variant="h6"
              gutterBottom
              className={classes.header}
              style={{ alignSelf: 'flex-start', marginTop: '10px', fontSize: '1.5rem', width: '20%' }}
            >
              Cart
            </Typography>
            <Paper className={classes.cartContainer}>
              <div className={classes.cartDivs}>{cart ? <CartContainer /> : null}</div>
            </Paper>
            <div className={classes.cartButtons}>
              <IconButton
                style={{
                  // position: 'absolute',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                }}
                onClick={handleDummyEvents}
              >
                <Add />
              </IconButton>
              <IconButton
                style={{
                  // position: 'absolute',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                }}
                onClick={handleClearButtonClick}
              >
                <AbcRounded />
              </IconButton>
            </div>
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
              ) : null}
            </Paper>
            <div className={classes.eventButtons}>
              <IconButton
                style={{
                  position: 'absolute',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                }}
                onClick={handleSaveButtonClick}
              >
                <Add />
              </IconButton>
            </div>
          </div>

          <Typography variant="h6" gutterBottom className={classes.header}>
            Dummy Events
          </Typography>
          <div className={classes.eventScroller}>
            <Paper className={classes.eventContainer}>
              <div>{dummyEvents ? <DummyEventContainer /> : null}</div>
            </Paper>
            <div className={classes.eventButtons}>
              <IconButton
                style={{
                  position: 'absolute',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                }}
                onClick={handleDummyEvents}
              >
                <Add />
              </IconButton>
            </div>
          </div>

          <Paper className={classes.buttonContainer}>
            {/* <Button variant='contained' color='primary' onClick={handleSaveButtonClick}>
                            Save Cart
                        </Button>  */}
            <Button
              variant="contained"
              color="success"
              style={{ color: 'white', height: '3rem' }}
              onClick={handleConfirmButtonClick}
            >
              Confirm Ticket
            </Button>
            <Button
              variant="contained"
              color="error"
              style={{ color: 'white', height: '3rem' }}
              onClick={handleClearButtonClick}
            >
              Delete Cart
            </Button>
            {/* <Button variant='contained' color='primary' onClick={handleDummyEvents}>
                            ADD dummy event
                        </Button>  */}
          </Paper>
        </Grid>
      </Grid>

      {props.modal.visible ? (
        <div>
          <ModalWrapper />
        </div>
      ) : null}
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
})(TicketPage);
