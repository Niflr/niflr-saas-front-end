import { useEffect, useState, memo } from 'react';
import { box, Grid, Paper, Typography, Container, CardMedia, CardContent, Card, Button } from '@mui/material';
import { connect } from 'react-redux';
import { makeStyles } from '@mui/styles';
import EventElement from '../EventCard/eventCard';

const useStyles = makeStyles({
  root: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: 20,
    position: 'absolute',
  },
  progressContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 10,
    backgroundColor: '#ddd',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2196f3',
  },
  arrowButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  leftArrow: {
    left: 0,
  },
  rightArrow: {
    right: 0,
  },
});

const DummyEventContainer = (props) => {
  const classes = useStyles();
  const [dummyEvents, setDummyEvents] = useState([]);
  const renderEvents = (dummyEvents) => {
    console.log('checking  dummy events', dummyEvents);
    if (dummyEvents.length > 0) {
      return dummyEvents.map((event) => <EventElement key={event.id} renderEvent={event} />);
    }
    return null;
  };

  useEffect(() => {
    // console.log("props. dummy event events updated:", JSON.stringify(props.dummyEvent.dummyEvents.dummyEvents));
    setDummyEvents(props.dummyEvent.dummyEvents.dummyEvents);
    console.log('props. dummy event events updated:', dummyEvents);
  }, [props.dummyEvent]);

  return renderEvents(dummyEvents);
};

const mapStateToProps = ({ dummyEvent }) => ({
  dummyEvent,
});

export default connect(mapStateToProps)(DummyEventContainer);
