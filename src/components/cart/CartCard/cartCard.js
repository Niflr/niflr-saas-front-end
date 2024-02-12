import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  IconButton,
  Typography,
  Chip,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import {
  updateEventStatus,
  updateDummyEventStatus,
  resetEventById,
  resetDummyEventById,
  removeFromCart,
  updateCartItemStatus,
} from '../../../actions';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '5px',
    border: '3px solid black',
    width: '100%',
  },
  media: {
    borderRadius: '50%',
    width: 100,
    height: 80,
    objectFit: 'cover',
  },
  tableContainer: {
    display: 'flex',
    gap: '10px',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '520px',
    height: '100%',
  },
  quantityContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    width: '100%',
  },
  quantityText: {
    // margin: theme.spacing(0, 1),
  },
}));

const CartElement = (props) => {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(parseInt(props.data.quantity, 10));
  //  useState(parseInt(data.Quantity, 10));

  const createdAt = new Date(props.data.createdAt).toLocaleString();
  console.log('CREATED AT: ', createdAt);

  const handleAddQuantity = () => {
    const updatedQuantity = quantity + 1;
    setQuantity(updatedQuantity);
    // props.addItemQuantity()
    // if (props.event.events.events.some((event) => props.data.id === event.id && event.status === 'ADDED_TO_CART')) {
    //   props.updateEventStatus({ qty: updatedQuantity, event_ids: [props.data.id] });
    //   // props.updateCartItemStatus(props.cart.ticketId, {qty: updatedQuantity})
    //   } else if (
    //     props.dummyEvent.dummyEvents.dummyEvents.some(
    //       (event) => props.data.id === event.id && event.status === 'ADDED_TO_CART'
    //     )) {
    //       props.updateDummyEventStatus({ qty: updatedQuantity, event_id: [props.data.id] });
    //   // props.updateCartItemStatus(props.cart.ticketId, {qty: updatedQuantity})

    //     } 

  };

  console.log('CART CARD PROPS: ', props);
  const removeItemButtonClick = () => {
    const cartEvent = props.data;
    if (props.event.events.events.some((event) => cartEvent.id === event.id && event.status === 'ADDED_TO_CART')) {
      props.updateEventStatus({ status: 'processing', event_ids: [cartEvent.id] });
      props.resetEventById(cartEvent.id);
      props.removeFromCart(cartEvent.id);
      alert('Cart Item Deleted Successfully!');
    } else if (
      props.dummyEvent.dummyEvents.dummyEvents.some(
        (event) => cartEvent.id === event.id && event.status === 'ADDED_TO_CART'
      )
    ) {
      props.updateDummyEventStatus({ status: 'processing', event_id: [cartEvent.id] });
      props.resetDummyEventById(cartEvent.id);
      props.removeFromCart(cartEvent.id);
      alert('Cart Item Deleted Successfully!');
    } else {
      alert('This cart item cannot be deleted!');
    }
  };
  // console.log("cart event.id", [])
  const handleSubtractQuantity = () => {
    const updatedQuantity = Math.max(quantity - 1, 0);
    setQuantity(updatedQuantity);
    if (props.event.events.events.some((event) => props.data.id === event.id && event.status === 'ADDED_TO_CART')) {
    props.updateEventStatus({ qty: updatedQuantity, event_ids: [props.data.id] });
    // props.updateCartItemStatus(props.cart.ticketId, {qty: updatedQuantity})
    } else if (
      props.dummyEvent.dummyEvents.dummyEvents.some(
        (event) => props.data.id === event.id && event.status === 'ADDED_TO_CART'
      )) {
        props.updateDummyEventStatus({ qty: updatedQuantity, event_id: [props.data.id] });
      // props.updateCartItemStatus(props.cart.ticketId, {qty: updatedQuantity})
      } 

  };
  console.log('ITEM DATA', props.data);
  return (
    <div style={{ display: 'flex',  width: '100%', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
      <div style={{ fontSize: '13px', cursor: 'pointer' }}>
        {props?.data?.variantName}
      </div>
      {props ? (
        <div style={{display: 'flex'}}>
      <Chip size='small' label="Price"/>
      <Chip size='small' label={`Qty: ${quantity}`}/>
    </div>
      ) : null
    }
  </div>
  );
};


const mapStateToProps = ({ cart, event, dummyEvent }) => ({
  cart,
  event,
  dummyEvent,
});

export default connect(mapStateToProps, {
  updateEventStatus,
  updateDummyEventStatus,
  resetEventById,
  resetDummyEventById,
  removeFromCart,
  updateCartItemStatus,
})(CartElement);
