import { Box, ListItem, ListItemButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { boardApi } from "../../api/boarApi";
import { setFavorites } from "../../redux/features/favoriteSlice";
import { RootState } from "../../redux/store";

export function FavoriteList() {
  const dispatch = useDispatch();
  const boards = useSelector((state: RootState) => state.favorites.value);

  const [activeIndex, setActiveIndex] = useState(0);
  const { boardId } = useParams();

  useEffect(() => {
    const getBoard = async () => {
      try {
        const response = await boardApi.getFavorites();
        dispatch(setFavorites(response.data));
      } catch (error) {}
    };

    getBoard();
  }, []);

  useEffect(() => {
    const active = boards.findIndex((board) => board.id === boardId);
    setActiveIndex(active);
  }, [boards, boardId]);

  const onDragEnd = async ({ source, destination }: DropResult) => {
    const newList = [...boards];
    const [removed] = newList.splice(source.index, 1);
    newList.splice(destination?.index ?? source.index, 0, removed);

    const activeItem = newList.findIndex((item) => item.id === boardId);
    setActiveIndex(activeItem);
    dispatch(setFavorites(newList));

    try {
      await boardApi.updateFavoritePosition({ boards: newList });
    } catch (error) {}
  };

  return (
    <>
      <ListItem>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body2" fontWeight="700">
            Favorites
          </Typography>
        </Box>
      </ListItem>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          key={"list-board-droppable-key"}
          droppableId="list-board-droppable"
        >
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {boards.map((board, index) => (
                <Draggable key={board.id} draggableId={board.id} index={index}>
                  {(provided, snapshot) => (
                    <ListItemButton
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      selected={activeIndex === index}
                      component={Link}
                      to={`/boards/${board.id}`}
                      sx={{
                        pl: "20px",
                        cursor: snapshot.isDragging
                          ? "grab"
                          : "pointer!important",
                      }}
                    >
                      <Typography
                        variant="body2"
                        fontWeight="700"
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {board.icon} {board.title}
                      </Typography>
                    </ListItemButton>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}
