export type TestAction<T extends (...arg: any) => any> = Omit<ReturnType<T>, "meta">;
