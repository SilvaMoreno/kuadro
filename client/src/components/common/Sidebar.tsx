import { AddBoxOutlined, LogoutOutlined } from "@mui/icons-material";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { boardApi } from "../../api/boarApi";
import { setBoards } from "../../redux/features/boardSlice";
import { RootState } from "../../redux/store";
import { colors } from "../../utils/colors";

export function Sidebar() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.value);
  const boards = useSelector((state: RootState) => state.boards.value);
  const [activeIndex, setActiveIndex] = useState(0);

  const dispatch = useDispatch();
  const sidebarWidth = 250;
  const { boardId } = useParams();

  useEffect(() => {
    const getBoard = async () => {
      try {
        const response = await boardApi.all();
        dispatch(setBoards(response.data));
      } catch (error) {}
    };
    getBoard();
  }, []);

  useEffect(() => {
    if (boards.length > 0 && !boardId) {
      navigate("/boards/" + boards[0].id);
    }
    const active = boards.findIndex((board) => board.id === boardId);
    setActiveIndex(active);
  }, [boards, boardId]);

  const logout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  const onDragEnd = () => {};

  return (
    <Drawer
      container={window.document.body}
      variant="persistent"
      open={true}
      sx={{
        width: sidebarWidth,
        height: "100%",
        "& > div": { borderRight: "none" },
      }}
    >
      <List
        disablePadding
        sx={{
          width: sidebarWidth,
          height: "100vh",
          backgroundColor: colors.secondary,
        }}
      >
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
              {user?.name}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutOutlined fontSize="small" />
            </IconButton>
          </Box>
        </ListItem>

        <Box
          sx={{
            paddingTop: "10px",
          }}
        >
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
                Privates
              </Typography>
              <IconButton onClick={() => {}}>
                <AddBoxOutlined fontSize="small" />
              </IconButton>
            </Box>
          </ListItem>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              key={"list-board-droppable"}
              droppableId="list-board-droppable"
            >
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {boards.map((board, index) => (
                    <Draggable
                      key={board.id}
                      draggableId={board.id}
                      index={index}
                    >
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
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Box>
      </List>
    </Drawer>
  );
}
