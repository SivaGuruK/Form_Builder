import React from "react";
import { TextField as MuiTextField, MenuItem } from "@mui/material";
import { FormField } from "../../assets/types";

interface SelectFieldProps {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
  errors: string[];
}

const SelectField: React.FC<SelectFieldProps> = ({
  field,
  value,
  onChange,
  errors,
}) => {
  return (
    <MuiTextField
      select
      fullWidth
      label={field.label}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      required={field.required}
      error={errors.length > 0}
      helperText={errors.join(", ")}
      variant="outlined"
      margin="normal"
    >
      {field.options?.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </MuiTextField>
  );
};

export default SelectField;
