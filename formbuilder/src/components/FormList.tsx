import React, { useEffect } from "react";
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { loadFormsFromStorage } from "../utils/localStorage";
import { setCurrentForm } from "../store/actions";

const FormList: React.FC = () => {
  const dispatch = useDispatch();
  const forms = useSelector((state: any) => state.forms.forms);
  const [localForms, setLocalForms] = useState<Record<string, any>>({});

  useEffect(() => {
    // Load forms from localStorage on component mount
    const storedForms = loadFormsFromStorage();
    setLocalForms(storedForms);
  }, [forms]); // Update when Redux forms change

  const handleFormClick = (formId: string) => {
    const form = localForms[formId];
    if (form) {
      dispatch(setCurrentForm(form));
      // Navigate to preview - you would use your routing here
      window.location.href = "/preview";
    }
  };

  const handleDeleteForm = (formId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // Dispatch delete action
    dispatch({ type: "DELETE_FORM", payload: formId });
    // Update local state
    const updatedForms = { ...localForms };
    delete updatedForms[formId];
    setLocalForms(updatedForms);
  };

  const handleCreateNew = () => {
    dispatch(setCurrentForm(null));
    // Navigate to create form - you would use your routing here
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
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((form: any) => (
                <React.Fragment key={form.id}>
                  <ListItem
                    button
                    onClick={() => handleFormClick(form.id)}
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
                    <ListItemText
                      primary={form.name}
                      secondary={`Created: ${new Date(
                        form.createdAt
                      ).toLocaleString()} | Fields: ${form.fields.length}`}
                    />
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
