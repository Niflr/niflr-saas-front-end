import { React, useState, memo, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { ExpandMoreOutlined } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
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

  // console.log("variant id", variantId)
  const userId = props.renderEvent.user_id;
  const createdAt = props.renderEvent.createdAt;
  const variantImage = props.renderEvent.imageUrl;
  const [isChecked, setIsChecked] = useState(false);

  const [accordionProps, setAccordionProps] = useState({ disabled: false });
  const [expanded, setExpanded] = useState(false);
  const handleCheckboxChange = () => {
    props.dummyEventChecked(id);
    setIsChecked(!isChecked);
  };

  const handleAccordionChange = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    switch (props.renderEvent.status) {
      case 'checked':
        console.log('renderevent status checked');
        setAccordionProps({ disabled: false });
        // setIsChecked(true);
        break;
      case 'CONFIRMED':
        console.log('renderevent status saved');
        setAccordionProps({ disabled: true });
        setIsChecked(true);
        break;
      case 'ADDED_TO_CART':
        console.log('renderevent status processing');
        setAccordionProps({ disabled: true });
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
    <Accordion {...accordionProps} expanded={expanded} onChange={handleAccordionChange}>
      <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
        <div
          style={{ display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'center', alignItems: 'center' }}
        >
          <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
          <img height="50px" width="50px" src={variantImage} alt="" />
          <Typography variant="h6">{variantName}</Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        {/* <Typography>ID: {id}</Typography> */}
        <Typography>Quantity: {quantity}</Typography>
        <Typography>Status: {status}</Typography>
        <Typography>Time: {createdAt}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

const mapStateToProps = ({ cart, ticket }) => ({
  cart,
  ticket,
});

export default connect(mapStateToProps, { addToCart, removeFromCart, dummyEventChecked })(EventElement);
