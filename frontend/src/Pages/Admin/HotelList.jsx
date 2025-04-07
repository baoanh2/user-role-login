import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeletePopup from "./DeletePopup";
import { toast, ToastContainer } from "react-toastify";

export default function Hotels() {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const { id } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/gethotels/")
      .then((res) => setData(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteHotel = (id) => {
    axios
      .delete("http://localhost:3001/delete/" + id)
      .then((res) => {
        toast.success("Delete Success!!!");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <TableContainer
        component={Paper}
        className="hotel-list-container"
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          padding: 5,
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: 30 }}>Hotel List</h1>
        <Table aria-label="simple table" sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Capacity</StyledTableCell>
              <StyledTableCell>Phone number</StyledTableCell>
              <StyledTableCell>Type</StyledTableCell>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.capacity}</TableCell>
                <TableCell>{row.phonenumber}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell
                  style={{
                    maxWidth: "200px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {row.image}
                </TableCell>
                <TableCell sx={{ minWidth: "25rem" }}>
                  {row.description}
                </TableCell>
                <TableCell sx={{ minWidth: "7rem" }}>
                  <IconButton>
                    <Link to={`/update-hotel/${row.id}`} sx={{ color: "gray" }}>
                      <EditIcon />
                    </Link>
                  </IconButton>
                  <DeletePopup
                    name={row.name}
                    id={row.id}
                    deleteHotel={deleteHotel}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer />
    </>
  );
}
