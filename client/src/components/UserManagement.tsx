import React, { ReactElement, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  createStyles,
  withStyles,
  TableCell,
  TableRow,
  Theme,
  makeStyles,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  Box,
  Grid,
  Typography,
  Divider,
} from '@material-ui/core';
import { ReduxState } from '../models/shared-types';
import { listUsers, deleteUser } from '../actions/userActions';
import { UserListActions } from '../models/user-types';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

function createData(
  _id: string,
  email: string,
  isAdmin: boolean,
  firstName: string,
  lastName: string
) {
  return {
    _id,
    email,
    isAdmin,
    firstName,
    lastName
  };
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function UserManagement(): ReactElement {
  const usersList: UserListActions = useSelector(
    (state: ReduxState) => state.userList
  );
  const usersDelete: UserListActions = useSelector(
    (state: ReduxState) => state.userDelete
  );

  const { userInfo } = usersList;
  const classes = useStyles();
  const dispatch = useDispatch();

  const rows = userInfo?.map((user) =>
    createData(user._id, user.email, user.isAdmin, user.firstName, user.lastName)
  );

  useEffect(() => {
    dispatch(listUsers());
  }, [usersDelete.success]);

  return (
    <>
      <Typography variant="h4">
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          fontWeight="fontWeightBold"
          p={3}
          m={2}
        >
          Users
        </Box>
        <Divider />
      </Typography>
      {usersList.userInfo?.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          p={10}
          mt={10}
        >
          <h1>No User's To Manage</h1>
        </Box>
      ) : (
          <Grid item xs={12} style={{ maxWidth: 1500, margin: '0 auto' }}>
            <Box
              display="flex"
              flexDirection="column"
              flexWrap="wrap"
              p={10}
              mt={10}
            >
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>User ID</StyledTableCell>
                      <StyledTableCell align="center">First Name</StyledTableCell>
                      <StyledTableCell align="center">Last Name</StyledTableCell>
                      <StyledTableCell align="center">E-mail</StyledTableCell>
                      <StyledTableCell align="center">Operations</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows?.map((row) => (
                      <StyledTableRow key={row._id}>
                        <StyledTableCell component="th" scope="row">
                          {row._id}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.firstName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.lastName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.email}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <DeleteIcon
                              style={{ color: '	#a70000', cursor: "pointer" }}
                              onClick={() => {
                                dispatch(deleteUser(row._id));
                              }}
                            />
                          </Box>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        )}
    </>
  );
}
