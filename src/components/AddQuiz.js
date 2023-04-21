import AddIcon from "@mui/icons-material/Add";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import FormAddQuiz from "./FormAddQuiz";

export default function Modale() {
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{ display: "flex", alginItems: "center", justifyContent: "center" }}
    >
      <Button
        onClick={() => setOpen(true)}
        variant="outlined"
        sx={{
          backgroundColor: "#ffffffab",
          fontSize: { xs: "0.65rem", sm: "0.75" },
        }}
        endIcon={<AddIcon />}
      >
        Create a new quiz
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: "500px" },
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: "5px",
              p: { xs: "10px", sm: "30px" },
            }}
          >
            <Grid>
              <Card
                style={{ maxWidth: 500, padding: "10px 5px", margin: "0 auto" }}
              >
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    Create a quiz
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    sx={{ mb: "1rem" }}
                    gutterBottom
                  >
                    The input fields must be filled in in order for you to
                    create a quiz.
                  </Typography>
                  <FormAddQuiz open={open} setOpen={setOpen} />
                </CardContent>
              </Card>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
