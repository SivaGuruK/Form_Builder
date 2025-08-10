import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Paper,
  Typography,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField as MuiTextField,
  Box,
} from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ReorderIcon from "@mui/icons-material/DragIndicator";

import { FormField, FieldType } from "../assets/types";
import {
  addField,
  updateField,
  deleteField,
  reorderFields,
} from "../store/actions";
import FieldConfigurator from "./FieldConfigurator";
import { saveFormToStorage } from "../utils/localStorage";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

const fieldTypes: { type: FieldType; label: string }[] = [
  { type: "text", label: "Text" },
  { type: "number", label: "Number" },
  { type: "textarea", label: "Text Area" },
  { type: "select", label: "Dropdown" },
  { type: "radio", label: "Radio Buttons" },
  { type: "checkbox", label: "Checkbox" },
  { type: "date", label: "Date" },
];

const FormBuilder: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentForm = useAppSelector((state) => state.forms.currentForm);

  const [selectedField, setSelectedField] = useState<FormField | null>(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [formName, setFormName] = useState("");

  useEffect(() => {
    if (currentForm) {
      setFormName(currentForm.name);
    }
  }, [currentForm]);

  const handleAddField = (type: FieldType) => {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      required: false,
      defaultValue: "",
      isDerived: false,
    };

    if (type === "select" || type === "radio") {
      newField.options = ["Option 1", "Option 2"];
    }

    if (type === "checkbox") {
      newField.defaultValue = false;
    }

    dispatch(addField(newField));
    setSelectedField(newField);
    setIsConfigOpen(true);
  };

  const handleFieldClick = (field: FormField) => {
    setSelectedField(field);
    setIsConfigOpen(true);
  };

  const handleFieldUpdate = (updates: Partial<FormField>) => {
    if (selectedField) {
      dispatch(updateField(selectedField.id, updates));
      setSelectedField({ ...selectedField, ...updates });
    }
  };

  const handleFieldDelete = (fieldId: string) => {
    dispatch(deleteField(fieldId));
    if (selectedField?.id === fieldId) {
      setSelectedField(null);
      setIsConfigOpen(false);
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    dispatch(reorderFields(result.source.index, result.destination.index));
  };

  const handleSaveForm = () => {
    if (!currentForm) return;

    const updatedForm = {
      ...currentForm,
      name: formName,
      createdAt: currentForm.createdAt || new Date().toISOString(),
    };

    dispatch({ type: "UPDATE_FORM", payload: updatedForm });
    saveFormToStorage(updatedForm);
    setIsSaveDialogOpen(false);
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
    <Grid container spacing={3}>
      {/* Add Field Panel */}
      <Grid size={4}>
        <Paper elevation={3} style={{ padding: "16px" }}>
          <Typography variant="h6" gutterBottom>
            Add Field
          </Typography>
          <Divider />
          <div style={{ marginTop: "16px" }}>
            {fieldTypes.map((fieldType) => (
              <Button
                key={fieldType.type}
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => handleAddField(fieldType.type)}
                style={{ margin: "8px 0", display: "block", width: "100%" }}
              >
                {fieldType.label}
              </Button>
            ))}
          </div>
        </Paper>
      </Grid>

      {/* Form Builder */}
      <Grid size={4}>
        <Paper elevation={3} style={{ padding: "16px" }}>
          <Typography variant="h6" gutterBottom>
            Form Builder
          </Typography>
          <Divider />
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="fields">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {currentForm.fields.length === 0 ? (
                    <Typography
                      variant="body1"
                      style={{ margin: "16px 0", textAlign: "center" }}
                    >
                      No fields added yet. Click on a field type to add one.
                    </Typography>
                  ) : (
                    currentForm.fields.map((field, index) => (
                      <Draggable
                        key={field.id}
                        draggableId={field.id}
                        index={index}
                      >
                        {(provided) => (
                          <Paper
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            elevation={2}
                            style={{
                              margin: "16px 0",
                              padding: "16px",
                              display: "flex",
                              alignItems: "center",
                              ...provided.draggableProps.style,
                            }}
                          >
                            <div
                              {...provided.dragHandleProps}
                              style={{ marginRight: "8px" }}
                            >
                              <ReorderIcon />
                            </div>
                            <div style={{ flexGrow: 1 }}>
                              <Typography>
                                {field.label} ({field.type})
                                {field.required && " *"}
                              </Typography>
                            </div>
                            <IconButton onClick={() => handleFieldClick(field)}>
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => handleFieldDelete(field.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Paper>
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Paper>
      </Grid>

      {/* Field Configurator */}
      <Grid size={4}>
        {selectedField && isConfigOpen && (
          <FieldConfigurator
            field={selectedField}
            onUpdate={handleFieldUpdate}
            onClose={() => setIsConfigOpen(false)}
            allFields={currentForm.fields.filter(
              (f) => f.id !== selectedField.id
            )}
          />
        )}
      </Grid>

      {/* Save Button */}
      <Grid size={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsSaveDialogOpen(true)}
          disabled={currentForm.fields.length === 0}
        >
          Save Form
        </Button>
      </Grid>

      {/* Save Dialog */}
      <Dialog
        open={isSaveDialogOpen}
        onClose={() => setIsSaveDialogOpen(false)}
      >
        <DialogTitle>Save Form</DialogTitle>
        <DialogContent>
          <MuiTextField
            autoFocus
            margin="dense"
            label="Form Name"
            fullWidth
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsSaveDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleSaveForm}
            color="primary"
            disabled={!formName.trim()}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default FormBuilder;
