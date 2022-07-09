import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { authUtils } from "../../utils/auth";
import { Loading } from "../common/Loading";
import { Box } from "@mui/material";
import { Sidebar } from "../common/Sidebar";

export function AppLayout() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await authUtils.isAuthenticated();
      if (!user) {
        navigate("/signin");
      } else {
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

  return loading ? (
    <Loading fullHeight />
  ) : (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Sidebar />
      <Box
        sx={{
          flexGrow: 1,
          p: 1,
          width: "max-content",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
