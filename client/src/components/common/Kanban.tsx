import { AddOutlined, DeleteOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { sectionApi } from "../../api/sectionApi";
import { ISection, ITask } from "../../utils/type";

interface IKanbanProps {
  boardId: string;
  sections: ISection[];
}

let timer: number;
const timeout = 1000;

export function Kanban({ boardId, sections }: IKanbanProps) {
  const [data, setData] = useState<ISection[]>([]);

  useEffect(() => {
    setData(sections);
  }, [sections]);

  const createSection = async () => {
    try {
      const section = await sectionApi.create(boardId);
      setData([...data, section.data]);
    } catch (err) {
      alert(err);
    }
  };

  const onDragEnd = () => {};

  const updateSectionTitle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    sectionId: string
  ) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    const newData = [...data];
    const index = newData.findIndex((e) => e.id === sectionId);
    newData[index].title = newTitle;
    setData(newData);
    timer = setTimeout(async () => {
      try {
        await sectionApi.update(boardId, sectionId, { title: newTitle });
      } catch (err) {
        alert(err);
      }
    }, timeout);
  };

  const createTask = (sectionId: string) => {};

  const deleteSection = async (sectionId: string) => {
    try {
      await sectionApi.delete(boardId, sectionId);
      const newData = [...data].filter((e) => e.id !== sectionId);
      setData(newData);
    } catch (err) {
      alert(err);
    }
  };

  const setSelectedTask = (task: ITask) => {};

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button onClick={createSection}>Add Section</Button>
        <Typography variant="body2" fontWeight="700">
          {data.length} Sections
        </Typography>
      </Box>
      <Divider sx={{ margin: "10px 0" }} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            width: "calc(100vw - 310px)",
            overflowX: "auto",
            gap: "10px",
          }}
        >
          {data.map((section, index) => (
            <div key={section.id} style={{ width: "300px" }}>
              <Droppable droppableId={section.id} key={section.id}>
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      width: "300px",
                      padding: "10px",
                      marginRight: "10px",
                      height: "calc(100vh - 340px)",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                      }}
                    >
                      <TextField
                        value={section.title}
                        onChange={(e) => updateSectionTitle(e, section.id)}
                        placeholder="Untitled"
                        variant="outlined"
                        sx={{
                          flexGrow: 1,
                          "& .MuiOutlinedInput-input": { padding: 0 },
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "unset ",
                          },
                          "& .MuiOutlinedInput-root": {
                            fontSize: "1rem",
                            fontWeight: "700",
                          },
                        }}
                      />
                      <IconButton
                        size="small"
                        sx={{
                          color: "gray",
                          "&:hover": { color: "green" },
                        }}
                        onClick={() => createTask(section.id)}
                      >
                        <AddOutlined />
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{
                          color: "gray",
                          "&:hover": { color: "red" },
                        }}
                        onClick={() => deleteSection(section.id)}
                      >
                        <DeleteOutlined />
                      </IconButton>
                    </Box>
                    {/* tasks */}
                    {section?.tasks?.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{
                              padding: "10px",
                              marginBottom: "10px",
                              cursor: snapshot.isDragging
                                ? "grab"
                                : "pointer!important",
                            }}
                            onClick={() => setSelectedTask(task)}
                          >
                            <Typography>
                              {task.title === "" ? "Untitled" : task.title}
                            </Typography>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </div>
          ))}
        </Box>
      </DragDropContext>
    </>
  );
}
