import React, { useState } from 'react';
import { Button, Modal, TextField } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { addDummyEvent, resetProduct, addToCart } from '../../actions/index';

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
  },
  header: {
    textAlign: 'center',
    padding: '20px',
  },
  form: {
    width: '80%',
    margin: '0 auto',
  },
}));

const AddDummyEventModal = (props) => {
  console.log('add dummy event props', props);
  const classes = useStyles();
  const { variantName, variantId } = props.product;

  const machineId = props.ticket.machine_id;
  const userId = props.ticket.user_id;
  const ticketId = props.ticket.id;
  const imageUrl = props.product.primaryImageUrl;
  const [status, setStatus] = useState('processing');
  const [weightChange, setWeightChangeEvent] = useState('');
  const [quantity, setQuantity] = useState(0);
  const handleClose = () => {
    setStatus('');
    setWeightChangeEvent('');
    props.closeModal();
  };
  const generateId = () => {
    // Generate a random ID using a library or algorithm of your choice
    // For example, using a simple timestamp-based ID generator
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 10000);
    return `${timestamp}-${randomNum}`;
  };

  // const generateUUID = () => {
  //   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
  //     const r = (Math.random() * 16) | 0,
  //       v = c == 'x' ? r : (r & 0x3) | 0x8;
  //     return v.toString(16);
  //   });
  // };
  const handleSave = () => {
    props.resetProduct();
    const id = uuidv4();
    const createdAt = new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    props.addDummyEvent({
      id,
      ticketId,
      variantId,
      machineId,
      userId,
      status: 'processing',
      quantity,
      variantName,
      imageUrl,
      createdAt,
    });
    // props.addToCart({ticketId,variantId,machineId,userId,status:"checked",quantity,variantName})

    props.closeModal();

    // reset the product state
    // console.log({ id, machineId, scaleId, ticketId, status, weightChange });
    //  if(props.ticketId){

    //   props.addDummyEvent({id,scaleId,status:"checked",machineId,weightChange,ticketId});
    //  }
    // TODO: Handle saving the event with the generated IDs and input values
  };

  return (
    <div className={classes.paper}>
      <h2 className={classes.header}>Add Dummy Event</h2>
      <form className={classes.form}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            padding: '10px',
            width: '200px',
          }}
        >
          <TextField label="variant name" value={variantName} disabled fullWidth />
          <TextField label="Status" value={status} disabled fullWidth />

          <TextField label="add Quantity" value={weightChange} onChange={(e) => setWeightChangeEvent(e.target.value)} />

          <div style={{ display: 'flex', gap: '4px', alignItems: 'center', justifyContent: 'center' }}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save Event
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClose}>
              Close
            </Button>
          </div>
        </div>
      </form>
      {/* <Button onClick={handleClose}>X</Button> */}
    </div>
  );
};
const mapStateToProps = ({ cart, dummmyEvent }) => ({
  cart,
  dummmyEvent,
});

export default connect(mapStateToProps, { addDummyEvent, resetProduct, addToCart })(AddDummyEventModal);
