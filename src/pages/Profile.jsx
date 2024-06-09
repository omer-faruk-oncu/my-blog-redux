import React from "react";
import { Box, Card, CardContent, Typography, Avatar } from "@mui/material";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

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
            src={user?.image || "default-profile-image-url"}
            sx={{ width: 100, height: 100, margin: "0 auto 20px" }}
          />
          <Typography variant="h5" gutterBottom>
            {user?.username}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            {user?.email}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
