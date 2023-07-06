import React, { useState } from 'react';
import {
  Button,
  Modal,
  TextField,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Grid,
  Typography,
  Avatar,
} from '@mui/material';
import { connect } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { addDummyEvent, addProduct } from '../../actions/index';
// import set selected product from actions

const useStyles = makeStyles(() => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    height: '300px',
    overflow: 'hidden',
  },
  header: {
    textAlign: 'center',
    padding: '20px',
  },
  form: {
    padding: '0 20px',
    width: '80%',
    margin: '0 auto',
  },
  disabled: {
    backgroundColor: '#f7f7f7',
  },
  avatar: {
    width: '45%',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '50%',
    overflow: 'hidden',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
}));

const ViewStoreProductsModal = (props) => {
  const classes = useStyles();
  console.log('products modal', props.products);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleProductClick = (product) => {
    console.log('product clicked', product);
    setSelectedProduct(product);
  };
  const handleAddProduct = () => {
    console.log('product added', selectedProduct);

    props.addProduct(selectedProduct);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCheckboxChange = (event, product) => {
    console.log('handling checked product', product);
    setSelectedProduct(event.target.checked ? product : null);
  };

  const filteredProducts = props.products.filter((product) =>
    product.variantName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //   const [status, setStatus] = useState('processing');
  //   const [weightChange, setWeightChangeEvent] = useState('');
  //   const id = generateRandomId();
  //   const machineId = generateRandomId();
  //   const scaleId = generateRandomId();
  //   const [ticketId,setTicketID] = useState(props.ticketId);
  //   const handleClose = () => {
  //     setStatus('');
  //     setWeightChangeEvent('');
  //     props.closeModal();
  //   };

  return (
    <div className={classes.paper} style={{ padding: '20px', overflow: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Select a product:
      </Typography>
      <Grid item xs={12}>
        <input type="text" placeholder="Search products" value={searchQuery} onChange={handleSearchChange} />
      </Grid>
      <div className={classes.listContainer}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Typography variant="subtitle1">Select</Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="subtitle1">Image</Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="subtitle1">Product Name</Typography>
          </Grid>
        </Grid>

        <div className={classes.list}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} key={product.variantId}>
              <ListItem
                button
                onClick={() => handleProductClick(product)}
                disabled={selectedProduct && product.variantId !== selectedProduct.variantId}
                className={selectedProduct && product.variantId !== selectedProduct.variantId ? classes.disabled : ''}
              >
                <Grid container spacing={2}>
                  <Grid item xs={2}>
                    <Checkbox
                      checked={selectedProduct && product.variantId === selectedProduct.variantId}
                      onChange={(event) => handleCheckboxChange(event, product)}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <Avatar className={classes.avatar} alt={product.variantName} src={product.primaryImageUrl} />
                  </Grid>
                  <Grid item xs={5}>
                    <ListItemText primary={product.variantName} />
                  </Grid>
                </Grid>
              </ListItem>
            </Grid>
          ))}
        </div>

        <Button onClick={handleAddProduct}>select</Button>
      </div>
      {/* <List component="nav">
    
        {products.map((product) => (
          <ListItem
            key={product.productId}
            button
            onClick={() => handleProductClick(product)}
            disabled={selectedProduct && product.variantId !== selectedProduct.variantId}
            className={selectedProduct && product.variantId !== selectedProduct.variantId ? classes.disabled : ''}
          >
            <ListItemText primary={product.variantName} 
            // secondary={product.description}
             />
          </ListItem>
        ))}
      </List> */}
    </div>
  );
};
const mapStateToProps = ({ cart, dummmyEvent }) => ({
  cart,
  dummmyEvent,
});

export default connect(mapStateToProps, { addDummyEvent, addProduct })(ViewStoreProductsModal);
