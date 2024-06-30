import React from "react";
import { Box, Card, CardContent, Typography, Avatar, Grid, IconButton } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import logo from "../assets/logo.png";

const About = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          p: 2,
          boxShadow: 3,
        }}
      >
        <CardContent sx={{ textAlign: "center" }}>
          <Avatar
            alt="Profile Image"
            src={logo}
            sx={{ width: 100, height: 100, margin: "0 auto 20px" }}
          />
          <Typography variant="h5" gutterBottom>
            Ömer Faruk ÖNCÜ
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            farukoncu78@gmail.com
          </Typography>
          <Grid container justifyContent="center" spacing={2} mt={2}>
            <Grid item>
              <IconButton
                component="a"
                href="https://www.linkedin.com/in/omer-faruk-oncu/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon color="primary" />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                component="a"
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon color="primary" />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                component="a"
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon color="primary" />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                component="a"
                href="https://github.com/omer-faruk-oncu"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default About;
