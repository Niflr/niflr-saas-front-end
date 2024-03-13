/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { React, useState, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Checkbox, Chip } from '@mui/material';
import { ExpandMoreOutlined } from '@mui/icons-material';
import { connect } from 'react-redux';
import { Label, Icon, LabelDetail } from 'semantic-ui-react';
import { fToCanadaTime } from '../../../utils/formatTime';
import { addToCart, removeFromCart, eventChecked } from '../../../actions/index';

const EventElement = (props) => {
  console.log('checking event element props', props);
  const id = props.renderEvent.id;
  const scaleId = props.renderEvent.scale_id;
  const rackId = props.renderEvent.rackId;
  const machineId = props.renderEvent.machine_id;
  const status = props.renderEvent.status;
  const eventStatus = props.renderEvent.events_status;
  const weightChange = props.renderEvent.weight_change;
  const ticketId = props.cart.ticketId;
  const variantId = props.renderEvent.variantId;
  const quantity = props.renderEvent.quantity;
  const variantName = props.renderEvent.variantName;
  const variantImage = props.renderEvent.variantImageUrl;
  const itemRow = props.renderEvent.row;
  const itemColumn = props.renderEvent.column;
  const createdAt = fToCanadaTime(new Date(props.renderEvent.createdAt));
  console.log("event created at:", createdAt);
  const [isChecked, setIsChecked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleCheckboxChange = () => {
    props.eventChecked(id);
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    switch (props.renderEvent.status) {
      case 'checked':
        console.log('renderevent status checked', isChecked);
        setIsChecked(true);

        // setIsChecked(!isChecked);
        break;
      case 'CONFIRMED':
        console.log('renderevent status saved');
        setIsChecked(true);
        setIsSaved(true);
        break;

      case 'processing':
        console.log('renderevent status processing');
        // props.removeFromCart({id})
        // setIsChecked(!isChecked); // remove if you want the check to still be there after cart cleared
        break;
      case 'ADDED_TO_CART':
        console.log('renderevent status ADDED_TO_CART');
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
            variantImage
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
    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox checked={isChecked} onChange={handleCheckboxChange} disabled={isSaved} />
        <img height="50px" width="50px" src={variantImage} alt="" />
        <div style = {{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
          <div style={{ fontSize: '13px', color: eventStatus === 'PICKED' ? 'green' : 'red' }}>
            {variantName}
          </div>
          <div style={{display: 'flex'}}>
          {itemRow ? <Chip size='small' label={`Row ${itemRow}`}/> : null}
          {itemColumn ? <Chip size='small' label={`Column ${itemColumn}`}/>: null}
          </div>
        </div>
      </div>
      <div style={{display: 'flex'}}>
        <Chip size='small' label={createdAt}/>
        <Chip size='small' label={`Qty: ${quantity}`}/>
      </div>
    </div>
  );

};

const mapStateToProps = ({ cart, event }) => ({
  cart,
  event,
});

export default connect(mapStateToProps, { addToCart, removeFromCart, eventChecked })(EventElement);
