import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
    reducerPath: 'todolists',
    tagTypes: ["Todolist",  'tasks' ],
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://social-network.samuraijs.com/api/1.1',
        credentials: 'include',
        prepareHeaders: (headers) => {
            headers.set('API-KEY', '2c45728a-68be-4862-8b0c-8cd42989c7e6')
        }
    }),
    endpoints: () => ({}),

})