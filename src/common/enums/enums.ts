export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed,
    Draft,
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi,
    Ungently,
    Later = 4,
}

export enum ResultCode {
    Success = 0,
    Error = 1,
    Captcha = 10,
}