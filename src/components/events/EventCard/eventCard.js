import {React, useState,memo,useEffect} from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography,Checkbox,FormControlLabel } from '@mui/material';
import {ExpandMoreOutlined, OneKPlusOutlined} from '@mui/icons-material';
import {connect} from 'react-redux';
import {addToCart,removeFromCart,eventChecked } from '../../../actions/index'


const EventElement = (props) => {
  console.log("checking event element props", props.renderEvent)
const id=props.renderEvent.id;
const scaleId=props.renderEvent.scale_id;
const machineId=props.renderEvent.machine_id;
const status=props.renderEvent.status;
const weightChange=props.renderEvent.weight_change;
const ticketId =props.event.events.ticketId
const [isChecked, setIsChecked] = useState(false);
const [isSaved, setIsSaved] = useState(false);
const [accordionProps,setAccordionProps] =useState({ disabled: false });


const handleCheckboxChange = () => {
  props.eventChecked(id);
  setIsChecked(!isChecked);
};


useEffect(() => {
  console.log("calling event use effect", isChecked)
  if(isChecked){
    console.log("checking event use effect in chekd",isChecked)
  }
  else {
  console.log("delete from cart function called")
  props.removeFromCart({id})
}
}, [isChecked]);

useEffect((  ) => {
  if(isSaved){
    console.log("checking event use effect in saved",isSaved)
    props.addToCart({id, scaleId, status, machineId, weightChange, ticketId})
  }
  else {
  console.log("delete from cart function called")
  props.removeFromCart({id})
}
},[isSaved])

useEffect (()=>{
  switch(props.renderEvent.status){
    case "confirmed":
      console.log("renderevent status saved")
      setAccordionProps({ disabled: true })
      setIsChecked(true);
      break
    case "saved":
      console.log("renderevent status saved")
      setAccordionProps({ disabled: true })
      setIsSaved(true);
      break
    case "processing":
      console.log("renderevent status processing")
        setAccordionProps({ disabled: false })
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
  >
    <AccordionSummary expandIcon={<ExpandMoreOutlined />} >
      <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
      <Typography>ID: {id}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>Scale ID: {scaleId}</Typography>
      <Typography>Machine ID: {machineId}</Typography>
      <Typography>Status: {status}</Typography>
    </AccordionDetails>
  </Accordion>
);
};

const mapStateToProps =({ cart,event}) =>({
  cart,event 
})

export default connect(mapStateToProps, {addToCart,removeFromCart,eventChecked})(EventElement) ;