import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { authUtils } from "../../utils/auth";
import { Loading } from "../common/Loading";
import LogoDark from "../../assets/logo-dark.png";

export function AuthLayout() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await authUtils.isAuthenticated();
      if (!isAuth) {
        setLoading(false);
      } else {
        navigate("/");
      }
    };
    checkAuth();
  }, [navigate]);

  return loading ? (
    <Loading fullHeight />
  ) : (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          src={LogoDark}
          alt="logo"
          style={{
            width: "100px",
          }}
        />
        <Outlet />
      </Box>
    </Container>
  );
}
