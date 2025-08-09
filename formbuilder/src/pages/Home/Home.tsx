// import * as React from "react";
// import { styled } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
// import Grid from "@mui/material/Grid";
// import { useNavigate } from "react-router-dom";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: (theme.vars ?? theme).palette.text.secondary,
//   ...theme.applyStyles("dark", {
//     backgroundColor: "#1A2027",
//   }),
// }));

// export default function Home() {
//     const navigate = useNavigate();

//     return (
//       <div>
//         <div>
//           <h1>
//             Welcome to the
//             <br />
//             Form Builder application!
//           </h1>
//           <p>Choose An Option to Get Started</p>
//         </div>
//         <div>
//           <Box sx={{ flexGrow: 3 }}>
//             <Grid container spacing={2} columns={12}>
//               <Grid size={4}>
//                 <Item onClick={() => navigate("/create-form")}>
//                   <img
//                     src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png"
//                     alt="Create Form"
//                     width="48"
//                     height="48"
//                   />
//                   <h2>Create Form</h2>
//                   <p>Design and build your own forms with ease.</p>
//                 </Item>
//               </Grid>
//               <Grid size={4}>
//                 <Item onClick={() => navigate("/preview-forms")}>
//                   <img
//                     src="https://cdn-icons-png.flaticon.com/512/709/709612.png"
//                     alt="Preview Form"
//                     width="48"
//                     height="48"
//                   />
//                   <h2>Preview Forms</h2>
//                   <p>View the Form As End User</p>
//                 </Item>
//               </Grid>
//               <Grid size={4}>
//                 <Item onClick={() => navigate("/my-forms")}>
//                   <img
//                     src="https://cdn-icons-png.flaticon.com/512/716/716784.png"
//                     alt="My Forms"
//                     width="48"
//                     height="48"
//                   />
//                   <h2>My Forms</h2>
//                   <p>Browse And Manage Saved Forms</p>
//                 </Item>
//               </Grid>
//             </Grid>
//           </Box>
//         </div>
//       </div>
//     );
// }

import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  borderRadius: "16px",
  padding: theme.spacing(4),
  textAlign: "center",
  color: "#fff",
  cursor: "pointer",
  transition: "transform 0.2s ease, background-color 0.2s ease",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
  "&:hover": {
    transform: "translateY(-5px)",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
}));

const pageWrapper: React.CSSProperties = {
  background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "2rem",
  color: "#fff",
};

const titleStyle: React.CSSProperties = {
  fontSize: "2.5rem",
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: "0.5rem",
};

const subtitleStyle: React.CSSProperties = {
  fontSize: "1rem",
  opacity: 0.8,
  marginBottom: "2rem",
  textAlign: "center",
};

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={pageWrapper}>
      <div>
        <h1 style={titleStyle}>Welcome to the Form Builder</h1>
        <p style={subtitleStyle}>Choose an option to get started.</p>
      </div>
      <Box sx={{ flexGrow: 1, maxWidth: "900px" }}>
        <Grid container spacing={3}>
          <Grid size={4}>
            <Item onClick={() => navigate("/create")}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png"
                alt="Create Form"
                width="48"
                height="48"
              />
              <h2>Create Form</h2>
              <p>Build a new form from scratch.</p>
            </Item>
          </Grid>
          <Grid size={4}>
            <Item onClick={() => navigate("/preview")}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/709/709612.png"
                alt="Preview Form"
                width="48"
                height="48"
              />
              <h2>Preview Form</h2>
              <p>Preview the form as an end user.</p>
            </Item>
          </Grid>
          <Grid size={4}>
            <Item onClick={() => navigate("/myforms")}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/716/716784.png"
                alt="My Forms"
                width="48"
                height="48"
              />
              <h2>My Forms</h2>
              <p>Browse & Manage saved forms</p>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}