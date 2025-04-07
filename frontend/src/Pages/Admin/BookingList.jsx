import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
export default function BookingList() {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/getAllBooking")
      .then((res) => setData(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          padding: 5,
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: 40 }}>Booking List</h1>
        <Table aria-label="simple table" sx={{ minWidth: 700 }}>
          <TableHead
            sx={{
              color: "white",
              backgroundColor: "blue",
            }}
          >
            <TableRow>
              <StyledTableCell>BookID</StyledTableCell>
              <StyledTableCell>UserID</StyledTableCell>
              <StyledTableCell>Start Date</StyledTableCell>
              <StyledTableCell>End Date</StyledTableCell>
              <StyledTableCell>Total Day</StyledTableCell>
              <StyledTableCell>Total Amount</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <TableRow key={row.bookid}>
                <TableCell component="th" scope="row">
                  {row.bookid}
                </TableCell>
                <TableCell>{row.userid}</TableCell>
                <TableCell>{row.startdate}</TableCell>
                <TableCell>{row.enddate}</TableCell>
                <TableCell>{row.totalday}</TableCell>
                <TableCell>{row.totalamount}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
