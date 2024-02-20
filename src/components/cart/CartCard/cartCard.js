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
  const [price, setPrice] = useState(null);
  const variantName = props.data.variantName || props.data.variant_name;
  const quantity = props.data.quantity;

  useEffect(() => {
    const event = props.event.events.events.find((event) => event.id === props.data.id);
    if (event) {
      setPrice(event.price);
    }
  }, [props.data.id, props.event.events.events]);


  return (
    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
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
