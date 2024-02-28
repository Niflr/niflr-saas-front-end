import React, { useState, useEffect } from 'react';
import { Chip } from '@mui/material';
import { connect } from 'react-redux';
import {
  updateEventStatus,
  updateDummyEventStatus,
  resetEventById,
  resetDummyEventById,
  removeFromCart,
  updateCartItemStatus,
} from '../../../actions';

const CartElement = (props) => {
  console.log("cart card props", props);
  const [price, setPrice] = useState(null);
  const [image, setImage] = useState(null);
  const variantName = props.data.variantName;
  const quantity = props.data.quantity;

  useEffect(() => {
    const event = props?.event?.events?.events?.find((event) => event.id === props.data.id);
    console.log("event inside cart card-->", event)
    if (event) {
      setPrice(event.price);
      setImage(event.variantImageUrl);
    }
  }, [props.data.id, props.event.events.events]);

  useEffect(() => {
    const dummyEvent = props?.dummyEvent?.dummyEvents?.dummyEvents?.find((dummyEvent) => dummyEvent.id === props.data.id);
    console.log("dummyevent inside cart card-->", dummyEvent)
    if (dummyEvent) {
      setPrice(dummyEvent.price);
      setImage(dummyEvent.variantImageUrl);
    }
  }, [props.data.id, props.dummyEvent.dummyEvents.dummyEvents]);


  return (
    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
      <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>

      <img height="50px" width="50px" src={image} alt="" />
      <div style={{ fontSize: '13px' }}>
        {variantName}
      </div>
      </div>
      <div style={{display: "flex"}}>
      {price && (
        <Chip size='small' label={`Price: ${price}`} />
        )}
      <Chip size='small' label={`Qty: ${quantity}`} />
        </div>
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
