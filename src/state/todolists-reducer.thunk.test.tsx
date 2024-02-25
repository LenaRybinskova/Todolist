import {getTodolistsTC} from './todolists-reducer';

test('', async () => {

    //сначала санку получить
    const thunk = getTodolistsTC()
    //настоящий Апи не исп, используем МОК(фейковый объект)

    // настоящий диспач тоже не используем, создаем фейковую функ
    const dispatchMock=jest.fn()
   await thunk(dispatchMock)

    expect(dispatchMock).toBeCalledTimes(0)
})