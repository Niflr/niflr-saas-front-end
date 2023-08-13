import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import {
  updateEventStatus,
  updateDummyEventStatus,
  resetEventById,
  resetDummyEventById,
  removeFromCart,
  updateCartItemStatus,
} from '../../../actions';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '5px',
    border: '3px solid black',
    width: '100%',
  },
  media: {
    borderRadius: '50%',
    width: 100,
    height: 80,
    objectFit: 'cover',
  },
  tableContainer: {
    display: 'flex',
    gap: '10px',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '520px',
    height: '100%',
  },
  quantityContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    width: '100%',
  },
  quantityText: {
    // margin: theme.spacing(0, 1),
  },
}));

const CartElement = (props) => {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(parseInt(props.data.quantity, 10));
  //  useState(parseInt(data.Quantity, 10));

  const createdAt = new Date(props.data.createdAt).toLocaleString();
  console.log('CREATED AT: ', createdAt);

  const handleAddQuantity = () => {
    const updatedQuantity = quantity + 1;
    setQuantity(updatedQuantity);
    // props.addItemQuantity()
    // if (props.event.events.events.some((event) => props.data.id === event.id && event.status === 'ADDED_TO_CART')) {
    //   props.updateEventStatus({ qty: updatedQuantity, event_ids: [props.data.id] });
    //   // props.updateCartItemStatus(props.cart.ticketId, {qty: updatedQuantity})
    //   } else if (
    //     props.dummyEvent.dummyEvents.dummyEvents.some(
    //       (event) => props.data.id === event.id && event.status === 'ADDED_TO_CART'
    //     )) {
    //       props.updateDummyEventStatus({ qty: updatedQuantity, event_id: [props.data.id] });
    //   // props.updateCartItemStatus(props.cart.ticketId, {qty: updatedQuantity})

    //     } 

  };

  console.log('CART CARD PROPS: ', props);
  const removeItemButtonClick = () => {
    // make a function to fiter if the evnet id exists in events or dummyevents?

    // re setting events  and or dummy events in backend db
    const cartEvent = props.data;
    if (props.event.events.events.some((event) => cartEvent.id === event.id && event.status === 'ADDED_TO_CART')) {
      props.updateEventStatus({ status: 'processing', event_ids: [cartEvent.id] });
      props.resetEventById(cartEvent.id);
      props.removeFromCart(cartEvent.id);
      alert('Cart Item Deleted Successfully!');
    } else if (
      props.dummyEvent.dummyEvents.dummyEvents.some(
        (event) => cartEvent.id === event.id && event.status === 'ADDED_TO_CART'
      )
    ) {
      props.updateDummyEventStatus({ status: 'processing', event_id: [cartEvent.id] });
      props.resetDummyEventById(cartEvent.id);
      props.removeFromCart(cartEvent.id);
      alert('Cart Item Deleted Successfully!');
    } else {
      alert('This cart item cannot be deleted!');
    }
  };
  // console.log("cart event.id", [])
  const handleSubtractQuantity = () => {
    const updatedQuantity = Math.max(quantity - 1, 0);
    setQuantity(updatedQuantity);
    if (props.event.events.events.some((event) => props.data.id === event.id && event.status === 'ADDED_TO_CART')) {
    props.updateEventStatus({ qty: updatedQuantity, event_ids: [props.data.id] });
    // props.updateCartItemStatus(props.cart.ticketId, {qty: updatedQuantity})
    } else if (
      props.dummyEvent.dummyEvents.dummyEvents.some(
        (event) => props.data.id === event.id && event.status === 'ADDED_TO_CART'
      )) {
        props.updateDummyEventStatus({ qty: updatedQuantity, event_id: [props.data.id] });
      // props.updateCartItemStatus(props.cart.ticketId, {qty: updatedQuantity})
      } 

  };

  console.log('ITEM DATA', props.data);
  return (
    <Box>
      <TableContainer className={classes.tableContainer} minWidth="100%">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Field</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>
                <IconButton onClick={removeItemButtonClick}>
                  <RemoveCircleOutline />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">Name: </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">
                {props.data.variant_name ? props.data.variant_name : props.data.variantName}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="h6">Status:</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">{props.data.status}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="h6">Quantity:</Typography>
            </TableCell>
            <TableCell>
              <Box className={classes.quantityContainer}>
                {/* <IconButton onClick={handleSubtractQuantity}>
                  <RemoveCircleOutline />
                </IconButton> */}
                <Typography variant="body1" className={classes.quantityText}>
                  {quantity}
                </Typography>
                {/* <IconButton onClick={handleAddQuantity}>
                  <AddCircleOutline />
                </IconButton> */}
              </Box>
            </TableCell>
          </TableRow>
        </Table>
      </TableContainer>
    </Box>
  );
};

// <Accordion className={classes.root}>
//   <AccordionSummary
//     style={{ width: '400px' }}
//     // expandIcon={<ExpandMore />}
//   >
//     <Box display="flex" flexDirection="row" alignItems="center">
//       <Box ml={2}>
//         <Typography variant="h6">{data.variant_name ? data.variant_name : data.variantName}</Typography>
//         {/* <Typography variant="body1">Quantity: {data.quantity}</Typography> */}
//         <Typography variant="h6">Status: {data.status}</Typography>
//         {createdAt && !Number.isNaN(createdAt) && <Typography variant="h6">Quantity: {data.quantity}</Typography>}
//       </Box>
//     </Box>
//   </AccordionSummary>
//   <AccordionDetails>
//     <CardContent>
//       <Box display="flex" flexDirection="column" alignItems="center">
//         <Box className={classes.quantityContainer}>
//           <IconButton onClick={handleSubtractQuantity}>
//             <RemoveCircleOutline />
//           </IconButton>
//           <Typography variant="body1" className={classes.quantityText}>
//             {quantity}
//           </Typography>
//           <IconButton onClick={handleAddQuantity}>
//             <AddCircleOutline />
//           </IconButton>
//         </Box>
//       </Box>
//     </CardContent>
//   </AccordionDetails>
// </Accordion>
// <Card className={classes.root}>
//   <Box display="flex" flexDirection="row" alignItems="center">
//     {/* <CardMedia className={classes.media} image={data.imageURL} /> */}
//     <Box ml={2}>
//       <Typography variant="h6">{data.id}</Typography>
//       <Typography variant="body1">{data.scaleId}</Typography>
//       <Typography variant="h6">{data.status}</Typography>
//       <Typography variant="body1">{data.weightChange}</Typography>
//     </Box>
//   </Box>
//   <CardContent>
//     <Box display="flex" flexDirection="column" alignItems="center">
//       <Box className={classes.quantityContainer}>
//         <IconButton onClick={handleSubtractQuantity}>
//           <RemoveCircleOutline />
//         </IconButton>
//         <Typography variant="body1" className={classes.quantityText}>
//           {quantity}
//         </Typography>
//         <IconButton onClick={handleAddQuantity}>
//           <AddCircleOutline />
//         </IconButton>
//       </Box>
//     </Box>
//   </CardContent>
// </Card>

const mapStateToProps = ({ cart, event, dummyEvent }) => ({
  cart,
  event,
  dummyEvent,
});

export default connect(mapStateToProps, {
  updateEventStatus,
  updateDummyEventStatus,
  resetEventById,
  resetDummyEventById,
  removeFromCart,
  updateCartItemStatus,
})(CartElement);
