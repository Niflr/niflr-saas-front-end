import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100%',
    overflow: 'auto',
  },

  leftContainer: {
    flex: '0 0 60%',
    display: 'flex',
    flexDirection: 'column',
    width: '700px',
    height: '100%',
    maxHeight: '100vh',
    paddingRight: '10px',
    borderRadius: '8px',
    backgroundColor: 'white',
    overflow: 'auto',
  },

  cartScroller: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    borderRadius: '5px',
    gap: '3px',
    alignItems: 'center',
    overflowX: 'auto',
  },

  cartDivs: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    gap: '30px',
    borderRadius: '5px',
  },

  cartItem: {
    minWidth: '200px',
    height: '100px',
  },

  videoContainer: {
    width: '100%',
    height: '50%',

    marginRight: '20px',
    borderRadius: '8px',
    padding: '4px',
    marginBottom: '20px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.6)',
  },

  cartContainer: {
    display: 'flex', // make the container a flex container
    flexDirection: 'row', // arrange items in a row instead of a column
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: '60%',
    width: '100%',
    maxHeight: '40vh',
    paddingX: '10px',
    overflowX: 'auto',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.6)',

    // borderWidth: '10px',
    // borderColor: '#DCDCDC',
    overflow: 'auto',
  },

  cartButtons: {
    height: '100%',
    width: '20%',
    right: 0,
    top: 0,
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
    // display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#DCDCDC',
    borderRadius: '8px',
    gap: '10px',
  },

  rightContainer: {
    flex: '0 0 40%',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    // width: '100%',
    paddingRight: '0px',

    backgroundColor: 'white',
    overflow: 'auto',
    margin: '10px',
    marginLeft: '25px',

    padding: '10px',
  },

  eventScroller: {
    position: 'relative',
    height: '40%',
    backgroundColor: 'white',
    borderRadius: '8px',
  },

  eventContainer: {
    position: 'relative',
    marginBottom: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '10px',
    height: '90%',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    // maxWidth: '100%',
    // maxHeight: '40%',
    zIndex: '1',
    overflow: 'auto',
    maxHeight: '400px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.6)',
  },

  eventButtons: {
    position: 'relative',
    bottom: 0,
    zIndex: 1,
    backgroundColor: 'rgba(30, 79, 106, 0.5)',
    borderRadius: '8px',
    height: '25%',
    width: '100%',
    // maxWidth: 550,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px',
    marginTop: '5px',
    marginBottom: '10px',
  },

  buttonContainer: {
    display: 'flex',
    gap: '30px',
    height: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 550,
    maxHeight: '30vh',
  },
  header: {
    marginBottom: '10px',
    marginLeft: '10px',
  },
  overlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: '9999',
    pointerEvents: 'auto',
  },
}));
