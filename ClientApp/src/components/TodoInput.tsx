import { ChangeEvent } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab, TextField } from "@mui/material";

type Props = {
  text: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => Promise<void>;
};

export const TodoInput = ({ text, onChange, onClick }: Props) => {
  return (
    <div>
      <TextField
        sx={{ width: "100%", maxWidth: 270, marginRight: 2, marginBottom: 2 }}
        size="small"
        variant="outlined"
        onChange={onChange}
        value={text}
        // placeholder="Todoリスト"
      />
      <Fab size="small" color="primary" onClick={onClick}>
        <AddIcon />
      </Fab>
    </div>
  );
};
