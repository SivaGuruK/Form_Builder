import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function Home() {
    return (
    <div>
    <div>
        <h1>Welcome to the<br/>Form Builder application!</h1>
        <p>Choose An Option to Get Started</p>
    </div>
    <div>
    <Box sx={{ flexGrow: 3 }}>
      <Grid container spacing={2} columns={12}>
        <Grid size={4}>
          <Item>
          <img src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png" alt="Create Form" width="48" height="48"/>
          <h2>Create Form</h2>
            <p>Design and build your own forms with ease.</p>
          </Item>
        </Grid>
        <Grid size={4}>
                            <Item>
                            <img src="https://cdn-icons-png.flaticon.com/512/709/709612.png" alt="Preview Form" width="48" height="48"/>
                            <h2>Preview Forms</h2>
                            <p>View the Form As End User</p>
          </Item>
        </Grid>
        <Grid size={4}>
            <Item>
            <img src="https://cdn-icons-png.flaticon.com/512/716/716784.png" alt="My Forms" width="48" height="48"/>
            <h2>My Forms</h2>
            <p>Browse And Manage Saved Forms</p>
          </Item>
        </Grid>
      </Grid>
    </Box>
    </div>
    </div>
  );
}