# 16 redux-saga

# 15 axios

библиотека axios -  удобный вариант чтобы делать ajax запросы.

Создаем уровень DAL c объектом TodolistAPI с методами CRUD(det, post, put, delete),типизируем то что они возвращают

Создаем instanse c baseURL и настройками

Обращаемся к уровню DAL на UI


# 14 кастомные хуки

Код компоненты дб легко читаем, поэтому логику переносим в каст хуки. Импорт кастхук в компоненту и получается она более читаема.

# 12 Storybook + snapshot

```
npx storybook@latest init
```

npx sb init не ставила, выдает ошибку babelOption

storybook запускает отдельный свой сервер

если ошибка установки, почистить кэш npm (-- force значит принудительно)

```
npx cache clear -- force
```

если опять ошибка - удалить node_modules и yarn.lock

```
yarn install
```

переоткрыть webshtorm.

поменять порт на 9009 "storybook": "storybook dev -p 9009"

Декоратор - это функция, по сути схожа с ХОК коннект,обертка со Стором,которая принимает др функцию(историю) и вызывает
ее.
Чтобы не делать такую обертку для каждой истории, есть концепция декораторов.

```
yarn add @storybook/addon-storysource --dev
```

для ui тестирования
```
yarn add puppeteer jest-puppeteer jest-image-snapshot start-server-and-test --dev
```

или 
```
yarn add puppeteer jest-puppeteer jest-image-snapshot start-server-and-test jest jest-environment-jsdom --dev
```
добавить скрипты

"jest:integration": "jest -c integration/jest.config.js",
"test:integration": "start-server-and-test storybook http-get://localhost:9009 jest:integration"



создать integration папку с файлами setupTests.js
```
const { toMatchImageSnapshot } = require('jest-image-snapshot');

expect.extend({ toMatchImageSnapshot });
```
и jest.config.js

```
 module.exports = {
   preset: 'jest-puppeteer',
   testRegex: './*\\.test\\.js$',
   setupFilesAfterEnv: ['./setupTests.js']
};
```
```
yarn run jest:integration --updateSnapshot  обновить эталонный вид
```


# 11: среда 3 занятие React.memo() , useCallback(), useMemo() 

Исп в связки, все коллбеки передаваемые в компоненты, оборач в useCallback().

В список зависимостей добавляем то что есть в этой функции : пропсы, лок.стейт, диспатч.

Мат расчеты оборачиваем в useMemo()

# 10: среда 2 занятие react-redux, TodolistWithRedux


