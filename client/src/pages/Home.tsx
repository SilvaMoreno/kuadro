import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";

export function Home() {
  const createBoard = () => {};

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoadingButton variant="outlined" color="success" onClick={createBoard}>
        Click here to create your first board
      </LoadingButton>
    </Box>
  );
}
