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
    width: '250px',
    backgroundColor: '#fff',
    borderRadius: '10px',
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
  const price = props.product.price;
  const cgst = props.product.cgst;
  const igst = props.product.igst;
  const sgst = props.product.sgst;
  const cess = props.product.cess;
  const tax = props.product.cgst + props.product.sgst + props.product.igst + props.product.cess;
  const [status, setStatus] = useState('processing');
  const [weightChange, setWeightChangeEvent] = useState('');
  const [quantity, setQuantity] = useState(1);
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
    const quantityValue = parseInt(quantity, 10);

    props.addDummyEvent({
      id,
      ticketId,
      variantId,
      machineId,
      userId,
      status: 'processing',
      quantity: quantityValue,
      price,
      cgst,
      sgst,
      igst,
      cess,
      tax,
      variantName,
      imageUrl,
      createdAt,
    });
    // props.addToCart({ticketId,variantId,machineId,userId,status:"checked",quantity,variantName})

    props.closeModal();
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
          <TextField label="Variant Name" value={variantName} disabled fullWidth />
          <TextField label="Status" value={status} disabled fullWidth />

          <TextField label="Add Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />

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
    </div>
  );
};
const mapStateToProps = ({ cart, dummmyEvent }) => ({
  cart,
  dummmyEvent,
});

export default connect(mapStateToProps, { addDummyEvent, resetProduct, addToCart })(AddDummyEventModal);
