import {
  Checkbox,
  Fab,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { TodoItem } from "./Todo";

type Props = {
  todos: TodoItem[];
  onChange: (id?: number) => Promise<void>;
  onClick: (id?: number) => Promise<void>;
};

export const TodoList = ({ todos, onChange, onClick }: Props) => {
  return (
    <List sx={{ width: "100%", maxWidth: 300, marginInline: "auto" }}>
      {todos.map((todo) => (
        <ListItem key={todo.id} disablePadding>
          <ListItemButton>
            <Checkbox
              checked={todo.isComplete}
              onChange={() => {
                onChange(todo.id);
              }}
            />
            <ListItemText>
              {todo.isComplete ? (
                <span style={{ textDecorationLine: "line-through" }}>
                  {todo.name}
                </span>
              ) : (
                <span>{todo.name}</span>
              )}
            </ListItemText>
            <Fab size="small" color="error" onClick={() => onClick(todo.id)}>
              <DeleteIcon />
            </Fab>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
