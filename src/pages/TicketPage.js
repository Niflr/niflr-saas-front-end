import { useEffect, useState, memo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Box,
  Grid,
  Tab,
  Tabs,
  Paper,
  Typography,
  Container,
  CardMedia,
  CardContent,
  Card,
  Button,
  Stack,
  Divider,
  IconButton,
} from '@mui/material';
import { Add, AbcRounded, Clear } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
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
  const user = JSON.parse(window.localStorage.getItem('user'));
  console.log('current user', user);
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
  const isOrderGenerated = props.ticket.ticket.order_id;
  const racks = props.ticket.ticket.rack_map ? props.ticket.ticket.rack_map.rack_details : null;

  const [areAllItemsConfirmed, setAreAllItemsConfirmed] = useState(false);

  const [value, setValue] = useState(0);
  const [subValue, setSubValue] = useState(0);

  const [activeRack, setActiveRack] = useState(racks && racks.length > 0 ? racks[0].rack_id : null);
  const [activeRackCameras, setActiveRackCameras] = useState([]);

  const [selectedCamera, setSelectedCamera] = useState(null);

  useEffect(() => {
    // Find the primary camera from the activeRackCameras array
    const primaryCamera = activeRackCameras.find((camera) => camera.primary);
    if (primaryCamera) {
      setSelectedCamera(primaryCamera); // Set the primary camera as the default selected camera
    }
  }, [activeRackCameras]);

  useEffect(() => {
    // Assuming you have a function to get the active rack's data by its ID
    const activeRackData = racks ? racks.find((rack) => rack.rack_id === activeRack) : null;

    if (activeRackData) {
      setActiveRackCameras(activeRackData.rack_cameras);
    }
  }, [activeRack]);

  const handlePrimaryTabChange = (event, newValue) => {
    setValue(newValue);
    // setSubValue(newValue); // Reset the selected tab in the secondary set
  };

  const handleSecondaryTabChange = (event, newValue) => {
    setSubValue(newValue);
    // setSubValue(newValue); // Reset the selected tab in the secondary set
  };

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
    console.log('CART ITEMS INSIDE TICKET PAGE: ', cart);
    if (props.cart.cartItems) {
      const allConfirmed = props.cart.cartItems.every((item) => item.status === 'CONFIRMED');
      setAreAllItemsConfirmed(allConfirmed);
    } else {
      // If props.cart.cartItems is undefined, set the allConfirmed state to false or handle it as needed.
      setAreAllItemsConfirmed(false);
    }
  }, [props.cart]);

  useEffect(() => {
    console.log('UPDATING props.video updated:', props.video);
    setVideos(props.video.videos);
  }, [props.video]);

  const getEventIdsByStatus = (status, events) => {
    const checkedEvents = events.filter((event) => event.status === status);
    const checkedEventIds = checkedEvents.map((event) => event.id);
    return checkedEventIds;
  };

  const getEventsByStatus = (status, events) => {
    const checkedEvents = events.filter((event) => event.status === status);
    const checkedEventNameAndId = checkedEvents.map((event) => ({
      id: event.id,
      name: event.variant_name,
      quantity: event.quantity,
    }));
    console.log('CHECKED EVENT NAMES AND IDS: ', checkedEventNameAndId);
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
      });

      console.log('handled confirm button');
    }
  };

  const handleEventSaveButtonClick = () => {
    const events = getEventsByStatus('checked', props.event.events.events);

    console.log('CHECKED EVENTS: ', events);
    if (events.length > 0) {
      setSelectedEvents(events);

      props.setModalState({
        visible: true,
        modalName: 'eventAddToCart',
        modalContent: events,
      });

      props.updateEventStatus({ status: 'ADDED_TO_CART', event_ids: events.map((event) => event.id) });
    } else {
      alert('Please select some events first!');
    }
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
      props.setModalState({
        visible: true,
        modalName: 'dummyEventAddToCart',
        modalContent: sortedEvents,
      });
    } else {
      alert('Please select some dummy events first!');
    }
  };

  const handleRackItemClick = (rack) => {
    setActiveRack(rack.rack_id);
    setActiveRackCameras(rack.rack_cameras);
    setSelectedCamera(null); // Reset the selected camera

    console.log('active rack cameras', activeRackCameras);
  };

  const handleCameraClick = (camera) => {
    setSelectedCamera(camera); // Set the selected camera
  };
  console.log('selected camera', selectedCamera);
  console.log(activeRackCameras, 'activeRackCameras');
  const handleClearButtonClick = () => {
    setIsDeletingCart(true);
    const events = getEventIdsByStatus('ADDED_TO_CART', props.event.events.events);
    const dummyEvents = getEventIdsByStatus('ADDED_TO_CART', props.dummyEvent.dummyEvents.dummyEvents);
    if (events.length === 0 && dummyEvents.length === 0) {
      alert('No events to delete!');
    } else {
      props.updateEventStatus({ status: 'processing', event_ids: events });
      props.updateDummyEventStatus({ status: 'processing', event_ids: dummyEvents });

      props.cartCleared();

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

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const filteredVideos =
    selectedCamera && videos.videos ? videos.videos.filter((video) => video.cam_name === selectedCamera.rtmp_path) : [];

  console.log(filteredVideos, 'filtered videos');
  console.log('TICKET PAGE PROPS: ', props);
  console.log('SELECTED EVENTS: ', selectedEvents);

  console.log('CART', cart);
  console.log('VIDEOS: ', videos);
  return (
    <Container maxWidth={false} className={classes.pageContainer}>
      <Grid container spacing={0} style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        <Grid item xs={12} sm={6} md={8} className={classes.leftContainer}>
          <div style={{ display: 'flex', justifyContent: 'space-evenly', gap: '5px', padding: '10px' }}>
            <Typography variant="h6">User: {props.ticket.ticket.user_id}</Typography>
            <Typography variant="h6">Entry: {new Date(props.ticket.ticket.start_time).toLocaleString()}</Typography>
            <Typography variant="h6">Exit: {new Date(props.ticket.ticket.end_time).toLocaleString()}</Typography>
          </div>
          <Box sx={{ display: 'flex', borderBottom: 1, borderColor: 'divider', justifyContent: 'space-between' }}>
            <Tabs value={value} onChange={handlePrimaryTabChange} aria-label="basic tabs example">
              <Tab label="Primary View" {...a11yProps(0)} />{' '}
              <Tabs value={value} onChange={handlePrimaryTabChange} aria-label="basic tabs example" />
              <Tab label="ReID View" {...a11yProps(1)} disabled />
              <Tab label="Grid View" {...a11yProps(2)} disabled />
            </Tabs>
          </Box>

          <Paper className={classes.videoContainer}>
            {filteredVideos.length > 0 ? (
              <VideoSlider videos={filteredVideos} handleAddEvent={handleDummyEvents} />
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
                {selectedCamera ? 'No Video Available for Selected Camera' : 'No Videos Available'}
              </span>
            )}
          </Paper>
          {racks && (
            <div
              style={{
                padding: '5px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.6)',
                overflowX: 'auto',
                whiteSpace: 'nowrap',
              }}
            >
              <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                {racks.map((rack) => (
                  <Button
                    style={{
                      backgroundColor: rack.rack_id === activeRack ? '#2065D1' : 'white',
                      color: rack.rack_id === activeRack ? 'white' : '#2065D1',
                    }}
                    key={rack.rack_id}
                    onClick={() => handleRackItemClick(rack)}
                  >
                    {rack.rack_name}
                  </Button>
                ))}
              </Stack>
            </div>
          )}
          {activeRack && (
            <div
              style={{
                padding: '5px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.6)',
                overflowX: 'auto',
                whiteSpace: 'nowrap',
              }}
            >
              <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                {activeRackCameras.map((camera) => (
                  <Button
                    key={camera.id}
                    style={{
                      backgroundColor: camera.primary ? 'green' : '#622A0F',
                      color: 'white',
                      fontWeight: selectedCamera === camera ? 'bold' : 'normal', // Highlight the selected camera
                    }}
                    onClick={() => handleCameraClick(camera)} // Handle camera selection
                  >
                    {camera.rtmp_path}
                  </Button>
                ))}
              </Stack>
            </div>
          )}
        </Grid>

        <Grid item xs={12} sm={6} md={4} className={classes.rightContainer}>
          <div>
            <Typography variant="h6" gutterBottom className={classes.header}>
              Events
            </Typography>
            <Paper className={classes.eventContainer}>
              {props.event.events.events && props.event.events.events.length > 0 ? (
                <div>
                  <EventContainer />
                </div>
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
                  No Events
                </span>
              )}
            </Paper>
            {isOrderGenerated ? null : (
              <div className={classes.eventButtons}>
                <Button variant="contained" color="primary" onClick={handleEventSaveButtonClick}>
                  Review & Add To Cart
                </Button>
              </div>
            )}
          </div>
          <div>
            <Typography variant="h6" gutterBottom className={classes.header}>
              Dummy Events
            </Typography>
            <div>
              <Paper className={classes.eventContainer}>
                {props.dummyEvent.count > 0 ? (
                  <DummyEventContainer />
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
                    No Dummy Events
                  </span>
                )}
              </Paper>
              {isOrderGenerated ? null : (
                <div className={classes.eventButtons}>
                  <Button variant="contained" color="primary" onClick={handleDummyEvents} disabled={isAddingVariant}>
                    {isAddingVariant ? 'Hold on..' : 'Add Variant'}
                  </Button>

                  <Button variant="contained" color="primary" onClick={handleDummyEventSaveButtonClick}>
                    Add To Cart
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div>
            <Typography variant="h6" gutterBottom className={classes.header}>
              User Cart
            </Typography>
            <Paper className={classes.cartContainer}>
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
            </Paper>
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
