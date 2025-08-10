import React from "react";
import {
  FormControlLabel,
  Checkbox,
  FormHelperText,
  FormControl,
} from "@mui/material";
import { FormField } from "../../assets/types";

interface CheckboxFieldProps {
  field: FormField;
  value: boolean;
  onChange: (value: boolean) => void;
  errors: string[];
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  field,
  value,
  onChange,
  errors,
}) => {
  return (
    <FormControl error={errors.length > 0} margin="normal" fullWidth>
      <FormControlLabel
        control={
          <Checkbox
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
            color="primary"
          />
        }
        label={field.label}
      />
      {errors.length > 0 && (
        <FormHelperText>{errors.join(", ")}</FormHelperText>
      )}
    </FormControl>
  );
};

export default CheckboxField;
