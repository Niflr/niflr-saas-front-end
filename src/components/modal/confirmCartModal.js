import React, { useState } from 'react';
import { Button, Modal, TextField, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { connect } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { addDummyEvent } from '../../actions/index';

const useStyles = makeStyles(() => ({
  paper: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    height: '150px',
    width: '300px',
  },
  header: {
    // textAlign: 'center',
    // alignSelf: 'center'
  },
  form: {
    width: '100%',
    height: '50%',
    display: 'flex',
    justifyContent: 'center',
    // alignItems: 'center',
  },
}));

const generateRandomId = () => {
  return Math.floor(Math.random() * 10000000000);
};

const AddDummyEventModal = (props) => {
  const classes = useStyles();
  const [status, setStatus] = useState('processing');
  const [weightChange, setWeightChangeEvent] = useState('');
  const id = generateRandomId();
  const machineId = generateRandomId();
  const scaleId = generateRandomId();
  const [ticketId, setTicketID] = useState(props.ticketId);
  const handleClose = () => {
    setStatus('');
    setWeightChangeEvent('');
    props.closeModal();
  };

  const handleSave = () => {
    console.log({ id, machineId, scaleId, ticketId, status, weightChange });
    if (props.ticketId) {
      props.addDummyEvent({ id, scaleId, status: 'checked', machineId, weightChange, ticketId });
    }
    // TODO: Handle saving the event with the generated IDs and input values
    props.closeModal();
  };

  return (
    <div className={classes.paper}>
      <div
        style={{
          width: '100%',
          height: '50%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2
          className={classes.header}
          // style={{ alignSelf: 'center' }}
        >
          Confirm Ticket
        </h2>
        <IconButton
          style={{
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          }}
          onClick={props.closeModal}
        >
          <Close />
        </IconButton>
      </div>

      <form className={classes.form}>
        <div
          style={{
            width: '100%',
            height: '50%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            // onClick={handleSave}
          >
            Confirm
          </Button>
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

export default connect(mapStateToProps, { addDummyEvent })(AddDummyEventModal);
