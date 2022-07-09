import { Box, CircularProgress } from "@mui/material";

interface IProps {
  fullHeight?: boolean;
}

export function Loading({ fullHeight = false }: IProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: fullHeight ? "100vh" : "100%",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
