import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import Scrollbar from '../components/scrollbar';
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
import { fetchLogsList } from '../actions';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'event_name', label: 'Event Name', alignRight: false },
  { id: 'createdAt', label: 'Created At', alignRight: false },
  { id: 'store_id', label: 'Store ID', alignRight: false },
  { id: 'metadata', label: 'Metadata', alignRight: false },
];

// // ----------------------------------------------------------------------

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

function LogListPage(props) {
  
  useEffect(() => {
    // Fetch log list initially when the component mounts
    console.log('Tested logs list');
    props.fetchLogsList();

    // Set up the interval to fetch the log list every 5 seconds
    const intervalId = setInterval(() => {
      props.fetchLogsList();
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const user = JSON.parse(window.localStorage.getItem('user'));
  console.log('testing users', user);
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterLogs, setFilterLogs] = useState('');
  const [filteredLogs, setFilteredLogs] = useState(
    applySortFilter(props.logs.logs, getComparator(order, orderBy), filterLogs)
  );

  const [rowsPerPage, setRowsPerPage] = useState(100);

  useEffect(() => {
    console.log('props.logsupdated:', props.logs);
    setFilteredLogs(applySortFilter(props.logs.logs, getComparator(order, orderBy), filterLogs));
  }, [props.logs.logs]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  console.log(props);

  return (
    <>
        <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} style={{ overflow: 'auto' }}>
           <Typography variant="h4" gutterBottom>
              Logs
           </Typography>
         </Stack>

         <Card>
            <Scrollbar>
                <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 300px)'}}>
                <Table stickyHeader = 'true'>
                 <UserListHead
                   order={order}
                   orderBy={orderBy}
                   headLabel={TABLE_HEAD}
                   rowCount={filteredLogs.length}
                   numSelected={selected.length}
                 />

                 {props.logs.logs.length > 0 ? (
                    <TableBody>
                        {filteredLogs
                            ? filteredLogs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                
                                const metadataCell = Object.entries(JSON.parse(row.metadata)).map(([key, val]) => {

                                  switch(key) {
                                    case "WeightChange":
                                      val = `${Math.round(val * 1000)}g`;
                                      break;
                                    case "unitWt":
                                      val += 'g';
                                      break;
                                    default:
                                      break;
                                  }
                                  return (
                                  <Typography key={key} variant="body1" component="div">
                                    <strong>{key}</strong>: {val}
                                  </Typography>);
                                })

                                return (
                                    <TableRow>
                                        <TableCell padding="20" align="center" >
                                            {row.event_name}
                                        </TableCell>
                                        <TableCell padding="20" align="center" >
                                            {new Date(row.timestamp).toLocaleString()}
                                        </TableCell>
                                        <TableCell padding="20" align="center" >
                                            {row.store_id}
                                        </TableCell>
                                        <TableCell padding="20" align="left" >
                                            {metadataCell}
                                        </TableCell>
                                    </TableRow>
                                );
                                // const { id, status } = row;
                            }) : null }

                    </TableBody>
                 ) : (
                    <Typography style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '50px' }}>
                    No logs to show
                    </Typography>
                 )}
                 </Table>
                </TableContainer>
            </Scrollbar>
            <TablePagination
              rowsPerPageOptions={[10, 50, 100]}
              component="div"
              count={filteredLogs.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
          />
         </Card>

        </Container>
    </>
  );
}

const mapStateToProps = ({ logs, isloading }) => ({
  logs,
  isloading,
});

export default connect(mapStateToProps, { fetchLogsList })(LogListPage);
