import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { boardApi } from "../api/boarApi";
import { setBoards } from "../redux/features/boardSlice";

export function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const createBoard = async () => {
    setLoading(true);
    try {
      const response = await boardApi.create();
      dispatch(setBoards([response.data]));
      navigate(`/boards/${response.data.id}`);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoadingButton
        variant="outlined"
        color="success"
        onClick={createBoard}
        loading={loading}
      >
        Click here to create your first board
      </LoadingButton>
    </Box>
  );
}
