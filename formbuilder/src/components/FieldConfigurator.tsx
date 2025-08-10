import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField as MuiTextField,
  Button,
  FormControlLabel,
  Switch,
  Typography,
  Grid,
  MenuItem,
  Chip,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  SelectChangeEvent,
} from "@mui/material";
import { FormField } from "../assets/types";

interface FieldConfiguratorProps {
  field: FormField;
  onUpdate: (updates: Partial<FormField>) => void;
  onClose: () => void;
  allFields: FormField[];
}

const FieldConfigurator: React.FC<FieldConfiguratorProps> = ({
  field,
  onUpdate,
  onClose,
  allFields,
}) => {
  const [localField, setLocalField] = useState<FormField>({ ...field });
  const [newOption, setNewOption] = useState("");
  const [parentFields, setParentFields] = useState<string[]>(
    field.parentFields || []
  );

  useEffect(() => {
    setLocalField({ ...field });
    setParentFields(field.parentFields || []);
  }, [field]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLocalField({
      ...localField,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleValidationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLocalField({
      ...localField,
      validation: {
        ...localField.validation,
        [name]: type === "checkbox" ? checked : value,
      },
    });
  };

  const handleAddOption = () => {
    if (newOption.trim() && !localField.options?.includes(newOption.trim())) {
      const updatedOptions = [...(localField.options || []), newOption.trim()];
      setLocalField({
        ...localField,
        options: updatedOptions,
      });
      setNewOption("");
    }
  };

  const handleRemoveOption = (option: string) => {
    const updatedOptions =
      localField.options?.filter((o) => o !== option) || [];
    setLocalField({
      ...localField,
      options: updatedOptions,
    });
  };

  const handleParentFieldsChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setParentFields(typeof value === "string" ? value.split(",") : value);
  };

  const handleSave = () => {
    const updates: Partial<FormField> = { ...localField };

    if (updates.isDerived) {
      updates.parentFields = parentFields;
    } else {
      updates.parentFields = undefined;
      updates.derivationLogic = undefined;
    }

    onUpdate(updates);
    onClose();
  };

  const renderFieldSpecificConfig = () => {
    switch (localField.type) {
      case "select":
      case "radio":
        return (
          <div style={{ marginTop: "16px" }}>
            <Typography variant="subtitle1">Options</Typography>
            <div
              style={{ display: "flex", alignItems: "center", margin: "8px 0" }}
            >
              <MuiTextField
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                label="New Option"
                size="small"
                style={{ flexGrow: 1 }}
              />
              <Button
                onClick={handleAddOption}
                disabled={!newOption.trim()}
                style={{ marginLeft: "8px" }}
              >
                Add
              </Button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {localField.options?.map((option) => (
                <Chip
                  key={option}
                  label={option}
                  onDelete={() => handleRemoveOption(option)}
                />
              ))}
            </div>
          </div>
        );
      case "checkbox":
        return (
          <FormControlLabel
            control={
              <Switch
                checked={!!localField.defaultValue}
                onChange={(e) =>
                  setLocalField({
                    ...localField,
                    defaultValue: e.target.checked,
                  })
                }
                name="defaultValue"
              />
            }
            label="Default Checked"
          />
        );
      default:
        return null;
    }
  };

  const renderValidationConfig = () => {
    return (
      <div style={{ marginTop: "16px" }}>
        <Typography variant="subtitle1">Validation Rules</Typography>
        <Grid container spacing={2}>
          <Grid size={4}>
            <FormControlLabel
              control={
                <Switch
                  checked={localField.required || false}
                  onChange={(e) =>
                    setLocalField({
                      ...localField,
                      required: e.target.checked,
                    })
                  }
                  name="required"
                />
              }
              label="Required"
            />
          </Grid>

          {["text", "textarea"].includes(localField.type) && (
            <>
              <Grid size={4}>
                <MuiTextField
                  label="Min Length"
                  type="number"
                  name="minLength"
                  value={localField.validation?.minLength || ""}
                  onChange={handleValidationChange}
                  fullWidth
                />
              </Grid>
              <Grid size={4}>
                <MuiTextField
                  label="Max Length"
                  type="number"
                  name="maxLength"
                  value={localField.validation?.maxLength || ""}
                  onChange={handleValidationChange}
                  fullWidth
                />
              </Grid>
              <Grid size={4}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={localField.validation?.notEmpty || false}
                      onChange={handleValidationChange}
                      name="notEmpty"
                    />
                  }
                  label="Not Empty"
                />
              </Grid>
              {localField.type === "text" && (
                <>
                  <Grid size={4}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={localField.validation?.email || false}
                          onChange={handleValidationChange}
                          name="email"
                        />
                      }
                      label="Email Format"
                    />
                  </Grid>
                  <Grid size={4}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={localField.validation?.password || false}
                          onChange={handleValidationChange}
                          name="password"
                        />
                      }
                      label="Password (min 8 chars with number)"
                    />
                  </Grid>
                </>
              )}
            </>
          )}
        </Grid>
      </div>
    );
  };

  const renderDerivedFieldConfig = () => {
    if (!localField.isDerived) return null;

    return (
      <div style={{ marginTop: "16px" }}>
        <Typography variant="subtitle1">Derived Field Configuration</Typography>

        <FormControl fullWidth style={{ marginTop: "8px" }}>
          <InputLabel>Parent Fields</InputLabel>
          <Select
            multiple
            value={parentFields}
            onChange={handleParentFieldsChange}
            input={<OutlinedInput label="Parent Fields" />}
          >
            {allFields.map((f) => (
              <MenuItem key={f.id} value={f.id}>
                {f.label} ({f.type})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <MuiTextField
          label="Derivation Logic"
          value={localField.derivationLogic || ""}
          onChange={(e) =>
            setLocalField({
              ...localField,
              derivationLogic: e.target.value,
            })
          }
          fullWidth
          margin="normal"
          helperText="Use 'sum', 'concat', 'age' or JavaScript expressions with parent fields as field1, field2, etc."
        />
      </div>
    );
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Configure Field</DialogTitle>
      <DialogContent dividers>
        <MuiTextField
          label="Field Label"
          name="label"
          value={localField.label}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <FormControlLabel
          control={
            <Switch
              checked={localField.isDerived || false}
              onChange={(e) =>
                setLocalField({
                  ...localField,
                  isDerived: e.target.checked,
                })
              }
              name="isDerived"
            />
          }
          label="Derived Field"
        />

        {renderFieldSpecificConfig()}
        {renderValidationConfig()}
        {renderDerivedFieldConfig()}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FieldConfigurator;
