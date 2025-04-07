import React from "react";
import {
  Grid2,
  InputLabel,
  TextField,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

const TextFieldCustom = ({
  id,
  value,
  onChange,
  placeholder,
  label,
  type,
  textarea,
  option,
}) => {
  return (
    <>
      {type === "text" || type === "number" ? (
        <>
          <InputLabel
            shrink
            sx={{ color: "white", fontSize: "large", fontWeight: "bold" }}
          >
            {label}
          </InputLabel>
          <TextField
            fullWidth
            id={id}
            variant="outlined"
            value={value}
            type={type}
            name={id}
            placeholder={placeholder}
            onChange={onChange}
            sx={{ backgroundColor: "white", width: 1 / 2 }}
            multiline={textarea ? true : false}
          />
        </>
      ) : type === "select" ? (
        <>
          <InputLabel
            shrink
            sx={{ color: "white", fontSize: "large", fontWeight: "bold" }}
          >
            {label}
          </InputLabel>
          <Select
            value={value}
            onChange={onChange}
            displayEmpty
            name={id}
            sx={{ backgroundColor: "white", width: 1 / 2 }}
          >
            <MenuItem disabled value="" selected>
              <em>{label}</em>
            </MenuItem>
            {/* <MenuItem value="" selected>
              <em>{label}</em>
            </MenuItem> */}
            {option.map((item, index) => {
              return (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </>
      ) : (
        <>
          <InputLabel
            shrink
            sx={{ color: "white", fontSize: "large", fontWeight: "bold" }}
          >
            {label}
          </InputLabel>
          <TextField
            id={id}
            variant="outlined"
            value={value}
            type={type}
            name={id}
            placeholder={placeholder}
            onChange={onChange}
            sx={{ backgroundColor: "white", width: 1 / 2 }}
            multiline={textarea ? true : false}
          />
        </>
      )}
    </>
  );
};

export default TextFieldCustom;
