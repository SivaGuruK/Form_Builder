import React from "react";
import { TextField as MuiTextField } from "@mui/material";
import { FormField } from "../../assets/types";

interface NumberFieldProps {
  field: FormField;
  value: number | string;
  onChange: (value: number | string) => void;
  errors: string[];
}

const NumberField: React.FC<NumberFieldProps> = ({
  field,
  value,
  onChange,
  errors,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === "") {
      onChange("");
    } else if (!isNaN(Number(inputValue))) {
      onChange(Number(inputValue));
    }
  };

  return (
    <MuiTextField
      fullWidth
      label={field.label}
      value={value || ""}
      onChange={handleChange}
      required={field.required}
      error={errors.length > 0}
      helperText={errors.join(", ")}
      variant="outlined"
      margin="normal"
      type="number"
    />
  );
};

export default NumberField;
