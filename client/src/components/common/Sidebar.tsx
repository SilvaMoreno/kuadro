import { AddBoxOutlined, LogoutOutlined } from "@mui/icons-material";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { colors } from "../../utils/colors";

export function Sidebar() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.value);

  const sidebarWidth = 250;

  const logout = () => {
    localStorage.clear();
    navigate("/signin");
  };

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
        </Box>
      </List>
    </Drawer>
  );
}
