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
  }, [props.cart]);

  const renderCart = (cart) => {
    console.log('checking cart', cart);
    return (
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={handleScrollLeft}
            style={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: '3',
              backgroundColor: '#2065D1',
              color: 'white',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.6)',
              display: visibleCartItemIndex === 0 ? 'none' : 'block',
            }}
          >
            <ArrowBackRounded />
          </IconButton>
          <div
            style={{
              overflowX: 'auto',
              maxWidth: '100%',
              flex: 1,
              whiteSpace: 'nowrap',
            }}
          >
            {cart.map((item, index) => (
              <div
                key={item.id}
                style={{
                  minWidth: '100%',
                  display: index === visibleCartItemIndex ? 'block' : 'none',
                }}
              >
                <CartElement data={item} />
              </div>
            ))}
          </div>
          <IconButton
            onClick={handleScrollRight}
            style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: '3',

              backgroundColor: '#2065D1',
              color: 'white',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.6)',
              display: visibleCartItemIndex === cart.length - 1 ? 'none' : 'block',
            }}
          >
            <ArrowForwardRounded />
          </IconButton>
        </div>
      </div>
    );
    // return cart.map((item) => <CartElement data={item} />);
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
