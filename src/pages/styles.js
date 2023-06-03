import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
    pageContainer: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      overflow: 'hidden',
    },

    leftContainer: {
      flex: '0 0 60%',
      display: 'flex',
      flexDirection: 'column',
      width: '700px',
      height: '650px',
      paddingRight: '10px',
      borderRadius: '8px',
      backgroundColor: '#1E4F6A',
      overflowX: 'hidden',
      overflowY: 'hidden',
    },

    cartScroller:{
      position: 'relative',
      height:'100%',
      width:'100%',
      backgroundColor: '#8ED5FD',
      borderRadius:'8px',
      marginBottom:'20px',
      display: 'flex',
      flexDirection: 'row',
    },

    cartDivs:{
      display: 'flex',
      flexDirection: 'row',
      height: '100%',
      width: '100%',
    },
    
    cartItem: {
      minWidth: '200px',
      height: '100px',
    },
    
    videoContainer: {
      width: '100%',
      height: '60%',
      backgroundColor: 'black',
      marginRight: '20px',
      borderRadius: '8px',
      padding:'10px'
    },

    cartContainer: {
      position: 'relative',
      marginBottom: '20px',
      display: 'flex',            // make the container a flex container
      flexDirection: 'row',      // arrange items in a row instead of a column
      alignItems: 'center', 
      height: '100%',
      width: '100%',
      backgroundColor: '#ccc',
      borderRadius: '8px',
      overflowX: 'auto',
    },
  
    cartButtons:{
      position: 'absolute',
      height: '100%',
      width: '10%',
      maxWidth: 550,
      right: 0,
      top: 0,
      flexDirection: 'column',
      display: 'flex',
      alignItems: 'center',
      // display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'rgba(30, 79, 106, 0.5)',
      borderRadius: '8px',
      gap: '10px',   
    },

    rightContainer: {
      flex: '0 0 40%',
      display: 'flex',
      flexDirection: 'column',
      height: '650px',
      // width: '100%',
      paddingRight: '10px',
      borderRadius: '8px',
      backgroundColor: '#1E4F6A',
      overflowY: 'hidden',
      overflowX: 'hidden',
      padding: '10px',
    },

    eventScroller:{
      position: 'relative',
      height:'40%',
      backgroundColor: '#8ED5FD',
      borderRadius:'8px',
      marginBottom:'20px'
    },

    eventContainer: {
      position: 'relative',
      marginBottom: '20px',
      backgroundColor: '#8ED5FD',
      borderRadius: '8px',
      padding: '10px',
      height: '90%',
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      // maxWidth: '100%',
      // maxHeight: '40%',
      overflow: 'auto',
    },

    eventButtons:{
      position: 'absolute',
      bottom: 0,
      zIndex:1,
      backgroundColor: 'rgba(30, 79, 106, 0.5)',
      borderRadius: '8px',
      height: '20%',
      width: '100%',
      // maxWidth: 550,
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },

    buttonContainer: {
      marginBottom: '20px',
      backgroundColor: '#8ED5FD',
      borderRadius: '8px',
      padding: '10px',
      height: '10%',
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: 550,
      maxHeight: '13%',
      overflow: 'auto',
    },
    header: {
      marginBottom: '20px',
    },
  }));
  