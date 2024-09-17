export type TodolistType = {
    id: string;
    addedDate: string;
    order: number;
    title: string;
};

export type UpdateTitleTodolistArgs = {
    todolistId: string,
    title: string
}
