import React, { ReactElement } from "react";
import { useTodolisList } from "AppWithRedux/hooks/useTodolisList";
import { AddItemForm } from "components/AddItemsForm/AddItemForm";
import { Todolist } from "../TodolistWithRedux/Todolist";
import { Navigate } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

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
      <Grid container style={{ margin: "20px" }}>
        <AddItemForm addItem={addTodolist} disabled={status === "loading"} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          return (
            <Grid key={tl.id} item xs={12} sm={6} md={4}>
              <Paper style={{ padding: "10px", minHeight: "400px", position: "relative" }}>
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
