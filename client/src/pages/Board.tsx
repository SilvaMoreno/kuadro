import {
  DeleteOutlined,
  StarBorderOutlined,
  StarOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { boardApi } from "../api/boarApi";
import { EmojiPicker } from "../components/common/EmojiPicker";
import { setBoards } from "../redux/features/boardSlice";
import { RootState } from "../redux/store";
import { IBoard } from "../utils/type";

let timer: number;
const timeout = 1000;

export function Board() {
  const dispatch = useDispatch();

  const boards = useSelector((state: RootState) => state.boards.value);

  const { boardId } = useParams();
  const [board, setBoard] = useState<IBoard>();

  useEffect(() => {
    const getBoard = async () => {
      if (!boardId) {
        return;
      }
      try {
        const response = await boardApi.one(boardId);
        setBoard(response.data);
      } catch (error) {}
    };

    getBoard();
  }, [boardId]);

  const onIconChange = async (icon: string) => {
    if (!board) {
      return;
    }

    let tmp = [...boards];
    const index = tmp.findIndex((b) => b.id === board.id);
    tmp[index] = { ...tmp[index], icon };
    setBoard({ ...board, icon });
    dispatch(setBoards(tmp));

    try {
      boardApi.update(board.id, { icon });
    } catch (error) {}
  };

  const updateTitle = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!board) {
      return;
    }

    clearTimeout(timer);
    const title = e.target.value;

    let tmp = [...boards];
    const index = tmp.findIndex((b) => b.id === boardId);
    tmp[index] = { ...tmp[index], title };
    setBoard({ ...board, title });
    dispatch(setBoards(tmp));

    timer = setTimeout(() => {
      try {
        boardApi.update(board.id, { title });
      } catch (error) {}
    }, timeout);
  };

  const updateDescription = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!board) {
      return;
    }

    clearTimeout(timer);
    const description = e.target.value;
    setBoard({ ...board, description });

    timer = setTimeout(() => {
      try {
        boardApi.update(board.id, { description });
      } catch (error) {}
    }, timeout);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <IconButton onClick={() => {}}>
          {board?.favorite ? (
            <StarOutlined color="warning" />
          ) : (
            <StarBorderOutlined />
          )}
        </IconButton>

        <IconButton color="error">
          <DeleteOutlined />
        </IconButton>
      </Box>

      <Box
        sx={{
          padding: "10px 20px",
        }}
      >
        <Box>
          <EmojiPicker icon={board?.icon ?? ""} onChange={onIconChange} />
        </Box>
        <TextField
          value={board?.title}
          onChange={updateTitle}
          placeholder="Untitled"
          fullWidth
          sx={{
            "& .MuiOutlinedInput-input": { padding: "0" },
            "& .MuiOutlinedInput-notchedOutline": { border: "unset" },
            "& .MuiOutlinedInput-root": { fontSize: "2rem", fontWeight: "700" },
          }}
        />

        <TextField
          value={board?.description}
          multiline
          onChange={updateDescription}
          placeholder="Add a description"
          fullWidth
          sx={{
            "& .MuiOutlinedInput-input": { padding: "0" },
            "& .MuiOutlinedInput-notchedOutline": { border: "unset" },
            "& .MuiOutlinedInput-root": { fontSize: "0.8rem" },
          }}
        />

        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button>Add Section</Button>
            <Typography variant="body2" fontWeight="700">
              {board?.sections?.length ?? 0} Sections
            </Typography>
          </Box>
          <Divider sx={{ margin: "10px 0" }} />
        </Box>
      </Box>
    </>
  );
}
