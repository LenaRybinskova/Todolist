import axios from "axios"

type TodolistType={
    id: string,
    addedDate: string,
    order: number
    title: string
}
type BaseResponse<T={}> ={
    data:T,
    resultCode:number,
    messages: string[]
}

const instanse=axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials:true,
    headers: {"API-KEY":""}
})

export const TodolistAPI = {
    getTodolists(){
        return instanse.get<TodolistType[]>("/todo-lists")
    },
    createTodolist(title:string){
        return instanse.post<BaseResponse<{item:TodolistType}>>("/todo-lists",{title})
    },
    deleteTodolist(todolistId:string){
        return instanse.delete<BaseResponse>(`/todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId:string,title:string ){
        return instanse.put<BaseResponse>(`/todo-lists/${todolistId}`, {title})
    }
}