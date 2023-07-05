import { React, useState, memo, useEffect } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Checkbox,
  FormControlLabel,
  CardMedia,
} from '@mui/material';
import { ExpandMoreOutlined, OneKPlusOutlined } from '@mui/icons-material';
import { connect } from 'react-redux';
import { addToCart, removeFromCart, eventChecked } from '../../../actions/index';

const EventElement = (props) => {
  console.log('checking event element props', props.renderEvent);
  const id = props.renderEvent.id;
  const scaleId = props.renderEvent.scale_id;
  const machineId = props.renderEvent.machine_id;
  const status = props.renderEvent.status;
  const weightChange = props.renderEvent.weight_change;
  const ticketId = props.event.events.ticketId;
  const variantId = props.renderEvent.variant_id;
  const quantity = props.renderEvent.quantity;
  const variantName = props.renderEvent.variant_name || props.renderEvent.variantName;
  const variantImage = props.renderEvent.variant_img;
  const createdAt = new Date(props.renderEvent.createdAt).toLocaleString();
  const [isChecked, setIsChecked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [accordionProps, setAccordionProps] = useState({ disabled: false });

  const handleCheckboxChange = () => {
    props.eventChecked(id);
    setIsChecked(!isChecked);
  };

  // useEffect(() => {
  //   console.log("calling event use effect", isChecked)
  //   if(isChecked){
  //     console.log("checking event use effect in chekd",isChecked)
  //   }
  //   else {
  //   console.log("delete from cart function called")
  //   props.removeFromCart({id})
  // }
  // }, [isChecked]);

  // useEffect((  ) => {
  //   if(isSaved){
  //     console.log("checking event use effect in saved",isSaved)
  //     props.addToCart({id, scaleId, status, machineId, weightChange, ticketId})
  //   }
  //   else {
  //   console.log("delete from cart function called")
  //   // props.removeFromCart({id})
  // }
  // },[isSaved])

  useEffect(() => {
    switch (props.renderEvent.status) {
      case 'checked':
        console.log('renderevent status checked', isChecked);
        setAccordionProps({ disabled: false });

        // setIsChecked(!isChecked);
        break;
      case 'CONFIRMED':
        console.log('renderevent status saved');
        setAccordionProps({ disabled: true });
        setIsChecked(true);
        break;

      case 'processing':
        console.log('renderevent status processing');
        setAccordionProps({ disabled: false });
        // props.removeFromCart({id})
        // setIsChecked(!isChecked); // remove if you want the check to still be there after cart cleared
        break;
      case 'ADDED_TO_CART':
        console.log('renderevent status ADDED_TO_CART');
        setAccordionProps({ disabled: true });
        console.log('event id:', id);
        if (props.cart.cartItems.some((item) => item.id === id)) {
          // If the id exists in cart.cartItems, call props.removeFromCart()
          console.log('event already in cart', id);
          // props.removeFromCart({ id });
        } else {
          // If the id does not exist in cart.cartItems, call props.addToCart()
          props.addToCart({
            id,
            scaleId,
            status,
            machineId,
            weightChange,
            ticketId,
            variantId,
            quantity,
            createdAt,
            variantName,
          });
        }

        // props.removeFromCart({id})
        setIsChecked(true); // remove if you want the check to still be there after cart cleared
        break;
      default:
        break;
    }
  }, [props.renderEvent.status]);
  return (
    <Accordion {...accordionProps}>
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
        <Typography>ID: {id}</Typography>

        <Typography>Scale ID: {scaleId}</Typography>
        <Typography>Machine ID: {machineId}</Typography>
        {status ? <Typography>Status: {status}</Typography> : null}
        <Typography>Time: {createdAt}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

const mapStateToProps = ({ cart, event }) => ({
  cart,
  event,
});

export default connect(mapStateToProps, { addToCart, removeFromCart, eventChecked })(EventElement);
