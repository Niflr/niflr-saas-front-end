import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Drawer } from '@mui/material';
//
import Header from './header';
import Nav from './nav';
// import UserPage from '../../pages/UserPage';
import TicketPage from '../../pages/TicketPage';
// import TicketListPage  from '../../pages/TicketListPage';

// ----------------------------------------------------------------------
const DRAWER_WIDTH = 280;
const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  // display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'hidden',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 50,
  // paddingBottom: theme.spacing(10),
  // [theme.breakpoints.up('lg')]: {
  //   paddingTop: APP_BAR_DESKTOP + 24,
  //   paddingLeft: theme.spacing(2),
  //   paddingRight: theme.spacing(2),
  // },
}));

// ----------------------------------------------------------------------

export default function TicketListLayout() {
  const [open, setOpen] = useState(false);

  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />
      <Drawer
        anchor="left"
        onClose={() => setOpen(false)}
        open={open}
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
        <TicketPage />
        <Outlet />
      </Main>
    </StyledRoot>
  );
}
