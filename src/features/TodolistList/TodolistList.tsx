import React, { ReactElement } from "react";
import { useTodolisList } from "AppWithRedux/hooks/useTodolisList";
import { AddItemForm } from "components/AddItemsForm/AddItemForm";
import { Grid, Paper } from "@mui/material";
import { Todolist } from "../TodolistWithRedux/Todolist";
import { Navigate } from "react-router-dom";

type TodolistListType = {
  demo?: boolean;
};
const TodolistList: React.FC<TodolistListType> = ({ demo = false }): ReactElement => {
  const { addTodolist, todolists, status, isLoggedIn } = useTodolisList(demo);
  //ВОПРОС, Navigate в кастомном хуке нельзя исп?

  //если не залогиненты - редирект на login
  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodolist} disabled={status === "loading"} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          return (
            <Grid key={tl.id} item>
              <Paper style={{ padding: "10px" }}>
                <Todolist todolist={tl} demo={demo} />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default TodolistList;
