import { LoadingButton } from "@mui/lab";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../api/authApi";

export function SignIn() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setUsernameErrText("");
    setPasswordErrText("");

    const data = new FormData(event.target as HTMLFormElement);
    const username = data.get("username")?.toString()?.trim() ?? "";
    const password = data.get("password")?.toString()?.trim() ?? "";

    let error = false;

    if (!username) {
      error = true;
      setUsernameErrText("Please fill your username.");
    }

    if (!password) {
      error = true;
      setPasswordErrText("Please fill your password.");
    }

    if (error) {
      return;
    }

    try {
      const response = await authApi.signIn(username, password);

      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error: any) {
      const errors = error.response.data.errors;
      if (errors && Array.isArray(errors)) {
        errors.forEach((error: any) => {
          if (error.param === "username") {
            setUsernameErrText(error.msg);
          } else if (error.param === "password") {
            setPasswordErrText(error.msg);
          }
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          disabled={loading}
          error={!!usernameErrText}
          helperText={usernameErrText}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          name="password"
          type="password"
          disabled={loading}
          error={!!passwordErrText}
          helperText={passwordErrText}
        />

        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          variant="outlined"
          fullWidth
          color="success"
          type="submit"
          loading={loading}
        >
          Sign In
        </LoadingButton>
      </Box>
      <Button component={Link} to="/signup" sx={{ textTransform: "none" }}>
        Don't have an account? Sign up
      </Button>
    </>
  );
}
