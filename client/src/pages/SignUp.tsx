import { LoadingButton } from "@mui/lab";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../api/authApi";

export function SignUp() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [nameErrText, setNameErrText] = useState("");
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [passwordConfirmErrText, setPasswordConfirmErrText] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setNameErrText("");
    setUsernameErrText("");
    setPasswordErrText("");
    setPasswordConfirmErrText("");

    const data = new FormData(event.target as HTMLFormElement);
    const name = data.get("name")?.toString()?.trim() ?? "";
    const username = data.get("username")?.toString()?.trim() ?? "";
    const password = data.get("password")?.toString()?.trim() ?? "";
    const passwordConfirm =
      data.get("confirmPassword")?.toString()?.trim() ?? "";

    let error = false;

    if (!name) {
      error = true;
      setNameErrText("Please fill your name.");
    }

    if (!username) {
      error = true;
      setUsernameErrText("Please fill your username.");
    }

    if (!password) {
      error = true;
      setPasswordErrText("Please fill your password.");
    }

    if (!passwordConfirm) {
      error = true;
      setPasswordConfirmErrText("Please fill your password confirmation.");
    }

    if (password !== passwordConfirm) {
      error = true;
      setPasswordConfirmErrText("Passwords do not match.");
    }

    if (error) {
      return;
    }

    setLoading(true);

    try {
      const response = await authApi.signUp(
        name,
        username,
        password,
        passwordConfirm
      );

      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error: any) {
      const errors = error.response.data.errors;
      if (errors && Array.isArray(errors)) {
        errors.forEach((error: any) => {
          if (error.param === "name") {
            setNameErrText(error.msg);
          } else if (error.param === "username") {
            setUsernameErrText(error.msg);
          } else if (error.param === "password") {
            setPasswordErrText(error.msg);
          } else if (error.param === "confirmPassword") {
            setPasswordConfirmErrText(error.msg);
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
          id="name"
          label="Name"
          name="name"
          disabled={loading}
          error={!!nameErrText}
          helperText={nameErrText}
        />

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

        <TextField
          margin="normal"
          required
          fullWidth
          id="confirmPassword"
          label="Confirm password"
          name="confirmPassword"
          type="password"
          disabled={loading}
          error={!!passwordConfirmErrText}
          helperText={passwordConfirmErrText}
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
