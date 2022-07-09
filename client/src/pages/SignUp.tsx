import { LoadingButton } from "@mui/lab";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

export function SignUp() {
  const [loading, setLoading] = useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="Name"
          disabled={loading}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="Username"
          disabled={loading}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          name="Password"
          type="password"
          disabled={loading}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="confirmPassword"
          label="Confirm password"
          name="confirmPassword"
          type="password"
          disabled={loading}
        />

        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          variant="outlined"
          fullWidth
          color="success"
          type="submit"
          loading={loading}
        >
          Sign Up
        </LoadingButton>
      </Box>
      <Button component={Link} to="/signin" sx={{ textTransform: "none" }}>
        Already have an account? Sign in
      </Button>
    </>
  );
}
