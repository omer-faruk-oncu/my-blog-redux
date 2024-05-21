import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box variant="h6" align="center" color="primary.main">
      <Typography>Developed by Ömer Faruk ÖNCÜ</Typography>
      <Typography>Copyright {new Date().getFullYear()}</Typography>
    </Box>
  );
}

export default Footer;
