import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  pageContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: '100vh',
    maxHeight: '100vh',
    width: '100%',
    overflow: 'auto',
  },

  leftContainer: {
    flex: '0 0 60%',
    display: 'flex',
    flexDirection: 'column',
    width: '700px',
    height: '100%',
    gap: '10px',
    maxHeight: '2000px',
    paddingRight: '10px',
    borderRadius: '8px',
    backgroundColor: 'white',
    overflowY: 'auto',
  },

  cartScroller: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',

    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: '5px',
    gap: '3px',
    alignItems: 'flex-start',
    overflow: 'auto',
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
    height: '70%',

    marginRight: '20px',
    borderRadius: '8px',
    padding: '4px',
    marginBottom: '20px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.6)',
  },

  cartContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: '200px',
    width: '100%',
    maxHeight: '200px',
    paddingX: '10px',

    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.6)',
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
    flex: '1', // Use flex: 1 to make it fill the remaining space
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    height: '100%',
    backgroundColor: 'white',
    margin: '10px',
    marginLeft: '25px',
    padding: '10px',
    overflowY: 'auto', // Enable vertical scrolling when content overflows
  },

  eventScroller: {
    position: 'relative',
    height: '35%',
    backgroundColor: 'white',
    borderRadius: '8px',
  },

  eventContainer: {
    position: 'relative',
    marginBottom: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '10px',
    height: '200px',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    // maxWidth: '100%',
    // maxHeight: '40%',
    zIndex: '1',
    overflow: 'auto',
    maxHeight: '200px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.6)',
  },

  eventButtons: {
    position: 'relative',
    bottom: 0,
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: '8px',
    height: '25%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px',
    // marginTop: '5px',
    marginBottom: '10px',
  },

  buttonContainer: {
    display: 'flex',
    gap: '30px',
    height: '50px',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',

    maxHeight: '40vh',
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
