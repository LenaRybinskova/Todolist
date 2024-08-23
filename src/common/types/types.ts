export type TestAction<T extends (...arg: any) => any> = Omit<ReturnType<T>, "meta">;

export type BaseResponse<T = {}> = {
    data: T;
    resultCode: number;
    fieldsErrors: string[];
    messages: string[];
};