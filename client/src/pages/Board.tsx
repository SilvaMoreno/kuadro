import {
  DeleteOutlined,
  StarBorderOutlined,
  StarOutlined,
} from "@mui/icons-material";
import { Box, IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { boardApi } from "../api/boarApi";
import { EmojiPicker } from "../components/common/EmojiPicker";
import { Kanban } from "../components/common/Kanban";
import { setBoards } from "../redux/features/boardSlice";
import { setFavorites } from "../redux/features/favoriteSlice";
import { RootState } from "../redux/store";
import { IBoard } from "../utils/type";

let timer: number;
const timeout = 1000;

export function Board() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const boards = useSelector((state: RootState) => state.boards.value);
  const favoritesBoards = useSelector(
    (state: RootState) => state.favorites.value
  );

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
    setBoard({ ...board, icon });

    let tmp = [...boards];
    const index = tmp.findIndex((b) => b.id === board.id);
    tmp[index] = { ...tmp[index], icon };

    if (board.favorite) {
      let tmpFavorite = [...favoritesBoards];
      const index = tmpFavorite.findIndex((b) => b.id === boardId);
      tmpFavorite[index] = { ...tmpFavorite[index], icon };
      dispatch(setFavorites(tmpFavorite));
    }

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
    setBoard({ ...board, title });

    let tmp = [...boards];
    const index = tmp.findIndex((b) => b.id === boardId);
    tmp[index] = { ...tmp[index], title };

    if (board.favorite) {
      let tmpFavorite = [...favoritesBoards];
      const index = tmpFavorite.findIndex((b) => b.id === boardId);
      tmpFavorite[index] = { ...tmpFavorite[index], title };
      dispatch(setFavorites(tmpFavorite));
    }

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

  const addFavorite = async () => {
    if (!boardId || !board) {
      return;
    }
    try {
      boardApi.update(boardId, { favorite: !board.favorite });

      let newFavoriteList = [...favoritesBoards];
      if (board.favorite) {
        newFavoriteList = newFavoriteList.filter((e) => e.id !== boardId);
      } else {
        newFavoriteList.unshift(board);
      }
      dispatch(setFavorites(newFavoriteList));

      setBoard({ ...board, favorite: !board.favorite });
    } catch (error) {}
  };

  const deleteBoard = async () => {
    if (!boardId || !board) {
      return;
    }
    try {
      boardApi.delete(boardId);

      if (board.favorite) {
        const newFavoriteList = favoritesBoards.filter((e) => e.id !== boardId);
        dispatch(setFavorites(newFavoriteList));
      }

      const newBoards = boards.filter((e) => e.id !== boardId);
      dispatch(setBoards(newBoards));

      setBoard({ ...board, favorite: !board.favorite });

      if (newBoards.length === 0) {
        navigate("/boards");
      } else {
        navigate("/boards/" + newBoards[0].id);
      }
    } catch (error) {}
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
        <IconButton onClick={addFavorite}>
          {board?.favorite ? (
            <StarOutlined color="warning" />
          ) : (
            <StarBorderOutlined />
          )}
        </IconButton>

        <IconButton color="error" onClick={deleteBoard}>
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
          <Kanban boardId={board?.id!} sections={board?.sections ?? []} />
        </Box>
      </Box>
    </>
  );
}
