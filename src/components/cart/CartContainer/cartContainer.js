import { useEffect, useState, memo } from 'react';
import {
  box,
  Grid,
  Paper,
  Typography,
  Container,
  CardMedia,
  CardContent,
  Card,
  IconButton,
  Button,
} from '@mui/material';
import { ArrowBackRounded, ArrowForwardRounded } from '@mui/icons-material';
import { connect } from 'react-redux';
import CartElement from '../CartCard/cartCard';

const CartContainer = (props) => {
  // const classes= useStyles();
  const [cart, setCart] = useState([]);

  const [visibleCartItemIndex, setVisibleCartItemIndex] = useState(0);

  const handleScrollLeft = () => {
    if (visibleCartItemIndex > 0) {
      setVisibleCartItemIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleScrollRight = () => {
    if (visibleCartItemIndex < cart.length - 1) {
      setVisibleCartItemIndex((prevIndex) => prevIndex + 1);
    }
  };

  useEffect(() => {
    setCart(props.cart.cartItems);
    setVisibleCartItemIndex(0); // Reset the visible index when the cart is updated
  }, []);

  // const renderCart = (cart) => {
  //   console.log('checking cart', cart);
  //   return (
      
  //   )
  //   }
  useEffect(() => {
    console.log('props.cart updated:', props.cart);
    setCart(props.cart.cartItems);
  }, [props.cart]);
  console.log('CART CONTAINER PROPS: ', props);
  // return cart ? renderCart(cart) : null;
  return (
    <div style={{display:'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: "100%"}}>
    {props.cart.cartItems.map((item) => (
      <CartElement data={item} />
    ))}
    </div>
  )
};

const mapStateToProps = ({ cart }) => ({
  cart,
});

export default connect(mapStateToProps)(CartContainer);
