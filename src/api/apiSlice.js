import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001'
    }),
    endpoints: (builder) => ({
        getTask: builder.query({
            query: () => '/task',
            providesTags: ["Tasks"],
            transformResponse: response => response.sort((a, b) => b.id - a.id),
        }),
        createTask: builder.mutation({
            query: (newTask) => ({
                url: "/task",
                method: "POST",
                body: newTask,
            }),
            invalidatesTags: ["Tasks"],
        }),
        updateTask: builder.mutation({
            query: (updatedTask) => ({
                url: `/task/${updatedTask.id}`,
                method: "PUT",
                body: updatedTask,
            }),
            invalidatesTags: ["Tasks"],
        }),
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `/task/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Tasks"],
        }),
    }),
});

export const { 
    useGetTaskQuery, 
    useCreateTaskMutation, 
    useDeleteTaskMutation, 
    useUpdateTaskMutation 
} = apiSlice