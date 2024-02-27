import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import CartElement from '../CartCard/cartCard';

const CartContainer = (props) => {
  // const classes= useStyles();
  const [cart, setCart] = useState([]);


  useEffect(() => {
    setCart(props.cart.cartItems);
  }, []);

  const renderCart = (cart) => {
    console.log('checking cart', cart);
    return (
        <div style={{display:'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: "100%"}}>
        {cart.filter(item => item.ticketId === props.cart.ticketId).map((item) => (
          <CartElement data={item} />
        ))}
        </div>
    )
    }
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
