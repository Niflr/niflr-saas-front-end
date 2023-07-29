import React from 'react';
import { Modal } from '@mui/material';
import { connect } from 'react-redux';
import AddDummyEventModal from './addDummyEventModal';
import ConfirmTicketModal from './confirmTicketModal';
import confirmCartModal from './confirmCartModal';
import ViewStoreProducts from './viewStoreProducts';
import { setModalState } from '../../actions/index';
import AddToCartModal from './addToCartModal';
import Loader from './confirmationModal';
import DummyAddToCartModal from './dummyAddToCartModal';

const ModalWrapper = (props) => {
  const closeModal = () => {
    props.setModalState({ visible: false });
  };
  const loadModal = () => {
    props.setModalState({ isLoading: true });
  };
  const renderModal = () => {
    switch (props.modal.modalName) {
      case 'AddDummyEvent':
        console.log('modal props', props.modal);
        return <AddDummyEventModal closeModal={closeModal} loadModal={loadModal} ticketId={props.modal.modalContent} />;
      case 'confirmTicket':
        console.log('modal props', props.modal);
        return (
          <ConfirmTicketModal
            closeModal={closeModal}
            loadModal={loadModal}
            // ticketId ={props.modal.modalContent}
          />
        );
      case 'viewStoreProducts':
        console.log(' viewStoreProducts modal props', props.modal);
        return props.product.product.productId ? (
          <AddDummyEventModal closeModal={closeModal} ticket={props.ticket.ticket} product={props.product.product} />
        ) : (
          <ViewStoreProducts closeModal={closeModal} products={props.modal.modalContent} />
        );
      case 'eventAddToCart':
        return (
          <AddToCartModal
            closeModal={closeModal}
            selectedEvents={props.modal.modalContent}
            eventAddToCart={props.addToCartAction}
          />
        );
      case 'dummyEventAddToCart':
        return (
          <DummyAddToCartModal
            closeModal={closeModal}
            selectedEvents={props.modal.modalContent}
            // eventAddToCart={props.addToCartAction}
          />
        );
      case 'loading':
        return <Loader isLoading={props.modal.isLoading} />;

      // case  'confirmCart':
      //   console.log("modal props", props.modal)
      //   return (
      //     <confirmCartModal
      //       closeModal={closeModal}
      //     // ticketId ={props.modal.modalContent}
      //   />
      //   );
      // Add other cases here for different modal types
      default:
        return null;
    }
  };
  console.log('MODAL WRAPPER PROPS: ', props.modal);
  console.log('MODAL CONTENT OF PROPS: ', props.modal.modalContent);
  console.log('EVENT ADD TO CART ', props.addToCartAction);
  return (
    <Modal
      open={props.modal.visible}
      onClose={closeModal}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '35%',
        margin: '0 auto',
        overflow: 'hidden',
      }}
    >
      <div>{renderModal()}</div>
    </Modal>
  );
};

const mapStateToProps = ({ modal, product, ticket }) => ({
  modal,
  product,
  ticket,
});
export default connect(mapStateToProps, { setModalState })(ModalWrapper);
