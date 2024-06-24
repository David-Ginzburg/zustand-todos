import { randomUUID } from 'node:crypto';

import { MockMethod } from 'vite-plugin-mock'

const TODOS = [{
    "id": randomUUID(),
    "title": "delectus aut autem",
    "completed": false
}, {
    "id": randomUUID(),
    "title": "quis ut nam facilis et officia qui",
    "completed": false
}, {
    "id": randomUUID(),
    "title": "fugiat veniam minus",
    "completed": false
}, {
    "id": randomUUID(),
    "title": "et porro tempora",
    "completed": true
}, {
    "id": randomUUID(),
    "title": "laboriosam mollitia et enim quasi adipisci quia provident illum",
    "completed": false
}, {
    "id": randomUUID(),
    "title": "qui ullam ratione quibusdam voluptatem quia omnis",
    "completed": false
}, {
    "id": randomUUID(),
    "title": "illo expedita consequatur quia in",
    "completed": false
}, {
    "id": randomUUID(),
    "title": "quo adipisci enim quam ut ab",
    "completed": true
}, {
    "id": randomUUID(),
    "title": "molestiae perspiciatis ipsa",
    "completed": false
}, {
    "id": randomUUID(),
    "title": "illo est ratione doloremque quia maiores aut",
    "completed": true
}];

export default [{
    url       : '/api/todos',
    method    : 'get',
    statusCode: 200,
    response  : () => TODOS,
}, {
    url       : '/api/todos',
    method    : 'post',
    statusCode: 201,
    response  : ({ body }: { body: { title: string, completed?: boolean }}) => {
        const result = {
            id       : randomUUID(),
            completed: false,
            ...body
        };

        TODOS.push(result);

        return result;
    },
}, {
    url       : '/api/todos/:id',
    method    : 'put',
    statusCode: 200,
    response  : ({ query, body }: { query: { id: string }, body: { title?: string, completed?: boolean } }) => {
        const index = TODOS.findIndex((item) => item.id === query.id);

        TODOS[index] = {
            ...TODOS[index],
            ...body
        };

        return TODOS[index];
    },
}, {
    url       : '/api/todos/:id',
    method    : 'delete',
    statusCode: 204,
    response  : ({ query }: { query: { id: string } }) => {
        const index = TODOS.findIndex((item) => item.id === query.id);

        TODOS.splice(index, 1);

        return null;
    },
}] as MockMethod[]
