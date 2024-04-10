import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { TodoInput } from "./TodoInput";
import { TodoList } from "./TodoList";
import { StyledEngineProvider } from "@mui/material";
import { textAlign } from "@mui/system";

// TodoItem型宣言
export type TodoItem = {
  id?: number;
  name: string;
  isComplete: boolean;
};

export const Todo = () => {
  // アイテムオブジェクトの配列を管理する
  const [todos, setTodos] = useState<TodoItem[]>([]);

  // テキストボックスの文字列を管理する
  const [text, setText] = useState("");

  // テキストボックス入力時の処理
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  // 追加ボタンクリック時の処理
  const handleAdd = async () => {
    const newTodo = { name: text, isComplete: false };
    if (newTodo.name === "") {
      return;
    }

    try {
      const { data } = await axios.post("api/todoitems", newTodo);

      setTodos([...todos, data]);
    } catch (e) {
      console.error(e);
    }
    // テキストボックスをクリア
    setText("");
  };

  //   完了ステータス(チェックボックス)変更時の処理
  const handleChangeStatus = async (id?: number) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });

    // 更新対象のTodoアイテムを取得
    const targetTodo = newTodos.filter((todo) => todo.id === id)[0];

    try {
      // APIに更新対象のTodoアイテムをPUTリクエスト
      await axios.put(`api/todoitems/${id}`, targetTodo);

      // 新しい配列をstateにセット
      setTodos(newTodos);
    } catch (e) {
      console.error(e);
    }
  };

  // 削除ボタンクリック時の処理
  const handleDelete = async (id?: number) => {
    try {
      // APIに削除対象のidをリクエスト
      await axios.delete(`api/todoitems/${id}`);

      // 削除対象以外のTodoアイテムを抽出してstateにセット
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  // ページ初期表示の処理
  useEffect(() => {
    // APIからTodoデータを取得
    const fetchTodoData = async () => {
      try {
        // APIにGETリクエストし、レスポンスからTodoアイテムオブジェクトの配列を取り出す
        const { data } = await axios.get("api/todoitems");
        // stateにセット
        setTodos(data);
      } catch (e) {
        console.error(e);
      }
      // 関数の実行
    };
    fetchTodoData();
  }, []);
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Todoリスト</h1>
      <TodoInput text={text} onChange={handleChangeInput} onClick={handleAdd} />
      <TodoList
        todos={todos}
        onChange={handleChangeStatus}
        onClick={handleDelete}
      />
    </div>
  );
};
