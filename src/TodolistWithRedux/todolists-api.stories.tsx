import React, {useEffect, useState} from 'react'
import {TodolistAPI} from '../api/api-todolists';

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        TodolistAPI.getTodolists().then(res => setState(res.data))

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'NEW NEW TITLE'
        TodolistAPI.createTodolist(title).then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId="3b0a6682-62e4-4b5b-8e89-033e79d142a1"
        TodolistAPI.deleteTodolist(todolistId).then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId="b0823b25-723b-401c-852d-c5840b593c0a"
        const title = "2222222222222222"
        TodolistAPI.updateTodolist(todolistId, title).then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

