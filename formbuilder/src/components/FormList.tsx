import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
  Box,
  IconButton,
  ListItemButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { loadFormsFromStorage } from "../utils/localStorage";
import { setCurrentForm } from "../store/actions";
import { useAppDispatch } from "../hooks/hooks";

const FormList: React.FC = () => {
  const dispatch = useAppDispatch();
  const forms = useSelector((state: any) => state.forms.forms);
  const [localForms, setLocalForms] = useState<Record<string, any>>({});

  useEffect(() => {
    const storedForms = loadFormsFromStorage();
    setLocalForms(storedForms);
  }, [forms]);

  const handleFormClick = (formId: string) => {
    const form = localForms[formId];
    if (form) {
      dispatch(setCurrentForm(form));
      window.location.href = "/preview";
    }
  };

  const handleDeleteForm = (formId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: "DELETE_FORM", payload: formId });
    const updatedForms = { ...localForms };
    delete updatedForms[formId];
    setLocalForms(updatedForms);
  };

  const handleCreateNew = () => {
    dispatch(setCurrentForm(null));
    window.location.href = "/create";
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h4">My Forms</Typography>
          <Button variant="contained" color="primary" onClick={handleCreateNew}>
            Create New Form
          </Button>
        </Box>

        {Object.keys(localForms).length === 0 ? (
          <Typography variant="body1" textAlign="center" py={4}>
            No forms saved yet. Create your first form to get started!
          </Typography>
        ) : (
          <List>
            {Object.values(localForms)
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((form: any) => (
                <React.Fragment key={form.id}>
                  <ListItem
                    secondaryAction={
                      <IconButton
                        edge="end"
                        onClick={(e) => handleDeleteForm(form.id, e)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemButton onClick={() => handleFormClick(form.id)}>
                      <ListItemText
                        primary={form.name}
                        secondary={`Created: ${new Date(
                          form.createdAt
                        ).toLocaleString()} | Fields: ${form.fields.length}`}
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};

export default FormList;
