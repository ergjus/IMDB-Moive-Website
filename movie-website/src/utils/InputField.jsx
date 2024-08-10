import {TextField} from "@mui/material";

const InputField = ({
  label,
  color = "white",
  type = "text",
  value,
  onChange,
}) => {
  return (
    <TextField
      variant="outlined"
      label={label}
      size="small"
      type={type}
      value={value} // Accept the value prop
      onChange={onChange} // Accept the onChange prop
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: color,
          },
          "&:hover fieldset": {
            borderColor: color,
          },
          "&.Mui-focused fieldset": {
            borderColor: color,
          },
          "& input": {
            color: color,
          },
        },
        "& .MuiInputLabel-root": {
          color: color,
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: color,
        },
      }}
    />
  );
};

export default InputField;
