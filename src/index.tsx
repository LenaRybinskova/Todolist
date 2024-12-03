import React from "react";
import "./AppWithRedux/index.css";
import { createRoot } from "react-dom/client";
import * as serviceWorker from "./serviceWorker";
import App from "./AppWithRedux/App";
import { Provider } from "react-redux";
import { store } from "./AppWithRedux/store";
import { BrowserRouter } from "react-router-dom";
import {useGetTodolistsQuery} from 'api/todolists-api';

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
{/*        <Lena/>*/}
    </Provider>
  </BrowserRouter>,
);



export function Lena(){
    const {data:getTodolists} = useGetTodolistsQuery()

    return (
        <>
            {getTodolists?.map((todolist)=> (<div>{todolist.title}</div>))}
        </>

    )
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
