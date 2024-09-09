export type TestAction<T extends (...arg: any) => any> = Omit<ReturnType<T>, "meta">;

export type FieldsError={
    error:string,
    field:string
}

export type BaseResponse<T= {}> = {
    data: T;
    resultCode: number;
    fieldsErrors: FieldsError[];
    messages: string[];
};