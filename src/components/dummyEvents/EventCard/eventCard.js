import { React, useState, useEffect } from 'react';
import { Checkbox, Chip } from '@mui/material';
import { connect } from 'react-redux';
import { addToCart, removeFromCart, dummyEventChecked } from '../../../actions/index';

const EventElement = (props) => {
  console.log('checking dummy event element props', props.renderEvent);
  //   const { id, scale_id, machine_id, status } = event;
  const id = props.renderEvent.id;
  // console.log('render dummy event props', props);

  const status = props.renderEvent.status;
  const ticketId = props.renderEvent.ticket_id;
  const quantity = props.renderEvent.quantity;
  const variantName = props.renderEvent.variant_name || props.renderEvent.variantName;
  const variantId = props.renderEvent.variant_id || props.renderEvent.variantId;
  const price = props.renderEvent.price;
  const cgst = props.renderEvent.cgst;
  const sgst = props.renderEvent.sgst;
  const igst = props.renderEvent.igst;
  const cess = props.renderEvent.cess;
  const tax = props.renderEvent.tax;
  // console.log("variant id", variantId)
  const userId = props.renderEvent.user_id;
  // const createdAt = new Date(props.renderEvent.createdAt).toLocaleTimeString();
  const createdAtString = props.renderEvent.createdAt; // e.g., "13/02/2024, 01:41:41"
  const parts = createdAtString.split(/[/, :]/); // Split by "/", ",", and ":"

  // parts is now ["13", "02", "2024", " 01", "41", "41"]
  // Note: months are 0-indexed in JavaScript Date (0 = January, 11 = December)
  let createdAt = new Date(Date.UTC(parts[2], parts[1] - 1, parts[0], parts[3], parts[4], parts[5]));

  // Now you can use toLocaleTimeString() or any other method to format the date
  createdAt = createdAt.toLocaleTimeString();
  
  const variantImage = props.renderEvent.imageUrl;
  const [isChecked, setIsChecked] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const handleCheckboxChange = () => {
    props.dummyEventChecked(id);
    setIsChecked(!isChecked);
  };


  useEffect(() => {
    switch (props.renderEvent.status) {
      case 'checked':
        console.log('renderevent status checked');
        // setIsChecked(true);
        break;
      case 'CONFIRMED':
        console.log('renderevent status saved');
        setIsChecked(true);
        break;
      case 'ADDED_TO_CART':
        console.log('renderevent status processing');
        // props.addToCart({id, status, ticketId})
        // props.removeFromCart({id})
        if (props.cart.cartItems.some((item) => item.id === id)) {
          // If the id exists in cart.cartItems, call props.removeFromCart()
          console.log('already in cart');
          // props.removeFromCart({ id });
        } else {
          // If the id does not exist in cart.cartItems, call props.addToCart()
          props.addToCart({ id, status, ticketId, quantity, variantId, price, cgst, sgst, igst, cess, tax, variantName, variantImage, createdAt });
        }

        setIsChecked(true); // remove if you want the check to still be there after cart cleared
        break;
      default:
        break;
    }
  }, [props.renderEvent.status]);
  return (
    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
        <img height="50px" width="50px" src={variantImage} alt="" />
        <div style={{ fontSize: '13px', cursor: 'pointer' }}>
          {variantName}
        </div>
      </div>
      <div style={{display: 'flex'}}>
        <Chip size='small' label={createdAt}/>
        <Chip size='small' label={`Qty: ${quantity}`}/>
      </div>
    </div>
  );
};

const mapStateToProps = ({ cart, ticket }) => ({
  cart,
  ticket,
});

export default connect(mapStateToProps, { addToCart, removeFromCart, dummyEventChecked })(EventElement);
