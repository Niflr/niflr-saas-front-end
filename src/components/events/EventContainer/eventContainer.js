import { useEffect, useState, memo } from 'react';
import { box, Grid, Paper, Typography, Container, CardMedia, CardContent, Card, Button } from '@mui/material';
import { connect } from 'react-redux';
import EventElement from '../EventCard/eventCard';
// import {useStyles} from "./styles";

// actions
import { fetchEventList } from '../../../actions';

const EventContainer = (props) => {
  // const classes= useStyles();
  const [events, setEvents] = useState([]);
  const renderEvents = (events) => {
    console.log('checking events', events);
    if (events.length > 0) {
      return events.map((event) => <EventElement key={event.id} renderEvent={event} />);
    }
    return null;
  };

  useEffect(() => {
    console.log('props.events updated:', JSON.stringify(props.event.events));
    setEvents(props.event.events.events);
  }, [props.event]);

  return events ? renderEvents(events) : <Typography>No event Available</Typography>;
};

const mapStateToProps = ({ event }) => ({
  event,
});

export default connect(mapStateToProps)(EventContainer);
