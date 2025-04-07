import React, { useEffect, useState } from "react";
import "./admin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  Button,
  Grid2,
  InputLabel,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import TextFieldCustom from "../components/TextFieldCustom";
const data = [
  {
    id: "name",
    value: "name",
    placeholder: "Enter hotel name...",
    label: "Hotel Name:",
    type: "text",
  },
  {
    id: "capacity",
    value: "capacity",
    placeholder: "Enter capacity...",
    label: "Capacity:",
    type: "number",
  },
  {
    id: "phone",
    value: "phone",
    placeholder: "Enter phone number...",
    label: "Phone Number:",
    type: "number",
  },
  {
    id: "rent",
    value: "rent",
    placeholder: "Enter rent...",
    label: "Rent per day:",
    type: "text",
  },
  {
    id: "type",
    value: "type",
    placeholder: "Select type...",
    label: "Type of room:",
    type: "select",
    option: ["Non-Deluxe", "Deluxe"],
  },
  {
    id: "image",
    value: "image",
    placeholder: "Enter image URL...",
    label: "Image URL:",
    type: "text",
  },
];

export default function AddRoom() {
  const [values, setValues] = useState({
    name: "",
    capacity: 0,
    phone: 0,
    rent: 0,
    type: "",
    image: "",
    description: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const addRoom = () => {
    if (
      values.name == "" ||
      values.capacity == 0 ||
      values.phone == 0 ||
      values.rent == 0 ||
      values.image == "" ||
      values.type == "" ||
      values.description == ""
    ) {
      toast.error("Please fill in all the field below!!!");
    } else {
      axios
        .post("http://localhost:3001/addroom", values)
        .then((res) => {
          if (res.data.Status === "Success") {
            navigate("/");
            toast.success("Add Success!!");
            console.log(res);
          } else {
            toast.error("ADD ERROR!!");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    console.log(values);
  }, [values]);
  return (
    <>
      <div className="add-container">
        <div className="add-box">
          <div>
            <Typography
              sx={{ textAlign: "center", fontSize: 40, marginBottom: 5 }}
            >
              Add Hotel
            </Typography>
          </div>
          <Grid2 container rowSpacing={1} columnSpacing={1}>
            {data.map((item, index) => {
              return (
                <Grid2 size={4} key={index}>
                  <div className="row-input">
                    <TextFieldCustom
                      id={item.id}
                      label={item.label}
                      type={item.type}
                      placeholder={item.placeholder}
                      onChange={handleChange}
                      option={item.option}
                    />
                  </div>
                </Grid2>
              );
            })}
            <Grid2 size={5}>
              <div className="row-input description">
                <label htmlFor="description">Description:</label>
                <TextField
                  name="description"
                  placeholder="Enter description..."
                  value={values.description}
                  className="input-addroom"
                  id="update-textarea"
                  multiline
                  rows={5}
                  onChange={handleChange}
                />
              </div>
            </Grid2>
            {/* <Grid2 size={5}>
              <div className="row-input">
                <InputLabel shrink sx={{ color: "white", fontSize: "medium" }}>
                  Capacity
                </InputLabel>
                <TextField
                  id="outlined-basic"
                  label="Outlined"
                  variant="outlined"
                  type="number"
                  name="capacity"
                  placeholder="Enter capacity..."
                  onChange={handleChange}
                  className="input-addroom"
                />
                id, value, onChange, placeholder, label, type, sx,
                <TextFieldCustom
                  id="capacity"
                  label="Capacity"
                  type="number"
                  value="capacity"
                  placeholder="Enter the capacity..."
                  onChange={handleChange}
                  name="capacity"
                />
              </div>
            </Grid2> */}
            {/* <Grid2 size={5}>
              <div className="row-input">
                <label htmlFor="capacity">Capacity:</label>
                <br />
                <input
                  type="number"
                  name="capacity"
                  placeholder="Enter capacity..."
                  onChange={handleChange}
                  className="input-addroom"
                />
              </div>
            </Grid2>
            <Grid2 size={5}>
              <div className="row-input">
                <label htmlFor="phone">Phone:</label>
                <br />
                <input
                  type="number"
                  name="phone"
                  placeholder="Enter phone number..."
                  onChange={handleChange}
                  className="input-addroom"
                />
              </div>
            </Grid2>
            <Grid2 size={5}>
              <div className="row-input">
                <label htmlFor="phone">Rent per day:</label>
                <br />
                <input
                  type="number"
                  name="rent"
                  placeholder="Enter rent..."
                  onChange={handleChange}
                  className="input-addroom"
                />
              </div>
            </Grid2>
            <Grid2 size={5}>
              <div className="row-input">
                <label htmlFor="type">Type:</label>
                <br />
                <select
                  placeholder="Select type..."
                  className="type-select"
                  name="type"
                  onChange={handleChange}
                >
                  <option selected disabled>
                    Select type...
                  </option>
                  <option value="Non-Deluxe">Non-Deluxe</option>
                  <option value="Deluxe">Deluxe</option>
                </select>
              </div>
            </Grid2>
            <Grid2 size={5}>
              <div className="row-input">
                <label htmlFor="image">Image:</label>
                <br />
                <input
                  name="image"
                  placeholder="Enter url image..."
                  onChange={handleChange}
                  className="input-addroom"
                />
              </div>
            </Grid2>*/}
            {/* <Grid2 size={5}>
              <div className="row-input">
                <label htmlFor="description">Description:</label>
                <TextField
                  name="description"
                  placeholder="Enter description..."
                  value={values.description}
                  className="input-addroom"
                  id="update-textarea"
                  multiline
                  rows={5}
                  onChange={handleChange}
                />
              </div>
            </Grid2> */}
            {/* <textarea
                  name="description"
                  placeholder="Enter description..."
                  value={values.description}
                  className="input-addroom"
                  id="update-textarea"
                  rows={5}
                  cols={30}
                  onChange={handleChange}
                /> */}
          </Grid2>
          {/* <button onClick={addRoom} id="addroom-btn">
            Add room
          </button> */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 5,
            }}
          >
            <Button
              variant="contained"
              onClick={addRoom}
              sx={{ backgroundColor: "#a7421a65" }}
            >
              Add room
            </Button>
          </Box>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}
