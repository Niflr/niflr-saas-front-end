import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Tooltip,
} from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import { ArrowForward } from '@mui/icons-material';
import { fDateTime } from '../utils/formatTime';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
// import USERLIST from '../_mock/user';
import TICKETS from '../_mock/tickets';
// actions
import { fetchTicketList, selectTicket, updateCartTicket } from '../actions';
import { useLocalStorage } from '../components/useLocalStorage';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'ticket_id', label: 'Ticket ID', alignRight: false },
  { id: 'user_name', label: 'User Name', alignRight: false },
  { id: 'machine_name', label: 'Machine Name', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'created_at', label: 'Created At', alignRight: false },
  { id: 'updated_at', label: 'Updated At', alignRight: false },
  { id: 'action', label: 'Action', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  console.log('testing apply sort fileter', array);
  if (array) {
    if (array.length) {
      const stabilizedThis = array.map((el, index) => [el, index]);

      console.log('testing apply sort fileter', stabilizedThis);
      stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
      });
      if (query) {
        return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
      }
      return stabilizedThis.map((el) => el[0]);
    }
  }
  return [];
}

function TicketListPage(props) {
  const user = JSON.parse(window.localStorage.getItem('user'));
  console.log('testing users', user);
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterTicket, setFilterTicket] = useState('');
  const [filteredTickets, setFilteredTickets] = useState(
    applySortFilter(props.ticket.tickets, getComparator(order, orderBy), filterTicket)
  );

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedTicket, setSelectedTicket] = useState({});

  useEffect(() => {
    // Fetch ticket list initially when the component mounts
    props.fetchTicketList();

    // Set up the interval to fetch the ticket list every 5 seconds
    const intervalId = setInterval(() => {
      props.fetchTicketList();
    }, 5000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    console.log('setting selected ticket state', selectedTicket);
    props.selectTicket(selectedTicket);
    props.updateCartTicket(selectedTicket.id);
    if (selectedTicket.id) {
      navigate(`/dashboard/tickets/${selectedTicket.id}`, { replace: false });
    }
  }, [selectedTicket]);

  useEffect(() => {
    console.log('props.ticketsupdated:', props.ticket);
    setFilteredTickets(applySortFilter(props.ticket.tickets, getComparator(order, orderBy), filterTicket));
  }, [props.ticket.tickets]);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = USERLIST.map((n) => n.name);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleTicketSelect = (row) => {
    console.log('selected ticket', row);
    setSelectedTicket(row);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterTicket(event.target.value);
  };

  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  // const filteredTickets = ;
  // console.log("filtered tickets",filteredTickets)
  const isNotFound = !filteredTickets.length && !!filterTicket;

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} style={{ overflow: 'auto' }}>
          <Typography variant="h4" gutterBottom>
            Tickets
          </Typography>
          {/* <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button> */}
        </Stack>

        <Card>
          {/* <UserListToolbar numSelected={selected.length} filterName={filterTicket} onFilterName={handleFilterByName} /> */}

          <Scrollbar>
            <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 300px)' }}>
              <Table stickyHeader="true">
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={filteredTickets.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  // onSelectAllClick={handleSelectAllClick}
                />
                {props.ticket.tickets.length > 0 ? (
                  <TableBody>
                    {filteredTickets
                      ? filteredTickets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                          console.log('ticket rows', row);
                          const userName = row.username;
                          const machineId = row.machine_id;
                          const machineName = row.machineName;
                          const { id, status } = row;
                          // const selectedUser = selected.indexOf(name) !== -1;

                          return (
                            <TableRow>
                              <TableCell component="th" scope="row" padding="20" align="center">
                                <Typography variant="subtitle2" sx={{ whiteSpace: 'pre-wrap' }}>
                                  {id}
                                </Typography>
                              </TableCell>

                              <TableCell padding="20" align="center">
                                {userName}
                              </TableCell>

                              <TableCell padding="20" align="center">
                                <Tooltip title={`Machine ID: ${machineId}`} arrow placement='bottom'>
                                  <span>{machineName}</span>
                                </Tooltip>
                              </TableCell>

                              <TableCell padding="20" align="center">
                                {row.order_id ? (
                                  <Label color="success">Confirmed</Label>
                                ) : (
                                  <Label color="error">To Be Reviewed</Label>
                                )}
                              </TableCell>

                              <TableCell padding="20" align="center">
                                {fDateTime(row.createdAt)}
                              </TableCell>
                              <TableCell padding="20" align="center">
                                {fDateTime(row.updatedAt)}
                              </TableCell>

                              <TableCell align="right">
                                <IconButton size="large" color="inherit" onClick={() => handleTicketSelect(row)}>
                                  <ArrowForward />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      : null}
                  </TableBody>
                ) : (
                  <Typography
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '50px' }}
                  >
                    No tickets to show
                  </Typography>
                )}

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterTicket}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredTickets.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

const mapStateToProps = ({ ticket, isloading }) => ({
  ticket,
  isloading,
});

export default connect(mapStateToProps, { fetchTicketList, selectTicket, updateCartTicket })(TicketListPage);
