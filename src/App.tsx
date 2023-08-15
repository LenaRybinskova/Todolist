import React, {useState, useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {
    AddTodolistAC,
    ChangeFilterAC,
    ChangeTodolistTitleAC,
    ReducerTodolist,
    RemoveTodolistAC
} from './Reducer/ReduserTodolist';
import {
    AddEmptyTaskAC,
    AddTaskAC,
    ChangeStatusTaskAC,
    ChangeTaskTitleAC,
    ReducerTask,
    RemoveTaskAC
} from './Reducer/ReducerTask';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    function removeTask(id: string, todolistId: string) {
        /*//достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId];
        // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
        tasks[todolistId] = todolistTasks.filter(t => t.id != id);
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});*/
        dispatchtask(RemoveTaskAC(id, todolistId))
    }

    function addTask(title: string, todolistId: string) {
        /*        const task = {id: v1(), title: title, isDone: false};
                //достанем нужный массив по todolistId:
                let todolistTasks = tasks[todolistId];
                // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
                tasks[todolistId] = [task, ...todolistTasks];
                // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
                setTasks({...tasks});*/
        dispatchtask(AddTaskAC(title, todolistId))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        // let todolist = todolists.find(tl => tl.id === todolistId);
        // if (todolist) {
        //     todolist.filter = value;
        //     setTodolists([...todolists])
        // }
        dispatchTodolists(ChangeFilterAC(value, todolistId))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        /*        //достанем нужный массив по todolistId:
                let todolistTasks = tasks[todolistId];
                // найдём нужную таску:
                let task = todolistTasks.find(t => t.id === id);
                //изменим таску, если она нашлась
                if (task) {
                    task.isDone = isDone;
                    // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
                    setTasks({...tasks});
                }*/
        dispatchtask(ChangeStatusTaskAC(id, isDone, todolistId))
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        /*        //достанем нужный массив по todolistId:
                let todolistTasks = tasks[todolistId];
                // найдём нужную таску:
                let task = todolistTasks.find(t => t.id === id);
                //изменим таску, если она нашлась
                if (task) {
                    task.title = newTitle;
                    // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
                    setTasks({...tasks});
                }*/
        dispatchtask(ChangeTaskTitleAC(id, newTitle, todolistId))
    }

    function removeTodolist(id: string) {
        /*        setTodolists(todolists.filter(tl => tl.id != id));
                delete tasks[id];
                setTasks({...tasks});*/
        dispatchTodolists(RemoveTodolistAC(id))

    }

    function changeTodolistTitle(id: string, title: string) {
        // const todolist = todolists.find(tl => tl.id === id);
        // if (todolist) {
        //
        //     todolist.title = title;
        //     setTodolists([...todolists]);
        // }
        dispatchTodolists(ChangeTodolistTitleAC(id, title))
    }

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchTodolists] = useReducer(ReducerTodolist, [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, dispatchtask] = useReducer(ReducerTask, {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Book', isDone: true}
        ]
    });
// ВОПРОС: где создавать новый ID: в функции тут или в Редьюсере?
    // если в Редьюсере, то тогда в тестах нельзя польностью сравнить получившийся ТЛ с тасками, тк ID тут создается
    function addTodolist(title: string) {
        let newIdTodolist = v1()
        dispatchTodolists(AddTodolistAC(title, newIdTodolist))
        dispatchtask(AddEmptyTaskAC(newIdTodolist))

    }


    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id];
                    let tasksForTodolist = allTodolistTasks;

                    if (tl.filter === 'active') {
                        tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                    }

                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                })
            }

        </div>
    );
}

export default App;
