import { useState, useEffect } from 'react';
import { CircularProgress, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { connect } from 'react-redux';
import { setModalState } from '../../actions/index';

const Loader = (props) => {
  console.log('isloading state', props);
  const [showTick, setShowTick] = useState(false);
  const [message, setMessage] = useState('Confirming ticket...');

  useEffect(() => {
    // console.log('called isLoading', isLoading);
    if (props.modal.isLoading === false && props.modal.visible === true) {
      console.log('called isLoading', props.modal.isLoading);
      setShowTick(true);
      setMessage('Ticket Confirmed');

      // Simulating API call completion
      setTimeout(() => {
        props.setModalState({
          visible: false,
          // modalName: 'loading',
          // modalContent: props.product.products.updatedVariants,
          // isLoading: false,
        });
      }, 5000);
    }
  }, [props.modal.isLoading]);

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: props.modal.isLoading ? 1000 : -1,
    pointerEvents: props.modal.isLoading ? 'auto' : 'none',
  };

  const modalStyle = {
    textAlign: 'center',
    paddingTop: '30px',
    position: 'relative',
    zIndex: 1001,
    backgroundColor: '#fff',
    padding: '50px',
  };

  return (
    <div>
      {props.modal.isLoading && <div style={overlayStyle} />}
      <div style={modalStyle}>
        {props.modal.isLoading ? (
          <CircularProgress />
        ) : showTick ? (
          <CheckIcon style={{ color: 'green', fontSize: 40 }} />
        ) : null}
        <div>
          <Typography variant="subtitle1">{message}</Typography>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ modal }) => ({
  modal,
});

export default connect(mapStateToProps, { setModalState })(Loader);
