import { React, useState, useEffect } from 'react';
import { Checkbox, Chip } from '@mui/material';
import { connect } from 'react-redux';
import { addToCart, removeFromCart, dummyEventChecked } from '../../../actions/index';

const EventElement = (props) => {
  console.log('checking dummy event element props', props);
  //   const { id, scale_id, machine_id, status } = event;
  const id = props.renderEvent.id;
  // console.log('render dummy event props', props);

  const status = props.renderEvent.status;
  const ticketId = props.cart.ticketId;
  const quantity = props.renderEvent.quantity;
  const variantName = props.renderEvent.variantName;
  const variantId = props.renderEvent.variantId;

  // console.log("variant id", variantId)
  const userId = props.renderEvent.user_id;
  const createdAt =  props.renderEvent.createdAt.split(", ")[1];
 
  console.log("created at:", createdAt)
  const variantImage = props.renderEvent.imageUrl || props.renderEvent.variantImageUrl;
  const [isChecked, setIsChecked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleCheckboxChange = () => {
    props.dummyEventChecked(id);
    setIsChecked(!isChecked);
  };


  useEffect(() => {
    switch (props.renderEvent.status) {
      case 'checked':
        console.log('renderevent status checked');
        setIsChecked(true);
        break;
      case 'CONFIRMED':
        console.log('renderevent status saved');
        setIsChecked(true);
        setIsSaved(true);
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
          props.addToCart({ id, status, ticketId, quantity, variantId, variantName, createdAt });
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
        <Checkbox checked={isChecked} onChange={handleCheckboxChange} disabled={isSaved} />
        <img height="50px" width="50px" src={variantImage} alt="" />
        <div style={{ fontSize: '13px' }}>
          {variantName}
        </div>
      </div>
      <div style={{display: 'flex'}}>
        {/* <Chip size='small' label={createdAt}/> */}
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
