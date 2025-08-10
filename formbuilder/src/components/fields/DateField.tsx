import React from "react";
import { TextField as MuiTextField } from "@mui/material";
import { FormField } from "../../assets/types";

interface DateFieldProps {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
  errors: string[];
}

const DateField: React.FC<DateFieldProps> = ({
  field,
  value,
  onChange,
  errors,
}) => {
  return (
    <MuiTextField
      fullWidth
      label={field.label}
      type="date"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      required={field.required}
      error={errors.length > 0}
      helperText={errors.join(", ")}
      variant="outlined"
      margin="normal"
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export default DateField;
