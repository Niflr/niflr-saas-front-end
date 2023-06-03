import {React, useState,memo,useEffect} from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography,Checkbox,FormControlLabel } from '@mui/material';
import {ExpandMoreOutlined} from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import {connect} from 'react-redux';
import {addToCart,removeFromCart,dummyEventChecked} from '../../../actions/index'

const EventElement = (props) => {
  console.log("checking dummy event element props", props.renderEvent)
//   const { id, scale_id, machine_id, status } = event;
const id=props.renderEvent.id;
const scaleId=props.renderEvent.scaleId;
const machineId=props.renderEvent.machineId;
const status=props.renderEvent.status;
// const weightChange=props.renderEvent.weightChange;
const ticketId =props.renderEvent.ticketId
const quantity =props.renderEvent.quantity
const variantName =props.renderEvent.variantName
const variantId =props.renderEvent.variantId
const userId = props.renderEvent.userId;
const [isChecked, setIsChecked] = useState(true);
// const [isSaved, setIsSaved]= useState(false);
const [accordionProps,setAccordionProps] =useState({ disabled: false });
const [expanded, setExpanded] = useState(false);
const handleCheckboxChange = () => {
  // console.log("checking event", !isChecked)
  // if (!!isChecked){
  //   console.log("checking event", !!isChecked)
    props.dummyEventChecked(id);
  //   setIsChecked(!isChecked);
  // }
  setIsChecked(!isChecked);
  
};

const handleAccordionChange = () => {
  console.log("seeing expaned")
  // setAccordionProps({expanded:!expanded})
  setExpanded(!expanded)
};

useEffect(() => {
  console.log("calling event use effect", isChecked)
  if(isChecked){
    console.log("checking event use effect in chekd",isChecked)
    // setAccordionProps({ disabled: true })

    props.addToCart({ticketId,variantId,machineId,userId,status:"checked",quantity,variantName})
  }
  else {
    // setAccordionProps({ disabled: false })
  console.log("delete from cart function called")
  props.removeFromCart({id})
}
}, [isChecked]);
// console.log("inside events",props)
// const accordionProps = isChecked ? { disabled: true } : {};
useEffect (()=>{
  switch(props.renderEvent.status){
    case "confirmed":
      console.log("renderevent status confirmed")
      setAccordionProps({ disabled: true})
      setIsChecked(true);
      break
    case "saved":
      console.log("renderevent status saved")
      setAccordionProps({ disabled: true })
      break
    case "processing":
      console.log("renderevent status processing")
        setAccordionProps({ disabled: false})
        props.removeFromCart({id}) 
        // setIsChecked(!isChecked); // remove if you want the check to still be there after cart cleared
      break
      default:
        break
  }
  
}, [ props.renderEvent.status])
return (
  <Accordion 
  {...accordionProps}
  expanded={expanded}
  onChange={handleAccordionChange}
  >
    <AccordionSummary expandIcon={<ExpandMoreOutlined />} >
      <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
      <Typography>{variantName}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>Quantity: {quantity}</Typography>
      <Typography>Status: {status}</Typography>
      <Typography>time: {status}</Typography>
    </AccordionDetails>
  </Accordion>
);
};

const mapStateToProps =({ cart,ticket}) =>({
  cart,ticket
})

export default connect(mapStateToProps, {addToCart,removeFromCart,dummyEventChecked})(EventElement) ;