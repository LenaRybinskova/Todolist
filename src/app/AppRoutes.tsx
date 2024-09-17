import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import TodolistList from 'features/TodolistsList/ui/TodolistList';
import {Login} from 'features/auth/ui/Login';

type Props = {
    demo: boolean
}
export const AppRoutes = ({demo}: Props) => {
    return (
        <Routes>
            <Route path={'/'} element={<TodolistList demo={demo}/>}/>
            <Route path={'/auth'} element={<Login/>}/>
            <Route path={'/404'} element={<h1>PAGE NOT FOUND</h1>}></Route>
            <Route path={'*'} element={<Navigate to={'/404'}/>}/>
        </Routes>
    );
};

