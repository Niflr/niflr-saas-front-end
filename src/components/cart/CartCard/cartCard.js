import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '5px',
    border: '3px solid black',
    // margin: theme.spacing(2),
    // padding: theme.spacing(2),
    width: '100%',
    // [theme.breakpoints.up('sm')]: {
    //   width: 'auto',
    // },
  },
  media: {
    borderRadius: '50%',
    width: 100,
    height: 80,
    objectFit: 'cover',
    // [theme.breakpoints.up('sm')]: {
    //   width: 120,
    //   height: 120,
    // },
  },
  quantityContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f3f3',
    // borderRadius: theme.spacing(1),
    // padding: theme.spacing(1),
  },
  quantityText: {
    // margin: theme.spacing(0, 1),
  },
}));

const CartElement = ({ data }) => {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(0);
  //  useState(parseInt(data.Quantity, 10));

  const createdAt = new Date(data.createdAt).toLocaleString();
  console.log('CREATED AT: ', createdAt);

  const handleAddQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleSubtractQuantity = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0));
  };

  console.log('ITEM DATA', data);
  return (
    <Accordion className={classes.root}>
      <AccordionSummary
        style={{ width: '400px' }}
        // expandIcon={<ExpandMore />}
      >
        <Box display="flex" flexDirection="row" alignItems="center">
          <Box ml={2}>
            <Typography variant="h6">Code: {data.id}</Typography>
            {/* <Typography variant="body1">Quantity: {data.quantity}</Typography> */}
            <Typography variant="h6">Status: {data.status}</Typography>
            <Typography variant="h6">Time: {createdAt}</Typography>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box className={classes.quantityContainer}>
              <IconButton onClick={handleSubtractQuantity}>
                <RemoveCircleOutline />
              </IconButton>
              <Typography variant="body1" className={classes.quantityText}>
                {quantity}
              </Typography>
              <IconButton onClick={handleAddQuantity}>
                <AddCircleOutline />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </AccordionDetails>
    </Accordion>
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
  );
};

export default CartElement;
