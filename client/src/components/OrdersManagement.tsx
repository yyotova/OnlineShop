import React, { ReactElement, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
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
import {
  listOrders,
  updateOrder,
  deleteOrder,
} from '../actions/orderActions';
import { OrderCreate } from '../models/order-model';
import moment from 'moment';

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
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function OrdesManagement(): ReactElement {
  const orderList: OrderCreate = useSelector(
    (state: ReduxState) => state.listOrders
  );

  const deletedOrder: OrderCreate = useSelector(
    (state: ReduxState) => state.deleteOrders
  );
  const updatedOrder: OrderCreate = useSelector(
    (state: ReduxState) => state.updateOrder
  );

  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders());
  }, [deletedOrder?.success, updatedOrder?.success]);

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
          Orders
        </Box>
        <Divider />
      </Typography>

      {orderList.order?.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          p={10}
          mt={3}
        >
          <h1>There Are No Active Orders</h1>
        </Box>
      ) : (
        <Grid item xs={12} style={{ maxWidth: 1500, margin: "0 auto" }}>
          <Box
            display="flex"
            flexDirection="column"
            flexWrap="wrap"
            p={10}
            mt={3}
          >
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Order ID</StyledTableCell>
                    <StyledTableCell>User ID</StyledTableCell>
                    <StyledTableCell align="center">
                      Total Price
                    </StyledTableCell>
                    <StyledTableCell align="center">Created At</StyledTableCell>
                    <StyledTableCell align="center">Updated At</StyledTableCell>
                    <StyledTableCell align="center">Adress</StyledTableCell>
                    <StyledTableCell align="center">Zip Code</StyledTableCell>
                    <StyledTableCell align="center">Status:</StyledTableCell>
                    <StyledTableCell align="center">
                      Approve/Remove
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderList.order?.map((row) => (
                    <StyledTableRow key={row._id}>
                      <StyledTableCell component="th" scope="row">
                        {row._id}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.userId}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.amount} €
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {moment(row.createdAt.toString()).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {moment(row.updatedAt.toString()).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.address}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.zipCode}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.status}
                      </StyledTableCell>
                      <StyledTableCell>
                        <Box
                          display="flex"
                          flexDirection="column"
                          justifyContent="center"
                          alignItems="center"
                        >
                          {row.status !== "CONFIRMED" && (
                            <CheckIcon
                              style={{
                                marginTop: "15",
                                color: "#659D32",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                const updatedOrder = {
                                  _id: row._id,
                                  userId: row.userId,
                                  createdAt: row.createdAt,
                                  items: row.items,
                                  amount: row.amount,
                                  address: row.address,
                                  zipCode: row.zipCode,
                                  status: "CONFIRMED",
                                };
                                dispatch(updateOrder(updatedOrder));
                              }}
                            />
                          )}
                          <DeleteIcon
                            style={{
                              marginTop: "15",
                              color: "	#a70000",
                              cursor: "pointer",
                            }}
                            onClick={() => dispatch(deleteOrder(row._id))}
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
