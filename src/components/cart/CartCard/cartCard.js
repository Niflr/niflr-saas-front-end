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
  const variantName = props.data.variantName || props.data.variant_name;
  const quantity = props.data.quantity;

  useEffect(() => {
    const event = props?.event?.events?.events?.find((event) => event.id === props.data.id);
    if (event) {
      setPrice(event.price);
      setImage(event.variant_img);
    }
  }, [props.data.id, props.event.events.events]);

  useEffect(() => {
    const dummyEvent = props?.dummyEvent?.dummyEvents?.dummyEvents?.find((dummyEvent) => dummyEvent.id === props.data.id);
    if (dummyEvent) {
      setPrice(dummyEvent.price);
      setImage(dummyEvent.image_url);
    }
  }, [props.data.id, props.dummyEvent.dummyEvents.dummyEvents]);


  return (
    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
      <img height="50px" width="50px" src={image} alt="" />
      <div style={{ fontSize: '13px', cursor: 'pointer' }}>
        {variantName}
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
