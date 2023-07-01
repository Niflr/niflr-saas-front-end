import { useEffect, useState, memo } from 'react';
import { box, Grid, Paper, Typography, Container, CardMedia, CardContent, Card, Button } from '@mui/material';
import { connect } from 'react-redux';
import CartElement from '../CartCard/cartCard';

const CartContainer = (props) => {
  // const classes= useStyles();
  const [cart, setCart] = useState([]);

  const renderCart = (cart) => {
    console.log('checking cart', cart);
    return cart.map((item) => <CartElement data={item} />);
  };
  useEffect(() => {
    console.log('props.cart updated:', props.cart);
    setCart(props.cart.cartItems);
  }, [props.cart]);
  console.log('CART CONTAINER PROPS: ', props);
  return cart ? renderCart(cart) : null;
};

const mapStateToProps = ({ cart }) => ({
  cart,
});

export default connect(mapStateToProps)(CartContainer);
