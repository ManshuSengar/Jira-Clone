
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import TablePagination from '@material-ui/core/TablePagination';
import TextField from '@material-ui/core/TextField';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

const MyTable = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');

  useEffect(() => {
    // Fetch data from your API here
    // Example data for demonstration purposes
    const exampleData = [
      { INDUSTRY: 'INDUSTRY', BUSINESS_DESC: 'TEST', PINCODE: 560056, EML_ID: 'HIJ@gmail.com', DATE_OF_SUBMISSION: null, COMMENCEMENT_DATE: '2019-01-29T18:27:55.000+00:00', UDYAM_AADHAR_NO: '1234567890', CKYC_ID: 'ABC123', INCORPORATION_DATE: '2019-01-29T18:27:55.000+00:00', CITY: 'BANGALORE', 'OFFICE OWNERSHIP': 'LEASE', NATURE_BUSINESS: 'MSME', PAN: 'BZWPM4412G', MSME_CATEGORY: 'SMALL', 'SUB INDUSTRY': 'SUB', APPLICANT_NAME: 'HIJ', RESIDENT_STATUS: 'RESIDENT', NBFC_CHANNEL_PARTNER_CODE: '1', MOB_NO: 10000000000, 'BUSINESS TURNOVER': '10000000', REGISTERED_ADD2: 'ADD2', 'OFFICE TENURE': '123', REGISTERED_ADD1: 'ADD1', REGISTERED_ADD3: 'ADD3', REMARKS: 'APPROVED', STATE: 'KARNATAKA', APPLICATION_STATUS: 'Submitted to SIDBI', CIN: '1234567890', APPLICATION_ID: '8' },
      // Add more objects as needed
    ];
    setData(exampleData);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleEditRow = (row) => {
    navigate(`/edit/${row.APPLICATION_ID}`, { state: row });
  };

  const sortedData = data.sort((a, b) => {
    const orderValue = order === 'asc' ? 1 : -1;
    if (a[orderBy] < b[orderBy]) return -1 * orderValue;
    if (a[orderBy] > b[orderBy]) return 1 * orderValue;
    return 0;
  });

  const filteredData = sortedData.filter(
    (row) =>
      row.APPLICATION_ID.toString().includes(searchTerm) ||
      row.APPLICANT_NAME.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Paper className={classes.root}>
      <TextField
        label="Search by Application ID or Applicant Name"
        value={searchTerm}
        onChange={handleSearchChange}
        variant="outlined"
        style={{ margin: '16px' }}
      />
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {Object.keys(data[0] || {}).map((key) => (
                <TableCell key={key}>
                  <TableSortLabel
                    active={orderBy === key}
                    direction={orderBy === key ? order : 'asc'}
                    onClick={() => handleSort(key)}
                  >
                    {key}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.APPLICATION_ID}>
                  {Object.values(row).map((value, index) => (
                    <TableCell key={index}>
                      <Typography variant="body2">{value}</Typography>
                    </TableCell>
                  ))}
                  <TableCell>
                    {row.APPLICATION_STATUS !== 'Submitted to xxy' && (
                      <IconButton aria-label="edit" onClick={() => handleEditRow(row)}>
                        <EditIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default MyTable;
