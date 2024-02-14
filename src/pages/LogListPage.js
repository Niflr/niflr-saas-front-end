import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { React, useState, useEffect } from 'react';
import { connect } from 'react-redux';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  MenuItem,
  Select,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  IconButton,
  Collapse,
  Box
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FilterListIcon from '@mui/icons-material/FilterList';
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

const STORE_IDS = ['d5be68a6-4f67-4ee9-b031-38cb0b4d349d']
const EVENT_NAMES = ['WGHT_CHNG', 'ENTRY_AUTHENTICATION', 'EXIT_AUTHENTICATION', 'UNACCOUNTED_WGHT_CHNG'];

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
  if (array) {
    if (array.length) {
      const stabilizedThis = array.map((el, index) => [el, index]);

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

  const [selectedEvents, setSelectedEvents] = useState([]);
  const [selectedStores, setSelectedStores] = useState([]);

  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [expandedRows, setExpandedRows] = useState({});
  const [beforeDate, setBeforeDate] = useState(null);
  const [afterDate, setAfterDate] = useState(null);

  const [eventFilter, setEventFilter] = useState([]);
  const [storeFilter, setStoreFilter] = useState([]);
  const [dateFilter, setDateFilter] = useState({ startDate: null, endDate: null });



// Function to toggle row expansion
  const toggleRowExpansion = (index) => {
    setExpandedRows(prevExpandedRows => ({
      ...prevExpandedRows,
      [index]: !prevExpandedRows[index]
    }));
  };

  // useEffect(() => {
  //   setFilteredLogs(applySortFilter(props.logs.logs, getComparator(order, orderBy), filterLogs));
  // }, [props.logs.logs]);

  useEffect(() => {
    let filtered = props.logs.logs;
  
    // Apply event name filter
    if (selectedEvents.length) {
      filtered = filtered.filter(row => selectedEvents.includes(row.event_name));
    }
  
    // Apply store ID filter
    if (selectedStores.length) {
      filtered = filtered.filter(row => selectedStores.includes(row.store_id));
    }
  
    // Apply timestamp filter
    if (beforeDate) {
      filtered = filtered.filter(row => new Date(row.timestamp) <= new Date(beforeDate));
    }
    if (afterDate) {
      filtered = filtered.filter(row => new Date(row.timestamp) >= new Date(afterDate));
    }
  
    setFilteredLogs(applySortFilter(filtered, getComparator(order, orderBy)));
  }, [selectedEvents, selectedStores, beforeDate, afterDate, props.logs.logs, order, orderBy]);
  

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  const handleEventFilterChange = (event) => {
    const value = event.target.value;
    setEventFilter(value); 
    setSelectedEvents(...value, value);
  };
  
  const handleStoreFilterChange = (event) => {
    const value = event.target.value;
    setStoreFilter(value); 
    setSelectedStores(...value, value)
  };
  
  const handleDateChange = (name) => (date) => {
    setDateFilter((prev) => ({ ...prev, [name]: date })); 
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };


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
                  eventFilter={eventFilter}
                  setEventFilter={setEventFilter}
                  storeFilter={storeFilter}
                  setStoreFilter={setStoreFilter}
                  dateFilter={dateFilter}
                  setDateFilter={setDateFilter}
                 />

                 {props.logs.logs.length > 0 ? (
                    <TableBody>
                      {filteredLogs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                        const isRowExpanded = !!expandedRows[index];
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
                          // return `<strong>${key}</strong>: ${val}`
                          return (
                            <Typography key={key} variant="body1" component="div">
                              <div style={{display: 'flex', justifyContent: 'flex-start', gap: '20px'}}>
                                  <div style={{paddingVertical:20, fontWeight: 'bold'}}>{key} :</div>
                                  <div>{val}</div>
                             </div>
                            </Typography>);
                        });
                        
                        return (
                          <>
                          <TableRow hover onClick={() => toggleRowExpansion(index)}>
                            <TableCell padding="20" align="center">
                              {row.event_name}
                            </TableCell>
                            <TableCell padding="20" align="center">
                              {new Date(row.timestamp).toLocaleString()}
                            </TableCell>
                            <TableCell padding="20" align="center">
                              {row.store_id}
                            </TableCell>
                            <TableCell padding="20" align="center">
                              <IconButton aria-label="expand row" size="small">
                                {isRowExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                              </IconButton>
                            </TableCell>
                          </TableRow>
                          {isRowExpanded && (
                            <TableRow>
                              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                <Collapse in={isRowExpanded} timeout="auto" unmountOnExit>
                                  <Box margin={1}>
                                    {/* Your Metadata Expansion Logic Here */}
                                    {metadataCell}
                                  </Box>
                                </Collapse>
                              </TableCell>
                            </TableRow>
                          )}
                      </>
                        )   
                          
                        
                      })}
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
