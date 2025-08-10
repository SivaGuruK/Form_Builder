import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from "@mui/material";
import { FormField } from "../../assets/types";

interface RadioFieldProps {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
  errors: string[];
}

const RadioField: React.FC<RadioFieldProps> = ({
  field,
  value,
  onChange,
  errors,
}) => {
  return (
    <FormControl
      component="fieldset"
      error={errors.length > 0}
      margin="normal"
      fullWidth
    >
      <FormLabel component="legend" required={field.required}>
        {field.label}
      </FormLabel>
      <RadioGroup
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      >
        {field.options?.map((option) => (
          <FormControlLabel
            key={option}
            value={option}
            control={<Radio />}
            label={option}
          />
        ))}
      </RadioGroup>
      {errors.length > 0 && (
        <FormHelperText>{errors.join(", ")}</FormHelperText>
      )}
    </FormControl>
  );
};

export default RadioField;
