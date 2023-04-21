import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Link to="/">
        <Typography
          sx={{
            textTransform: "uppercase",
            fontSize: { xs: "9vw", sm: "4vw" },
            cursor: "pointer",
            fontFamily: "Montserrat, sans-serif",

          }}
        >
          Quizzes App
        </Typography>
      </Link>
      <hr className="divider" />
    </Box>
  );
};

export default Header;
