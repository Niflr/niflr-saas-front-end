import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Drawer } from '@mui/material';
//
import Header from './header';
import Nav from './nav';
import UserPage from '../../pages/UserPage';
// import TicketPage from '../../pages/TicketPage';
import LogListPage from '../../pages/LogListPage';
// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  // minHeight: '100%',
  // overflow: 'hidden',
});
const DRAWER_WIDTH = 280;

const Main = styled('div')(({ theme,open }) => ({
  flexGrow: open ? 0 : 1,
  overflow: 'auto',
  minHeight: '100%',
  padding: theme.spacing(3),
  paddingLeft: open ? DRAWER_WIDTH : 0,
  transition: theme.transitions.create(['flex-grow', 'padding-left'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function StoreLogsLayout() {
  const [open, setOpen] = useState(false);
  console.log("Here in StoreLogsLayout");

  return (

<StyledRoot>
<Header onOpenNav={() => setOpen(true)} />
<Drawer anchor="left"

        onClose={() => setOpen(false)}
        open = {open}
        PaperProps={{
          sx: {
            width: DRAWER_WIDTH,
            bgcolor: 'background.default',
            // borderRightStyle: 'dashed',

          },
        }}
 >
  <Nav onCloseNav={() => setOpen(false)} />
</Drawer>
<Main open={open}>

  <LogListPage />
  <Outlet />
</Main>
</StyledRoot>
  );
}