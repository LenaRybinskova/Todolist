import React, { useEffect } from "react";
import "./App.css";
import { AppBar, Button, CircularProgress, Container, LinearProgress, Toolbar, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton/IconButton";
import { Menu } from "@mui/icons-material";
import TodolistList from "../features/TodolistList/TodolistList";
import { useAppSelector } from "./store";
import { ErrorSnackbar } from "components/ErrorSnackbar/ErrorSnackbar";
import { Login } from "features/login/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { selectIsInitialize, selectStatus } from "./app-selectors";
import { authMeTC, logoutTC } from "features/login/authSlice";
import { selectIsLoggedIn } from "features/login/login-selectors";
import { useDispatch } from "react-redux";

type AppPropsType = {
  demo?: boolean;
};

function App({ demo = false }: AppPropsType) {
  const dispatch = useDispatch(); //useAppDispatch() не работает
  const status = useAppSelector<string | null>(selectStatus);
  const isInitialized = useAppSelector<boolean>(selectIsInitialize);
  const isLoggedIn = useAppSelector<boolean>(selectIsLoggedIn);

  // после CircularProgress сработает юзЭффект
  useEffect(() => {
    dispatch(authMeTC());
  }, []);

  //если прил не проиниц =>крутилка и дальше useEffect с authMeTC() в кот проверка куки и тд
  if (!isInitialized) {
    return <CircularProgress style={{ justifyContent: "center" }} />;
  }

  const logoutHandler = () => {
    dispatch(logoutTC());
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          {isLoggedIn && (
            <Button onClick={logoutHandler} color="inherit">
              Log out
            </Button>
          )}
        </Toolbar>
        {status === "loading" && <LinearProgress />}
        <ErrorSnackbar />
      </AppBar>
      <Container fixed>
        <Routes>
          <Route path={"/"} element={<TodolistList demo={demo} />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/404"} element={<h1>PAGE NOT FOUND</h1>}></Route> {/*// сделали чтобы ошибке в урл было 404*/}
          <Route path={"*"} element={<Navigate to={"/404"} />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
