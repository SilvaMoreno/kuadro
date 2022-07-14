import { Box, Typography } from "@mui/material";
import { Picker } from "emoji-mart";
import { useEffect, useState } from "react";

import "emoji-mart/css/emoji-mart.css";

interface IProps {
  icon: string;
  onChange: (icon: string) => void;
}

export function EmojiPicker({ icon, onChange }: IProps) {
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [isShowPicker, setIsShowPicker] = useState(false);

  useEffect(() => {
    setSelectedEmoji(icon);
  }, [icon]);

  const selectEmoji = (emoji: any) => {
    const sym = emoji.unified.split("-");
    let codesArray = sym.map((code: string) => "0x" + code);
    const emojiString = String.fromCodePoint(...codesArray);
    setIsShowPicker(false);
    onChange(emojiString);
  };

  const showPicker = () => setIsShowPicker(true);

  return (
    <Box
      sx={{
        position: "relative",
        width: "max-content",
      }}
    >
      <Typography
        variant="h3"
        fontWeight="700"
        sx={{ cursor: "pointer" }}
        onClick={showPicker}
      >
        {selectedEmoji}
      </Typography>
      <Box
        sx={{
          position: "absolute",
          top: "100%",
          zIndex: 9999,
          display: isShowPicker ? "block" : "none",
        }}
      >
        <Picker theme="dark" onSelect={selectEmoji} showPreview={false} />
      </Box>
    </Box>
  );
}
