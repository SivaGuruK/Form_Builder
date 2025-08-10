import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Paper, Typography, Button, Grid, Box, Alert } from "@mui/material";
import { FormField } from "../assests/types";
import { validateField } from "../utils/validation";
import { calculateDerivedValue } from "../utils/derivedFields";
import TextField from "./fields/TextField";
import NumberField from "./fields/NumberField";
import TextareaField from "./fields/TextareaField";
import SelectField from "./fields/SelectField";
import RadioField from "./fields/RadioField";
import CheckboxField from "./fields/CheckboxField";
import DateField from "./fields/DateField";

const FormPreview: React.FC = () => {
  const currentForm = useSelector((state: any) => state.forms.currentForm);
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (currentForm) {
      // Initialize form values with default values
      const initialValues: Record<string, any> = {};
      currentForm.fields.forEach((field: FormField) => {
        initialValues[field.id] = field.defaultValue || "";
      });
      setFormValues(initialValues);
      setErrors({});
    }
  }, [currentForm]);

  const handleChange = (fieldId: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [fieldId]: value }));

    // Validate the field
    const field = currentForm.fields.find((f: FormField) => f.id === fieldId);
    if (field) {
      const fieldErrors = validateField(field, value);
      setErrors((prev) => ({ ...prev, [fieldId]: fieldErrors }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Record<string, string[]> = {};
    let isValid = true;

    currentForm.fields.forEach((field: FormField) => {
      if (field.isDerived) return; // Skip validation for derived fields

      const fieldErrors = validateField(field, formValues[field.id]);
      if (fieldErrors.length > 0) {
        newErrors[field.id] = fieldErrors;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setIsSubmitted(true);

    if (isValid) {
      alert("Form submitted successfully!");
      console.log("Form values:", formValues);
    }
  };

  const renderField = (field: FormField) => {
    if (field.isDerived) {
      const derivedValue = calculateDerivedValue(
        field,
        formValues,
        currentForm.fields
      );

      return (
        <TextField
          key={field.id}
          field={field}
          value={derivedValue}
          onChange={() => {}}
          errors={[]}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          helperText="This field is automatically calculated"
        />
      );
    }

    const fieldErrors = errors[field.id] || [];
    const commonProps = {
      field,
      value: formValues[field.id],
      onChange: (value: any) => handleChange(field.id, value),
      errors: fieldErrors,
    };

    switch (field.type) {
      case "text":
        return <TextField key={field.id} {...commonProps} />;
      case "number":
        return <NumberField key={field.id} {...commonProps} />;
      case "textarea":
        return <TextareaField key={field.id} {...commonProps} />;
      case "select":
        return <SelectField key={field.id} {...commonProps} />;
      case "radio":
        return <RadioField key={field.id} {...commonProps} />;
      case "checkbox":
        return <CheckboxField key={field.id} {...commonProps} />;
      case "date":
        return <DateField key={field.id} {...commonProps} />;
      default:
        return null;
    }
  };

  if (!currentForm) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6">
          No form selected. Please create or select a form.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={8}>
        <Paper elevation={3} style={{ padding: "24px" }}>
          <Typography variant="h4" gutterBottom>
            {currentForm.name}
          </Typography>

          {isSubmitted && Object.keys(errors).length > 0 && (
            <Alert severity="error" style={{ marginBottom: "16px" }}>
              Please fix the errors in the form before submitting.
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            {currentForm.fields.map((field: FormField) => (
              <div key={field.id} style={{ marginBottom: "16px" }}>
                {renderField(field)}
              </div>
            ))}

            <Box display="flex" justifyContent="flex-end" mt={4}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Submit
              </Button>
            </Box>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default FormPreview;
